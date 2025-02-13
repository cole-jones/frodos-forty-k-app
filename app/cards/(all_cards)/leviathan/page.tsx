'use server'

import { ScrollArea } from "@mantine/core"
import { MissionDeck, type CardInfo } from "@/components/Cards/MissionDeck"
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
  const allCards = await MissionDeck("Leviathan")
  console.log(allCards)

  return (
    <div className={cardStyles.allCardsContainer}>
      <CardViewer leviathanCards={allCards} />

      <h2>Deployments</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.deployments.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <h2>Mission Rules</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.missionRules.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <h2>Primary Missions</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.primaryMissions.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <h2>Secondary Missions</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.secondaryMissions?.attacker.map((card: CardInfo) => card.card)}
        </div>
        <div className={cardStyles.cardList}>
          {allCards?.secondaryMissions?.defender.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <h2>Gambits</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {allCards?.gambits?.attacker.map((card: CardInfo) => card.card)}
        </div>
        <div className={cardStyles.cardList}>
          {allCards?.gambits?.defender.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>
    </div>
  )
}