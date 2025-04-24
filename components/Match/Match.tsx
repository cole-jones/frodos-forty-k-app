'use client'

import { useState, useEffect } from "react"
import { MatchLogic, MissionSetupSections } from "@/components/Match/MatchLogic"
import { Button, Tooltip, Table, ScrollArea, Select } from "@mantine/core"
import {
  MissionDeckName,
  MissionDeckSectionUntyped,
  type CardType,
  type CardInfo,
  type MissionDeckCards,
  type MissionDeckSection,
} from "@/components/Cards/MissionDeck"

import { IconPlus, IconX, IconRecycle, IconRestore } from '@tabler/icons-react'
import styles from "@/css/Match.module.css"
import scrollbarStyles from "@/css/Scrollbars.module.css"
import "@/css/Cards.css"
import { capitalizeEachWord, pascalCase } from "@/utils/utility_functions"

const WINDOW_HEIGHT_SCALE_BASE = 1350

export default function Match({
  missionDeckName,
  missionDeckCards,
  tournamentPresets
} : {
  missionDeckName: MissionDeckName,
  missionDeckCards: MissionDeckCards,
  tournamentPresets: Array<React.ReactNode>
}) : React.ReactNode {
  const {
    match,
    setupComplete,
    finalizeMissionSetup,
    missionSetupManualSet,
    missionSetupManualSetAll,
    tertiaryManualSet,
    draw,
    discard,
    recycleAndDraw,
    reset
  } = MatchLogic(missionDeckCards)

  const [missionSetupCardsScale, setMissionSetupCardsScale] = useState<number>(window.innerHeight / WINDOW_HEIGHT_SCALE_BASE)
  const [missionSetupCardsWidth, setMissionSetupCardsWidth] = useState<string>("")

  useEffect(() => {
    // Change the scaling of the mission setup cards/tertiary missions based
    // on the height of the viewport. Breakpoint for changing width for 4K vs non-4K.
    const updateWindowDimensions = () => {
      setMissionSetupCardsScale(window.innerHeight / WINDOW_HEIGHT_SCALE_BASE)
      if (window.innerHeight < 1100)
        setMissionSetupCardsWidth('142%')
      else
        setMissionSetupCardsWidth('120%')
    };

    updateWindowDimensions()
    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions) 

  }, []);

  function CardHolder({
    position = "left",
    section,
    noActions = false,
    withSelector = false,
    label = null,
    player = null,
  } : {
    position?: "left" | "right",
    section: MissionDeckSection,
    noActions?: boolean,
    withSelector?: boolean
    label?: string | null,
    player?: CardType | null,
  }) : React.ReactNode {
    let containerClassName: string = styles.cardHolderContainer
    let buttonGroupClassName: string = styles.cardHolderButtonGroup
    let buttonClassName: string = styles.actionButton
    let tooltipColor: string = ""

    if (!noActions) {
      if (position === "left") {
        containerClassName += ` ${styles.cardHolderContainerLeft}`
        buttonGroupClassName += ` ${styles.cardHolderButtonGroupLeft}`
      }
      else {
        containerClassName += ` ${styles.cardHolderContainerRight}`
        buttonGroupClassName += ` ${styles.cardHolderButtonGroupRight}`
      }
    }
    else
      containerClassName += ` ${styles.cardHolderContainerTertiary}`

    if (player === "attacker") {
      containerClassName += ` ${styles.cardHolderContainerAttacker}`
      buttonClassName += ` ${styles.actionButtonAttacker}`
      tooltipColor = 'var(--mantine-color-attacker-2)'
    }
    else if (player === "defender") {
      containerClassName += ` ${styles.cardHolderContainerDefender}`
      buttonClassName += ` ${styles.actionButtonDefender}`
      tooltipColor = 'var(--mantine-color-defender-2)'
    }
    else {
      containerClassName += ` ${styles.cardHolderContainerNeutral}`
      buttonClassName += ` ${styles.actionButtonNeutral}`
      tooltipColor = 'var(--mantine-color-headers-2)'
    }

    let sectionTitle = capitalizeEachWord(section.slice(0, -1), " ")
    let content: React.ReactNode

    if (section === "secondaryMissions" && player !== null)
      content = (
        <>
          {position === "left" ?
            <>
              {match[player].secondaryMissionOne !== null ?
                missionDeckCards.secondaryMissions[player][match[player].secondaryMissionOne].card
                :
                null
              }
            </>
            :
            <>
              {match[player].secondaryMissionTwo !== null ?
                missionDeckCards.secondaryMissions[player][match[player].secondaryMissionTwo].card
                :
                null
              }
            </>
          }
        </>
      )
    else if (section !== null && missionDeckCards[section]) {
      content = (
        <>
          {match.missionSetup[section.slice(0, -1) as MissionSetupSections] !== null ?
            missionDeckCards[section as MissionDeckSectionUntyped][match.missionSetup[section.slice(0, -1) as MissionSetupSections] as number].card
            :
            null
          }
        </>
      )
    }

    let selectData: string[] = []
    if (withSelector) {
      selectData = missionDeckCards[section as MissionDeckSectionUntyped].map((x) => x.cardTitle)
      if (section === "layouts")
        selectData = missionDeckCards[section as MissionDeckSectionUntyped].map((x) => {
          if (match.missionSetup.validLayouts?.includes(x.cardIndex))
            return `Layout ${(x.cardIndex + 1).toString()}`
          }
        ).filter(x => x !== undefined) as string[]
    }

    return (
      <div>
        {label ?
          <div className={noActions ? styles.cardHolderContainerLabelNoActions : styles.cardHolderContainerLabel}>
            <h3>{label}</h3>
          </div>
          :
          null
        }

        <div className={containerClassName}>
          {noActions ?
            null
            :
            <>
              <div className={buttonGroupClassName}>
                <div className={styles.cardHolderButtonContainer}>
                  <Tooltip
                    openDelay={500}
                    label={`Draw ${sectionTitle}`}
                    color={tooltipColor}
                  >
                    <Button
                      children={<IconPlus />}
                      onClick={() => draw(section, player, position === "left" ? 0 : 1)}
                      className={buttonClassName}
                    />
                  </Tooltip>
                </div>
                <div className={styles.cardHolderButtonContainer}>
                  <Tooltip
                    openDelay={500}
                    label={`Discard ${sectionTitle}`}
                    color={tooltipColor}
                  >
                    <Button
                      children={<IconX />}
                      onClick={() => discard(section, player, position === "left" ? 0 : 1)}
                      className={buttonClassName}
                    />
                  </Tooltip>
                </div>
                <div className={styles.cardHolderButtonContainer}>
                  <Tooltip
                    multiline
                    w={260}
                    openDelay={500}
                    label={`Shuffle ${sectionTitle} back into deck and draw new ${sectionTitle}`}
                    color={tooltipColor}
                  >
                    <Button
                      children={<IconRecycle />}
                      onClick={() => recycleAndDraw(section, player, position === "left" ? 0 : 1)}
                      className={buttonClassName}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className={styles.cardHolderSpacer} />
            </>
          }
          <div className={label === "Layout" ? styles.cardHolderCardContainerLayout : styles.cardHolderCardContainer}>
            {content}
          </div>
        </div>

        {withSelector ?
          <div className={styles.cardHolderSelect}>
            <Select
              placeholder={capitalizeEachWord(section.slice(0, -1), " ")}
              value={missionDeckCards[section as MissionDeckSectionUntyped][match.missionSetup[section.slice(0, -1) as MissionSetupSections] as number]?.cardTitle ?? null}
              data={selectData}
              onChange={(value) => missionSetupManualSet(value, section)}
            />
          </div>
          :
          null
        }
      </div>
    )
  }

  function CardHolderTertiaryMission({
    player
  } : {
    player: CardType,
  }) : React.ReactNode {
    let containerClassName: string = `${styles.cardHolderContainer} ${styles.cardHolderContainerTertiary}`
    let labelClassName: string = styles.cardHolderContainerLabelNoActions
    if (player === "attacker") {
      containerClassName += ` ${styles.cardHolderContainerAttacker}`
      labelClassName += ` ${styles.cardHolderContainerLabelAttacker}`
    }
    else if (player === "defender") {
      containerClassName += ` ${styles.cardHolderContainerDefender}`
      labelClassName += ` ${styles.cardHolderContainerLabelDefender}`
    }

    let tertiaryMissionsList: CardInfo[] = []
    if (match[player].tertiaryMission === null) {
      if (missionDeckName === "Leviathan" && missionDeckCards.gambits !== undefined)
        tertiaryMissionsList = missionDeckCards.gambits[player]
      else if (missionDeckName === "Pariah Nexus" && missionDeckCards.secretMissions !== undefined)
        tertiaryMissionsList = missionDeckCards.secretMissions[player]
    }

    let tertiaryMissionCardBackURL: string = ""
    if (missionDeckName === "Leviathan")
      tertiaryMissionCardBackURL = `/cards/leviathan/Leviathan_Gambit_Back_(${pascalCase(player)}).jpg`
    else
      tertiaryMissionCardBackURL = `/cards/pariah_nexus/Pariah_Nexus_Secret_Mission_Back_(${pascalCase(player)}).jpg`

    return (
      <div>
        <div className={labelClassName}>
          <h3>{missionDeckName === "Leviathan" ? "Gambit" : "Secret Mission"}</h3>
        </div>

        <div className={containerClassName}>
          {match[player].tertiaryMission !== null ?
            <div>
              {/* Place a div in front of the card containing the image of the back of the gambit/secret mission card, to keep it a secret.
                * Here, the parent div controls the hover scaling for the div with the image, which itself has 'pointer-events: none'.
                * This allows for hover transforms while still being able to click through the div to the card behind it. */}
              <div className={styles.tertiaryMissionCardContainer}>
                <div
                  className={styles.tertiaryMissionCardBackOverlay}
                  style={{ backgroundImage: `url('${tertiaryMissionCardBackURL}')` }}
                />
                {missionDeckName === "Leviathan" ?
                  missionDeckCards.gambits![player].find((card: CardInfo) => card.cardIndex === match[player].tertiaryMission)!.card
                  :
                  missionDeckCards.secretMissions![player].find((card: CardInfo) => card.cardIndex === match[player].tertiaryMission)!.card
                }
              </div>
            </div>
            :
            <div key={`tertiary-card-holder-${player}`} className={styles.cardHolderCardContainer}>
              <div className={styles.cardHolderTertiaryMissionButtons}>
                {tertiaryMissionsList.map((card: CardInfo) => {
                  return (
                    <Tooltip
                      key={`tertiary-card-holder-tooltip-${player}-${pascalCase(card.cardTitle)}`}
                      openDelay={300}
                      multiline
                      h={540}
                      w={324}
                      position={player === "attacker" ? "right" : "left"}
                      offset={player === "attacker" ? { mainAxis: 13, crossAxis: 200 } : { mainAxis: -40, crossAxis: 200 }}
                      color="transparent"
                      label={
                        <div className={styles.cardHolderButtonTooltip}>
                          {card.card}
                        </div>
                      }
                    >
                      <Button
                        fullWidth
                        key={`tertiary-card-holder-${player}-${pascalCase(card.cardTitle)}`}
                        onClick={() => tertiaryManualSet(player, card.cardIndex)}
                        className={player === "attacker" ? styles.actionButtonAttacker : styles.actionButtonDefender}
                      >
                        {card.cardTitle}
                      </Button>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  if (!setupComplete)
    return (
      <div className={styles.matchContainer}>
        <div className={styles.missionSetupTitle}>
          <h1>Mission Setup</h1>
        </div>

        <ScrollArea
          className={styles.scoreTrackerMissionSetupTableScrollArea}
          classNames={scrollbarStyles}
        >
          <Table withRowBorders={false} stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th></Table.Th>
                <Table.Th>Primary Mission</Table.Th>
                <Table.Th>Mission Rule</Table.Th>
                <Table.Th>Deployment</Table.Th>
                <Table.Th>Terrain Layouts</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tournamentPresets.map((row: any, index: number) =>
                <Table.Tr key={`tournament-presets-row-${index}`}>
                  <Table.Td>
                    <Button
                      className={styles.scoreTrackerButton}
                      size="compact-xs"
                      onClick={() => missionSetupManualSetAll(row[0].cardTitle, row[1].cardTitle, row[2].cardTitle, row[3].map((x: { cardTitle: string, card: React.ReactNode }) => x.cardTitle))}
                    >
                      <IconPlus />
                    </Button>
                  </Table.Td>
                  <Table.Td><b>{String.fromCharCode(65 + index)}</b></Table.Td>
                  <Table.Td>{row[0].card}</Table.Td>
                  <Table.Td>{row[1].card}</Table.Td>
                  <Table.Td>{row[2].card}</Table.Td>
                  <Table.Td>{row[3].map((x: { cardTitle: string, card: React.ReactNode }) => x.card).reduce((acc: number, node: number, index: number) => index === 0 ? node : <>{acc}, {node}</>)}</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        <div className={`${styles.matchCardHolderContainer} ${styles.preMatchCardHolderContainer}`}>
          <CardHolder section="primaryMissions" label="Primary Mission" withSelector />
          <CardHolder section="missionRules" label="Mission Rule" withSelector />
          <CardHolder section="deployments" label="Deployment" withSelector />
          <CardHolder section="layouts" label="Layout" withSelector />
        </div>

        <div className={styles.matchFinalizeButtonContainer}>
          <Button onClick={() => reset()} leftSection={<IconRestore />} color="red">
            Reset
          </Button>
          <Button onClick={() => finalizeMissionSetup()}>
            Finalize Mission Setup
          </Button>
        </div>
      </div>
    )
  else
    return (
      <div className={styles.matchContainer}>
        <div className={styles.matchCardHolderContainerScaler} style={{ width: missionSetupCardsWidth, transform: `scale(${missionSetupCardsScale})` }}>
          <CardHolderTertiaryMission player="attacker" />
          <div className={`${styles.matchCardHolderContainer} ${styles.preMatchCardHolderContainer}`}>
            <CardHolder section="primaryMissions" label="Primary Mission" noActions />
            <CardHolder section="missionRules" label="Mission Rule" noActions />
            <CardHolder section="deployments" label="Deployment" noActions />
            <CardHolder section="layouts" label="Layout" noActions />
          </div>
          <CardHolderTertiaryMission player="defender" />
        </div>

        <div className={styles.matchCardHolderContainer}>
          <div className={styles.matchCardHolder}>
            <CardHolder section="secondaryMissions" player="attacker" position="left" />
            <div className={styles.matchCardHolderSpacer} />
            <CardHolder section="secondaryMissions" player="attacker" position="right" />
          </div>
          <div className={styles.matchCardHolder}>
            <CardHolder section="secondaryMissions" player="defender" position="left" />
            <div className={styles.matchCardHolderSpacer} />
            <CardHolder section="secondaryMissions" player="defender" position="right" />
          </div>
        </div>
      </div>
    )
}
