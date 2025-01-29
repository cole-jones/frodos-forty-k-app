'use server'

import { ScrollArea } from "@mantine/core"
import { leviathanCards } from "@/app/cards/(all_cards)/leviathan/leviathan_cards"
import { AllCards } from "@/components/Cards/AllCards"
import CardViewer from "@/components/Cards/CardViewer"
import cardStyles from "@/css/Cards.module.css"
import scrollbarStyles from "@/css/Scrollbars.module.css"
import "@/css/Cards.css"

export default async function LeviathanCardShowcase(): Promise<React.ReactNode> {
  /**
   * Lists all cards from @/app/cards/leviathan_cards.tsx,
   * both Attacker and Defender for Secondary Missions and Gambits.
   * 
   * 
   * @returns Promise<ReactNode> representing all Leviathan cards in scrollable containers
   */
  const allCards = new AllCards(leviathanCards, "Leviathan")
  await allCards.generateCardsAsync()

  return (
    <div className={cardStyles.allCardsContainer}>
      <CardViewer leviathanCards={allCards.cards} />

      <h2>Deployments</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.cards?.deployments?.untyped}
        </div>
      </ScrollArea>

      <h2>Mission Rules</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.cards?.missionRules?.untyped}
        </div>
      </ScrollArea>

      <h2>Primary Missions</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.cards?.primaryMissions?.untyped}
        </div>
      </ScrollArea>

      <h2>Secondary Missions</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.cards?.secondaryMissions?.attacker}
        </div>
        <div className={cardStyles.cardList}>
          {allCards?.cards?.secondaryMissions?.defender}
        </div>
      </ScrollArea>

      <h2>Gambits</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.cards?.gambits?.attacker}
        </div>
        <div className={cardStyles.cardList}>
          {allCards?.cards?.gambits?.defender}
        </div>
      </ScrollArea>
    </div>
  )
}