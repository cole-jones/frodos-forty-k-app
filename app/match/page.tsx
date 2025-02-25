'use server'

import MissionDeckSelector from "@/components/Match/MissionDeckSelector"

export default async function CardsPage() : Promise<React.ReactNode> {
  return await MissionDeckSelector("match")
}