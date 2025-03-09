import { leviathanCards, type LeviathanCards } from "@/app/cards/leviathan_cards"
import { pariahNexusCards, type PariahNexusCards } from "@/app/cards/pariah_nexus_cards"
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
export interface MissionCard {
  isFixed: boolean
  firstTurnAllowed?: boolean
  section: MissionDeckSection
  title: string
  flavor: string
  body: React.ReactNode | null
}
export interface MissionDeckCards {
  [key: number]: Cards
  [key: string]: any
  deployments: Cards
  missionRules: Cards
  primaryMissions: Cards
  secondaryMissions: TypedCards
  gambits?: TypedCards
  secretMissions?: TypedCards
}
export interface MissionDeckCardIndices {
  [key: number]: Array<number>
  deployments: Array<number>
  missionRules: Array<number>
  primaryMissions: Array<number>
  secondaryMissions: {
    attacker: Array<number>,
    defender: Array<number>,
  }
  gambits: {
    attacker: Array<number>,
    defender: Array<number>,
  }
  secretMissions: {
    attacker: Array<number>,
    defender: Array<number>,
  }
}
export interface MissionDeckCardsActive {
  deployments: number | null
  missionRules: number | null
  primaryMissions: number | null
  secondaryMissions: {
    attacker: Array<number | null>,
    defender: Array<number | null>,
  }
  gambits: {
    attacker: number | null,
    defender: number | null,
  }
  secretMissions: {
    attacker: number | null,
    defender: number | null,
  }
}
export type MissionDeckName = "Leviathan" | "Pariah Nexus"
export type MissionDeckSection = "deployments" | "missionRules" | "primaryMissions" | "secondaryMissions" | "gambits" | "secretMissions"
export type MissionDeckSectionUntyped = "deployments" | "missionRules" | "primaryMissions"
export type MissionDeckSectionTyped = "secondaryMissions" | "gambits" | "secretMissions"
export type CardType = "attacker" | "defender"

export async function MissionDeck(missionDeckName: "Leviathan" | "Pariah Nexus") : Promise<MissionDeckCards> {
  async function generateCardsAsync() {
    let cards: LeviathanCards | PariahNexusCards

    if (missionDeckName === "Leviathan") {
      cards = leviathanCards
    }
    else {
      cards = pariahNexusCards
    }

    const missionDeckCards: MissionDeckCards = {
      deployments: await generateCards(cards.deployments, "deployments"),
      missionRules: await generateCards(cards.missionRules, "missionRules"),
      primaryMissions: await generateCards(cards.primaryMissions, "primaryMissions"),
      secondaryMissions: await generateTypedCards(cards.secondaryMissions, "secondaryMissions"),
    }
    if ("gambits" in cards) {
      missionDeckCards.gambits = await generateTypedCards(cards.gambits, "gambits")
    } else if ("secretMissions" in cards) {
      missionDeckCards.secretMissions = await generateTypedCards(cards.secretMissions, "secretMissions")
    }

    return missionDeckCards
  }

  async function generateCards(cardGroup: Array<MissionCard>, missionDeckSection: MissionDeckSection) : Promise<Cards> {
    const untypedReturn: Cards = []

    cardGroup.forEach(async (card: MissionCard, cardIndex: number) => {
      const constructedCard: React.ReactNode = await Card({ card, missionDeckName, cardType: null })
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
      const constructedCard: React.ReactNode = await Card({ card, missionDeckName, cardType: "attacker" })
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
      const constructedCard: React.ReactNode = await Card({ card, missionDeckName, cardType: "defender" })
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

  return await generateCardsAsync()
}