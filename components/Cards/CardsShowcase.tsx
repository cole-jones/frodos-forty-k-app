'use server'

import { ScrollArea } from "@mantine/core"
import { capitalizeEachWord } from "@/utils/utility_functions"
import { type MissionDeckCards, type CardInfo } from "@/components/Cards/MissionDeck"
import cardStyles from "@/css/Cards.module.css"
import scrollbarStyles from "@/css/Scrollbars.module.css"
import "@/css/Cards.css"

/**
 * Lists all cards from @/app/cards/leviathan_cards.tsx or @/app/cards/pariah_nexus_cards.tsx,
 * both Attacker and Defender for Secondary Missions and Gambits.
 * 
 * @param missionDeckCards - MissionDeckCards object holding all of the rendered cards for a mission deck.
 * 
 * @returns Promise<ReactNode> representing all cards of a mission deck in scrollable containers.
 */
export default async function CardsShowcase({ missionDeckCards } : { missionDeckCards: MissionDeckCards }): Promise<React.ReactNode> {
  return (
    <div className={cardStyles.allCardsContainer}>
      {Object.keys(missionDeckCards).map((key: string) => {
        return (
          <>
            <h2>{capitalizeEachWord(key, " ")}</h2>
            <ScrollArea
                type="auto"
                scrollbars="x"
                offsetScrollbars
                w="var(--app-body-width)" // Calculate size based on width of viewport
                classNames={scrollbarStyles}
            >
              {["secondaryMissions", "gambits", "secretMissions"].includes(key) ?
                <>
                  <div key={`${capitalizeEachWord(key, "-")}-attacker-card-list`} className={cardStyles.cardList}>
                    {missionDeckCards[key].attacker.map((card: CardInfo) => card.card)}
                  </div>
                  <div key={`${capitalizeEachWord(key, "-")}-defender-card-list`} className={cardStyles.cardList}>
                    {missionDeckCards[key].defender.map((card: CardInfo) => card.card)}
                  </div>
                </>
                :
                <div key={`${capitalizeEachWord(key, "-")}-card-list`} className={cardStyles.cardList}>
                  {missionDeckCards[key].map((card: CardInfo) => card.card)}
                </div>
              }
            </ScrollArea>
          </>
        )
      })}
    </div>
  )
}