'use server'

import { Suspense } from "react"
import CardsShowcase from "@/components/Cards/CardsShowcase"
import CardViewer from "@/components/Cards/CardViewer"
import { MissionDeck, type MissionDeckName, type MissionDeckCards } from "@/components/Cards/MissionDeck"

export default async function Page({ params }: { params: Promise<{ mission_deck: string }>}) : Promise<React.ReactNode> {
  const missionDeckParam = (await params).mission_deck
  const missionDeckName: MissionDeckName = missionDeckParam === "leviathan" ? "Leviathan" : "Pariah Nexus"
  const missionDeckCards: MissionDeckCards = await MissionDeck(missionDeckName)

  return (
    <div style={{ width: '100%', height: 'var(--app-body-height)' }}>
      {missionDeckName === "Leviathan" ?
        <CardViewer leviathanCards={missionDeckCards} />
        :
        <CardViewer pariahNexusCards={missionDeckCards} />
      }
      <Suspense fallback={<div/>}>
        <CardsShowcase missionDeckCards={missionDeckCards} />
      </Suspense>
    </div>
  )
}