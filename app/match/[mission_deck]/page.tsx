'use server'

import Match from "@/components/Match/Match"
import CardViewer from "@/components/Cards/CardViewer"
import ScoreTracker from "@/components/Match/ScoreTracker"
import { MissionDeck, type MissionDeckName, type MissionDeckCards } from "@/components/Cards/MissionDeck"
import { TournamentPresets } from "@/components/Match/TournamentPresets"
import styles from "@/css/Match.module.css"

export default async function Page({ params }: { params: Promise<{ mission_deck: string }>}) : Promise<React.ReactNode> {
  const missionDeckParam = (await params).mission_deck
  const missionDeckName: MissionDeckName = missionDeckParam === "leviathan" ? "Leviathan" : "Pariah Nexus"
  const missionDeckCards: MissionDeckCards = await MissionDeck(missionDeckName)
  const tournamentPresets: Array<React.ReactNode> = await TournamentPresets(missionDeckName, missionDeckCards)

  return (
    <div className={styles.matchPage}>
      <ScoreTracker player="Attacker" />
      {missionDeckName === "Leviathan" ?
        <CardViewer leviathanCards={missionDeckCards} />
        :
        <CardViewer pariahNexusCards={missionDeckCards} />
      }
      <Match
        missionDeckName={missionDeckName}
        missionDeckCards={missionDeckCards}
        tournamentPresets={tournamentPresets}
      />
      <ScoreTracker player="Defender" />
    </div>
  )
}