'use server'

import { CardInfo, MissionDeckCards, MissionDeckName, MissionDeckSection } from "@/components/Cards/MissionDeck"
import { Tooltip } from "@mantine/core"
import styles from "@/css/CardViewer.module.css"
import "@/css/Cards.module.css"

type TournamentPresetsRows = TournamentPresetsRow[]
type TournamentPresetsRow = [string, string, string, number[]]
export type CardTooltipRow = [CardInfo, CardInfo, CardInfo, CardInfo[]]

export async function TournamentPresets(
  missionDeckName: MissionDeckName,
  missionDeckCards: MissionDeckCards
) : Promise<Array<any>> {
  let rows: TournamentPresetsRows
  if (missionDeckName === "Leviathan")
    rows = leviathanTournamentPresets
  else
    rows = pariahNexusTournamentPresets

  function CardTooltip(label: string, section: MissionDeckSection | "layouts") {
    let card: CardInfo
    /* Linter is getting mad about trying to use section to
     * index missionDeckCards, so just do it the hard way. */
    if (section === "deployments")
      card = missionDeckCards.deployments.find((cardInfo: CardInfo) => cardInfo.cardTitle === label) as CardInfo
    else if (section === "missionRules")
      card = missionDeckCards.missionRules.find((cardInfo: CardInfo) => cardInfo.cardTitle === label) as CardInfo
    else if (section === "primaryMissions")
      card = missionDeckCards.primaryMissions.find((cardInfo: CardInfo) => cardInfo.cardTitle === label) as CardInfo
    else
      card = missionDeckCards.layouts.find((cardInfo: CardInfo) => cardInfo.cardTitle === `Layout ${label}`) as CardInfo

    return {
      cardTitle: card.cardTitle,
      card: (
        <Tooltip
          openDelay={300}
          multiline
          h={section === "layouts" ? 324 : 540}
          w={section === "layouts" ? 440 : 324}
          position={section === "layouts" ? "left" : "bottom"}
          offset={section === "layouts" ? { mainAxis: 30, crossAxis: 120 } : { mainAxis: 4, crossAxis: 0}}
          color="transparent"
          label={
            <div className={styles.cardTooltip}>
              {card.card}
            </div>
          }
        >
          <span className={styles.cardTooltipLabel}>
            {label}
          </span>
        </Tooltip>
      )
    }
  }

  return rows.map((row: TournamentPresetsRow) => {
    return [
      CardTooltip(row[0], "primaryMissions"),
      CardTooltip(row[1], "missionRules"),
      CardTooltip(row[2], "deployments"),
      row[3].map((layout: number) => CardTooltip(layout.toString(), "layouts"))
    ]
  })
}

const leviathanTournamentPresets: TournamentPresetsRows = [
  ["Take and Hold", "Chilling Rain", "Search and Destroy", [1, 3, 4]],
  ["Priority Targets", "Hidden Supplies", "Search and Destroy", [1, 3, 4]],
  ["The Ritual", "Scrambler Fields", "Sweeping Engagement", [1, 2, 3, 4]],
  ["Deploy Servo-Skulls", "Chilling Rain", "Search and Destroy", [1, 3, 4]],
  ["Take and Hold", "Chosen Battlefield", "Sweeping Engagement", [1, 2, 3, 4]],
  ["Supply Drop", "Chilling Rain", "Search and Destroy", [1, 3, 4]],
  ["Sites of Power", "Chilling Rain", "Hammer and Anvil", [1, 2, 4]],
  ["The Ritual", "Chilling Rain", "Hammer and Anvil", [1, 2, 4]],
  ["Take and Hold", "Hidden Supplies", "Hammer and Anvil", [1, 2, 4]],
  ["Priority Targets", "Chilling Rain", "Crucible of Battle", [1, 3, 4]],
  ["Deploy Servo-Skulls", "Hidden Supplies", "Crucible of Battle", [1, 3, 4]],
  ["Scorched Earth", "Chilling Rain", "Dawn of War", [1, 2, 3]],
  ["Purge the Foe", "Chilling Rain", "Crucible of Battle", [1, 3, 4]],
  ["Priority Targets", "Chosen Battlefield", "Dawn of War", [1, 2, 3]],
  ["Vital Ground", "Chilling Rain", "Crucible of Battle", [1, 3, 4]],
]

const pariahNexusTournamentPresets: TournamentPresetsRows = [
  ["Take and Hold", "Raise Banners", "Tipping Point", [1, 2, 4, 6, 7, 8]],
  ["Purge the Foe", "Smoke and Mirrors", "Tipping Point", [1, 2, 4, 6, 7, 8]],
  ["Linchpin", "Fog of War", "Tipping Point", [1, 2, 4, 6, 7, 8]],
  ["Scorched Earth", "Swift Action", "Tipping Point", [1, 2, 4, 6, 7, 8]],
  ["Take and Hold", "Prepared Positions", "Hammer and Anvil", [1, 7, 8]],
  ["Burden of Trust", "Hidden Supplies", "Hammer and Anvil", [1, 7, 8]],
  ["The Ritual", "Stalwarts", "Hammer and Anvil", [1, 7, 8]],
  ["Supply Drop", "Smoke and Mirrors", "Hammer and Anvil", [1, 7, 8]],
  ["Burden of Trust", "Prepared Positions", "Search and Destroy", [1, 2, 3, 4, 6]],
  ["Linchpin", "Raise Banners", "Search and Destroy", [1, 2, 3, 4, 6]],
  ["Scorched Earth", "Stalwarts", "Search and Destroy", [1, 2, 3, 4, 6]],
  ["Take and Hold", "Hidden Supplies", "Search and Destroy", [1, 2, 3, 4, 6]],
  ["Purge the Foe", "Rapid Escalation", "Crucible of Battle", [1, 2, 4, 6, 8]],
  ["The Ritual", "Swift Action", "Crucible of Battle", [1, 2, 4, 6, 8]],
  ["Terraform", "Stalwarts", "Crucible of Battle", [1, 2, 4, 6, 8]],
  ["Scorched Earth", "Inspired Leadership", "Crucible of Battle", [1, 2, 4, 6, 8]],
  ["Supply Drop", "Rapid Escalation", "Sweeping Engagement", [3, 5]],
  ["Terraform", "Swift Action", "Sweeping Engagement", [3, 5]],
  ["Linchpin", "Raise Banners", "Dawn of War", [5]],
  ["Unexploded Ordnance", "Inspired Leadership", "Dawn of War", [5]],
]
