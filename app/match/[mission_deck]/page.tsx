'use server'

import Match from "@/components/Match/Match"
import CardViewer from "@/components/Cards/CardViewer"
import ScoreTracker from "@/components/Match/ScoreTracker"
import { MissionDeck, type MissionDeckName, type MissionDeckCards } from "@/components/Cards/MissionDeck"
import styles from "@/css/Match.module.css"

export default async function Page({ params }: { params: Promise<{ mission_deck: string }>}) : Promise<React.ReactNode> {
  const missionDeckParam = (await params).mission_deck
  const missionDeckName: MissionDeckName = missionDeckParam === "leviathan" ? "Leviathan" : "Pariah Nexus"
  const missionDeckCards: MissionDeckCards = await MissionDeck(missionDeckName)

  return (
    <div className={styles.matchPage}>
      <ScoreTracker player="Attacker" />
      {missionDeckName === "Leviathan" ?
        <CardViewer leviathanCards={missionDeckCards} />
        :
        <CardViewer pariahNexusCards={missionDeckCards} />
      }
      <Match missionDeckCards={missionDeckCards} />
      <ScoreTracker player="Defender" />
    </div>
  )
}