import { leviathanCards, type LeviathanCards, type MissionCard } from "@/app/cards/(all_cards)/leviathan/leviathan_cards"
import Card from "@/components/Cards/Card"
import ClickableCard from "@/components/Cards/ClickableCard"

export interface CardInfo {
  missionDeckName: MissionDeckName
  missionDeckSection: MissionDeckSection
  cardType: CardType | null
  cardIndex: number
  card: React.ReactNode
}
export type Cards = Array<CardInfo>
export interface TypedCards {
  attacker: Array<CardInfo>
  defender: Array<CardInfo>
}


export interface MissionDeckCards {
  [key: number]: Cards
  [key: string]: any
  deployments: Cards
  missionRules: Cards
  primaryMissions: Cards
  secondaryMissions: TypedCards
  gambits: TypedCards
}
export type MissionDeckName = "Leviathan" | "Pariah Nexus"
export type MissionDeckSection = "deployments" | "missionRules" | "primaryMissions" | "secondaryMissions" | "gambits"
export type CardType = "attacker" | "defender"

export async function MissionDeck(missionDeckName: "Leviathan" | "Pariah Nexus") : Promise<MissionDeckCards> {
  async function generateCardsAsync(missionDeckName: "Leviathan" | "Pariah Nexus") {
    let cards: LeviathanCards
    if (missionDeckName === "Leviathan") {
      cards = leviathanCards
    }
    else {
      // TODO: Replace this with Pariah Nexus cards
      cards = leviathanCards
    }

    const missionDeckCards: MissionDeckCards = {
      deployments: await generateCards(cards.deployments, "deployments"),
      missionRules: await generateCards(cards.missionRules, "missionRules"),
      primaryMissions: await generateCards(cards.primaryMissions, "primaryMissions"),
      secondaryMissions: await generateTypedCards(cards.secondaryMissions, "secondaryMissions"),
      gambits: await generateTypedCards(cards.gambits, "gambits"),
    }

    return missionDeckCards
  }

  async function generateCards(cardGroup: Array<MissionCard>, missionDeckSection: MissionDeckSection) : Promise<Cards> {
    const untypedReturn: Cards = []

    cardGroup.forEach(async (card: MissionCard, cardIndex: number) => {
      const constructedCard: React.ReactNode = await Card({ card, variant: null })
      const cardWithInfo: CardInfo = {
        missionDeckName,
        missionDeckSection,
        cardType: null,
        cardIndex,
        card: (
          <ClickableCard missionDeckName={missionDeckName} missionDeckSection={missionDeckSection} cardIndex={cardIndex} cardType={null}>
            {constructedCard}
          </ClickableCard>
        )
      }
      untypedReturn.push(cardWithInfo)
    })

    return untypedReturn
  }

  async function generateTypedCards(cardGroup: Array<MissionCard>, missionDeckSection: MissionDeckSection) : Promise<TypedCards> {
    const typedReturn: TypedCards = { attacker: [], defender: [] }

    cardGroup.forEach(async (card: MissionCard, cardIndex: number) => {
      const constructedCard: React.ReactNode = await Card({ card, variant: "attacker" })
      const cardWithInfo: CardInfo = {
        missionDeckName,
        missionDeckSection,
        cardType: "attacker",
        cardIndex,
        card: (
          <ClickableCard missionDeckName={missionDeckName} missionDeckSection={missionDeckSection} cardIndex={cardIndex} cardType="attacker">
            {constructedCard}
          </ClickableCard>
        )
      }
      typedReturn.attacker.push(cardWithInfo)
    })
    cardGroup.forEach(async (card: MissionCard, cardIndex: number) => {
      const constructedCard: React.ReactNode = await Card({ card, variant: "defender" })
      const cardWithInfo: CardInfo = {
        missionDeckName,
        missionDeckSection,
        cardType: "defender",
        cardIndex,
        card: (
          <ClickableCard missionDeckName={missionDeckName} missionDeckSection={missionDeckSection} cardIndex={cardIndex} cardType="defender">
            {constructedCard}
          </ClickableCard>
        )
      }
      typedReturn.defender.push(cardWithInfo)
    })

    return typedReturn
  }

  return await generateCardsAsync(missionDeckName)
}