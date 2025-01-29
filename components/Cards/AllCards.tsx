import { LeviathanCards, MissionCard } from "@/app/cards/(all_cards)/leviathan/leviathan_cards"
import Card from "@/components/Cards/Card"
import ClickableCard from "./ClickableCard"

export interface UntypedCards {
  [key: string]: Array<React.ReactNode>
  [key: number]: Array<React.ReactNode>
  untyped: Array<React.ReactNode>
}
export interface TypedCards {
  [key: string]: Array<React.ReactNode>
  attacker: Array<React.ReactNode>
  defender: Array<React.ReactNode>
}
export interface MissionDeckCards {
  [key: string]: UntypedCards | TypedCards
  deployments: UntypedCards
  missionRules: UntypedCards
  primaryMissions: UntypedCards
  secondaryMissions: TypedCards
  gambits: TypedCards
}
export type MissionDeck = "Leviathan" | "Pariah Nexus"
export type Section = "deployments" | "missionRules" | "primaryMissions" | "secondaryMissions" | "gambits"
export type CardVariants = "attacker" | "defender" | "untyped"

export class AllCards {
  public missionDeck: MissionDeck
  public cards: MissionDeckCards | null = null
  public allCards: LeviathanCards

  constructor(allCards: LeviathanCards, missionDeck: MissionDeck) {
    this.missionDeck = missionDeck
    this.allCards = allCards
  }

  public async generateCardsAsync() {
    this.cards = {
      deployments: await this.generateUntypedCards(this.allCards.deployments, "deployments"),
      missionRules: await this.generateUntypedCards(this.allCards.missionRules, "missionRules"),
      primaryMissions: await this.generateUntypedCards(this.allCards.primaryMissions, "primaryMissions"),
      secondaryMissions: await this.generateTypedCards(this.allCards.secondaryMissions, "secondaryMissions"),
      gambits: await this.generateTypedCards(this.allCards.gambits, "gambits"),
    }
  }

  private async generateUntypedCards(cardGroup: Array<MissionCard>, section: Section) : Promise<UntypedCards> {
    const untypedReturn: UntypedCards = { untyped: [] }

    cardGroup.forEach(async (card: MissionCard, index: number) => {
      const constructedCard: React.ReactNode = await Card({ card, variant: "untyped" })
      untypedReturn.untyped.push(
        <ClickableCard missionDeck={this.missionDeck} section={section} cardIndex={index} variant="untyped">
          {constructedCard}
        </ClickableCard>
      )
    })

    return untypedReturn
  }

  private async generateTypedCards(cardGroup: Array<MissionCard>, section: Section) : Promise<TypedCards> {
    const typedReturn: TypedCards = { attacker: [], defender: [] }

    typedReturn.attacker = cardGroup.map(async (card: MissionCard, index: number) => {
      const constructedCard: React.ReactNode = await Card({ card, variant: "attacker" })
      return (
        <ClickableCard missionDeck={this.missionDeck} section={section} cardIndex={index} variant="attacker">
          {constructedCard}
        </ClickableCard>
      )
    })
    typedReturn.defender = cardGroup.map(async (card: MissionCard, index: number) => {
      const constructedCard: React.ReactNode = await Card({ card, variant: "defender" })
      return (
        <ClickableCard missionDeck={this.missionDeck} section={section} cardIndex={index} variant="defender">
          {constructedCard}
        </ClickableCard>
      )
    })

    return typedReturn
  }
}