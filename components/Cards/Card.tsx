'use server'

import { type MissionCard } from '@/components/Cards/MissionDeck'
import { type CardType, type MissionDeckName } from "@/components/Cards/MissionDeck"
import { CardContainer, CardHeader, CardFlavor, CardBody, Separator } from "@/components/Cards/MissionDeckComponents"

/**
 * Render a single MissionCard from the Leviathan deck.
 *
 * @param card - MissionCard object holding information about the card.
 * @param missionDeckName - The name of the mission deck, "Leviathan" or "Pariah Nexus".
 * @param cardType - The type of card, either "Attacker" or "Defender" or null.
 *
 * @returns ReactNode representing a single rendered Mission Deck card with all styling.
 */
export default async function Card({
  card,
  missionDeckName,
  cardType = null
} : {
  card: MissionCard,
  missionDeckName: MissionDeckName,
  cardType?: CardType | null
}) : Promise<React.ReactNode> {
  const isPariah: boolean = missionDeckName === "Pariah Nexus"

  /* Since Deployment cards have the image as their body, they only need the header. */
  if (card.section === "deployments") {
    return (
      <CardContainer
        missionDeckName={missionDeckName}
        cardTitle={card.title}
        cardSection={card.section}
        cardIsFixed={card.isFixed}
        cardType={cardType}
      >
        <CardHeader
          cardTitle={card.title}
          cardSection={card.section}
          cardType={cardType}
        />
      </CardContainer>
    )
  }

  /* If the card is not Deployment, build the whole thing. */
  return (
    <CardContainer
      missionDeckName={missionDeckName}
      cardTitle={card.title}
      cardSection={card.section}
      cardIsFixed={card.isFixed}
      cardType={cardType}
    >
      <CardHeader
        cardTitle={card.title}
        cardSection={card.section}
        cardType={cardType}
      />
      <CardFlavor
        pariahNexus={isPariah}
        cardSection={card.section}
        cardFlavor={card.flavor}
      />
      <Separator
        leviathan={!isPariah}
        pariahNexus={isPariah}
      />
      <CardBody
        cardSection={card.section}
        cardBody={card.body}
        cardType={cardType}
      />
    </CardContainer>
  )
}