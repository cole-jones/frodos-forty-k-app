'use client'

import { useReducer } from "react"
import { Button, ScrollArea } from "@mantine/core"
import { type CardInfo, type TypedCards, type MissionDeckCards, type MissionDeckSection, type CardType } from "@/components/Cards/MissionDeck"
import scrollbarStyles from "@/css/Scrollbars.module.css"
import cardStyles from "@/css/Cards.module.css"
import "@/css/Cards.css"

export class MatchClass {
  public cards: MissionDeckCards
  public discards: TypedCards

  constructor(missionDeckCards: MissionDeckCards) {
    this.cards = missionDeckCards
    this.discards = { attacker: [], defender: [] }

    this.fisherYatesShuffle.bind(this)
    this.shuffleDeployments.bind(this)
  }

  private fisherYatesShuffle(array: Array<CardInfo>) : Array<CardInfo> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }

  public shuffleDeployments() {
    this.cards.deployments = this.fisherYatesShuffle(this.cards.deployments)
  }

  public shuffleMissionRules() {
    this.cards.missionRules = this.fisherYatesShuffle(this.cards.missionRules)
  }

  public shufflePrimaryMissions() {
    this.cards.primaryMissions = this.fisherYatesShuffle(this.cards.primaryMissions)
  }

  public shuffleSecondaryMissions(cardType: CardType) {
    this.cards.secondaryMissions[cardType] = this.fisherYatesShuffle(this.cards.secondaryMissions[cardType])
  }

  public shuffleGambits(cardType: CardType) {
    this.cards.gambits[cardType] = this.fisherYatesShuffle(this.cards.gambits[cardType])
  }
}

export function Match({ missionDeckCards } : { missionDeckCards: MissionDeckCards }) {
  const match: MatchClass = new MatchClass(missionDeckCards)

  // Since changing class values doesn't proc a re-render, make a new function to force re-render
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function shuffle(section: MissionDeckSection, attOrDef: CardType | null = null) {
    if (section === "deployments") {
      match.shuffleDeployments()
    } else if (section === "missionRules") {
      match.shuffleMissionRules()
    } else if (section === "primaryMissions") {
      match.shufflePrimaryMissions()
    } else if (section === "secondaryMissions" && attOrDef !== null) {
      match.shuffleSecondaryMissions(attOrDef)
    } else if (section === "gambits" && attOrDef !== null) {
      match.shuffleGambits(attOrDef)
    }

    forceUpdate()
  }

  return (
    <div style={{ border: '1px solid red', height: '100%', width: '100%' }}>
      <Button
        onClick={() => shuffle("deployments")}
      >
        Shuffle Deployments
      </Button>
      <br />
      Current deployments: 
      <br />
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {match.cards?.deployments.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <br /><br />

      <Button
        onClick={() => shuffle("missionRules")}
      >
        Shuffle Mission Rules
      </Button>
      <br />
      Current mission rules: 
      <br />
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {match.cards?.missionRules.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <br /><br />

      <Button
        onClick={() => shuffle("primaryMissions")}
      >
        Shuffle Primary Missions
      </Button>
      <br />
      Current primary missions: 
      <br />
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {match.cards?.primaryMissions.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <br /><br />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          onClick={() => shuffle("secondaryMissions", "attacker")}
          style={{ marginRight: 10 }}
        >
          Shuffle Attacker Secondary Missions
        </Button>
        <Button
          onClick={() => shuffle("secondaryMissions", "defender")}
        >
          Shuffle Defender Secondary Missions
        </Button>
      </div>
      <br />
      Current secondary missions: 
      <br />
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {match.cards?.secondaryMissions?.attacker.map((card: CardInfo) => card.card)}
        </div>
        <div className={cardStyles.cardList}>
          {match.cards?.secondaryMissions?.defender.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>

      <br /><br />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          onClick={() => shuffle("gambits", "attacker")}
          style={{ marginRight: 10 }}
        >
          Shuffle Attacker Gambits
        </Button>
        <Button
          onClick={() => shuffle("gambits", "defender")}
        >
          Shuffle Defender Gambits
        </Button>
      </div>
      <br />
      Current gambits: 
      <br />
      <ScrollArea
          type="auto"
          scrollbars="x"
          offsetScrollbars
          w="var(--app-body-width)" // Calculate size based on width of viewport
          classNames={scrollbarStyles}
      >
        <div className={cardStyles.cardList}>
          {match.cards?.gambits?.attacker.map((card: CardInfo) => card.card)}
        </div>
        <div className={cardStyles.cardList}>
          {match.cards?.gambits?.defender.map((card: CardInfo) => card.card)}
        </div>
      </ScrollArea>
    </div>
  )
}