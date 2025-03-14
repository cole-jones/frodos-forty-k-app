'use client'

import { MatchLogic, type MatchReducerAction } from "@/components/Match/MatchLogic"
import { Button, Tooltip } from "@mantine/core"
import {
  type CardType,
  type MissionDeckCards,
  type MissionDeckSection,
} from "@/components/Cards/MissionDeck"
import { IconPlus, IconX, IconRecycle } from '@tabler/icons-react'
import styles from "@/css/Match.module.css"
import "@/css/Cards.css"
import { useEffect } from "react"

// TODO: Possibly consider moving type definitions for MissionDeck into a new file,
// would be able to provide functions for checking if a variable belongs to a type, like:
//    const missionDeckSectionTyped = ["secondaryMissions", "gambits", "secretMissions"] as const
//    export type MissionDeckSectionTyped = typeof missionDeckSectionTyped[number]
//    export function isMissionDeckSectionTyped(input: string): input is MissionDeckSectionTyped {
//      return missionDeckSectionTyped.includes(input as MissionDeckSectionTyped)
//    }

export default function Match({ missionDeckCards } : { missionDeckCards: MissionDeckCards }) : React.ReactNode {
  const { match, matchDispatch } = MatchLogic(missionDeckCards)

  /* Shuffle all of the decks to start. */
  useEffect(() => {
    shuffle("deployments")
    shuffle("missionRules")
    shuffle("primaryMissions")
    shuffle("secondaryMissions", "attacker")
    shuffle("secondaryMissions", "defender")
    shuffle("gambits", "attacker")
    shuffle("gambits", "defender")
    shuffle("secretMissions", "attacker")
    shuffle("secretMissions", "defender")
  }, [])

  function shuffle(section: MissionDeckSection, player: CardType | null = null) : void {
    matchDispatch({ type: "shuffle", section, player } as MatchReducerAction)
  }

  function draw(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "draw", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  function discard(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "discard", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  function recycle(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "recycle", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  function recycleAndDraw(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    recycle(section, player, secondaryMissionIndex)
    draw(section, player, secondaryMissionIndex)
  }

  function CardHolder({
    position = "left",
    player,
    children,
  } : {
    position: "left" | "right",
    player: CardType,
    children: React.ReactNode,
  }) : React.ReactNode {
    let containerClassName: string = styles.cardHolderContainer
    let buttonGroupClassName: string = styles.cardHolderButtonGroup
    let buttonClassName: string = styles.actionButton

    containerClassName += ` ${position === "left" ? styles.cardHolderContainerLeft : styles.cardHolderContainerRight}`
    containerClassName += ` ${player === "attacker" ? styles.cardHolderContainerAttacker : styles.cardHolderContainerDefender}`
    buttonGroupClassName += ` ${position === "left" ? styles.cardHolderButtonGroupLeft : styles.cardHolderButtonGroupRight}`
    buttonClassName += ` ${player === "attacker" ? styles.actionButtonAttacker : styles.actionButtonDefender}`

    return (
      <div className={containerClassName}>
        <div className={buttonGroupClassName}>
          <div className={styles.cardHolderButtonContainer}>
            <Tooltip
              openDelay={500}
              label="Draw Secondary Mission"
              color={player === "attacker" ? 'var(--mantine-color-attacker-2)' : 'var(--mantine-color-defender-2)'}
            >
              <Button
                children={<IconPlus />}
                onClick={() => draw("secondaryMissions", player, position === "left" ? 0 : 1)}
                className={buttonClassName}
              />
            </Tooltip>
          </div>
          <div className={styles.cardHolderButtonContainer}>
            <Tooltip
              openDelay={500}
              label="Discard Secondary Mission"
              color={player === "attacker" ? 'var(--mantine-color-attacker-2)' : 'var(--mantine-color-defender-2)'}
            >
              <Button
                children={<IconX />}
                onClick={() => discard("secondaryMissions", player, position === "left" ? 0 : 1)}
                className={buttonClassName}
              />
            </Tooltip>
          </div>
          <div className={styles.cardHolderButtonContainer}>
            <Tooltip
              multiline
              w={260}
              openDelay={500}
              label="Shuffle Secondary Mission back into deck and draw new Secondary Mission"
              color={player === "attacker" ? 'var(--mantine-color-attacker-2)' : 'var(--mantine-color-defender-2)'}
            >
              <Button
                children={<IconRecycle />}
                onClick={() => recycleAndDraw("secondaryMissions", player, position === "left" ? 0 : 1)}
                className={buttonClassName}
              />
            </Tooltip>
          </div>
        </div>
        <div className={styles.cardHolderSpacer} />
        <div className={styles.cardHolderCardContainer}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.matchContainer}>
      <div className={styles.matchCardHolderContainer}>
        <CardHolder player="attacker" position="left">
          {match.attacker.secondaryMissionOne !== null ?
            missionDeckCards.secondaryMissions.attacker[match.attacker.secondaryMissionOne].card
            :
            null
          }
        </CardHolder>
        <div className={styles.matchCardHolderSpacer} />
        <CardHolder player="attacker" position="right">
        {match.attacker.secondaryMissionTwo !== null ?
            missionDeckCards.secondaryMissions.attacker[match.attacker.secondaryMissionTwo].card
            :
            null
          }
        </CardHolder>
      </div>
      <div className={styles.matchCardHolderContainer}>
        <CardHolder player="defender" position="left">
          {match.defender.secondaryMissionOne !== null ?
            missionDeckCards.secondaryMissions.defender[match.defender.secondaryMissionOne].card
            :
            null
          }
        </CardHolder>
        <div className={styles.matchCardHolderSpacer} />
        <CardHolder player="defender" position="right">
          {match.defender.secondaryMissionTwo !== null ?
            missionDeckCards.secondaryMissions.defender[match.defender.secondaryMissionTwo].card
            :
            null
          }
        </CardHolder>
      </div>
    </div>
  )
}
