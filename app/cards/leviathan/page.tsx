'use server'

import { ScrollArea } from "@mantine/core"
import { leviathanCards } from "@/app/cards/leviathan/leviathan_cards"
import CardList from "@/components/Cards/CardList"
import cardStyles from "@/css/Cards.module.css"
import scrollbarStyles from "@/css/Scrollbars.module.css"
import "@/css/Cards.css"

export default async function AllCards(): Promise<React.ReactNode> {
  /**
   * Lists all cards from @/app/cards/leviathan_cards.tsx,
   * both Attacker and Defender for Secondary Missions and Gambits.
   * 
   * 
   * @returns Promise<ReactNode> representing all Leviathan cards in scrollable containers
   */
  return (
    <div className={cardStyles.allCardsContainer}>
      <h2>Deployments</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <CardList keyName="leviathan-deployments" cards={leviathanCards.deployments} />
      </ScrollArea>

      <h2>Mission Rules</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <CardList keyName="leviathan-mission-rules" cards={leviathanCards.missionRules} />
      </ScrollArea>

      <h2>Primary Missions</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <CardList keyName="leviathan-primary-missions" cards={leviathanCards.primaryMissions} />
      </ScrollArea>

      <h2>Secondary Missions</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <CardList keyName="leviathan-attacker-secondary-missions" cards={leviathanCards.secondaryMissions} variant="Attacker" />
        <CardList keyName="leviathan-defender-secondary-missions" cards={leviathanCards.secondaryMissions} variant="Defender" />
      </ScrollArea>

      <h2>Gambits</h2>
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--mantine-scrollarea-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <CardList keyName="leviathan-attacker-gambits" cards={leviathanCards.gambits} variant="Attacker" />
        <CardList keyName="leviathan-defender-gambits" cards={leviathanCards.gambits} variant="Defender" />
      </ScrollArea>
    </div>
  )
}