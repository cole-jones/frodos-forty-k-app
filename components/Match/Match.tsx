'use client'

import { useEffect, useReducer, useState } from "react"
import { Button, ScrollArea } from "@mantine/core"
import {
  type Cards,
  type CardInfo,
  type CardType,
  type TypedCards,
  type MissionDeckCards,
  type MissionDeckCardIndices,
  type MissionDeckCardsActive,
  type MissionDeckSection,
  type MissionDeckSectionUntyped,
  type MissionDeckSectionTyped,
} from "@/components/Cards/MissionDeck"
import { pascalCase } from "@/utils/utility_functions"
import scrollbarStyles from "@/css/Scrollbars.module.css"
import cardStyles from "@/css/Cards.module.css"
import "@/css/Cards.css"

interface MatchObject {
  deck: MissionDeckCardIndices,
  //discards: MissionDeckCardIndices, // Don't know if keeping track of discards is strictly necessary...
  missionSetup: MissionSetupCards,
  attacker: PlayerMissions,
  defender: PlayerMissions,
}

interface MissionSetupCards {
  deployment: number | null
  missionRule: number | null
  primaryMission: number | null
}

interface PlayerMissions {
  secondaryMissionOne: number | null
  secondaryMissionTwo: number | null
  secondaryMissionThree?: number | null
  tertiaryMission: number | null
}

interface MatchReducerAction {
  type: string
  section: MissionDeckSection
  player?: CardType
  secondaryMissionIndex?: number
}

function initializeMatchObject(missionDeckCards: MissionDeckCards) : MatchObject {
  return {
    deck: {
      deployments: missionDeckCards.deployments.map(x => x.cardIndex),
      missionRules: missionDeckCards.missionRules.map(x => x.cardIndex),
      primaryMissions: missionDeckCards.primaryMissions.map(x => x.cardIndex),
      secondaryMissions: {
        attacker: missionDeckCards.secondaryMissions.attacker.map(x => x.cardIndex),
        defender: missionDeckCards.secondaryMissions.defender.map(x => x.cardIndex),
      },
      gambits: {
        attacker: missionDeckCards.gambits?.attacker.map(x => x.cardIndex) ?? [],
        defender: missionDeckCards.gambits?.defender.map(x => x.cardIndex) ?? [],
      },
      secretMissions: {
        attacker: missionDeckCards.secretMissions?.attacker.map(x => x.cardIndex) ?? [],
        defender: missionDeckCards.secretMissions?.defender.map(x => x.cardIndex) ?? [],
      },
    } as MissionDeckCardIndices,
    missionSetup: {
      deployment: null,
      missionRule: null,
      primaryMission: null,
    } as MissionSetupCards,
    attacker: {
      secondaryMissionOne: null,
      secondaryMissionTwo: null,
      tertiaryMission: null,
    } as PlayerMissions,
    defender: {
      secondaryMissionOne: null,
      secondaryMissionTwo: null,
      tertiaryMission: null,
    } as PlayerMissions
  } as MatchObject
}

// TODO: Possibly consider moving type definitions for MissionDeck into a new file,
// would be able to provide functions for checking if a variable belongs to a type, like:
//    const missionDeckSectionTyped = ["secondaryMissions", "gambits", "secretMissions"] as const
//    export type MissionDeckSectionTyped = typeof missionDeckSectionTyped[number]
//    export function isMissionDeckSectionTyped(input: string): input is MissionDeckSectionTyped {
//      return missionDeckSectionTyped.includes(input as MissionDeckSectionTyped)
//    }

export default function Match({ missionDeckCards } : { missionDeckCards: MissionDeckCards }) {
  // Since changing class values doesn't proc a re-render, make a new function to force re-render
  //const [, forceUpdate] = useReducer(x => x + 1, 0);

  //const [missionDeck, setMissionDeck] = useState({} as MissionDeckCardIndices)
  const [missionSetup, setMissionSetup] = useState({} as MissionSetupCards)
  const [attackerMissions, setAttackerMissions] = useState({} as PlayerMissions)
  const [defenderMissions, setDefenderMissions] = useState({} as PlayerMissions)

  const [match, matchDispatch] = useReducer(matchReducer, initializeMatchObject(missionDeckCards))

  function matchReducer(state: MatchObject, action: MatchReducerAction) {
    const hasPlayerSection: boolean = (
      action?.player &&
      ["secondaryMissions", "gambits", "secretMissions"].includes(action.section)
    ) ?? false
    const cardsRemaining: number = hasPlayerSection ?
      state.deck[action.section as MissionDeckSectionTyped][action.player as CardType].length
      :
      state.deck[action.section as MissionDeckSectionUntyped].length

    switch (action.type) {
      case "shuffle": {
        if (cardsRemaining === 0) {
          console.warn(`No cards remaining in deck '${action.section}'${action?.player ? ` for player ${action.player}` : ''}, nothing to shuffle`)
          return state
        }

        console.log(`Shuffling deck '${action.section}'`)
        let deckToShuffle: Array<number> = hasPlayerSection ? 
          state.deck[action.section as MissionDeckSectionTyped][action.player as CardType] as Array<number>
          :
          state.deck[action.section] as Array<number>

        return {
          ...state,
          deck: {
            ...state.deck,
            [action.section]: hasPlayerSection ?
              {
                ...state.deck[action.section],
                [action.player as CardType]: fisherYatesShuffle(deckToShuffle)
              }
              :
              fisherYatesShuffle(deckToShuffle)
          }
        }
      }
      case "draw": {
        // Check if it's possible to draw the card.
        // If the deck section is out of cards, or if the player has already drawn a card, skip all this
        if (cardsRemaining === 0) {
          console.warn(`No cards remaining in deck '${action.section}'${action?.player ? ` for player ${action.player}` : ''}, nothing to draw`)
          return state
        }
        validation: // Label so the break below doesn't break out of the switch
        if (action?.player) {
          if (action.section === "secondaryMissions" && action?.secondaryMissionIndex === 0 && state[action.player as CardType].secondaryMissionOne !== null)
            console.warn(`${pascalCase(action.player)} has already selected their first Secondary Mission`)
          else if (action.section === "secondaryMissions" && action?.secondaryMissionIndex === 1 && state[action.player as CardType].secondaryMissionTwo !== null)
            console.warn(`${pascalCase(action.player)} has already selected their second Secondary Mission`)
          else if ((action.section === "gambits" || action.section === "secretMissions") && state[action.player as CardType].tertiaryMission !== null)
            console.warn(`${pascalCase(action.player)} has already selected their Tertiary Mission`)
          else
            break validation

          return state
        }

        console.log(`Drawing card from section '${action.section}'${action?.player ? ` for ${action.player}` : ''}`)

        let drawnCard: number
        let remainingDeck: Array<number> | number
        [drawnCard, ...remainingDeck] = hasPlayerSection ?
          [...state.deck[action.section as MissionDeckSectionTyped][action.player as CardType]]
          :
          [...state.deck[action.section as MissionDeckSectionUntyped]]

        let returnState = {
          ...state,
          deck: {
            ...state.deck,
            [action.section]: hasPlayerSection ?
              {
                ...state.deck[action.section],
                [action.player as CardType]: remainingDeck
              }
              :
              remainingDeck
          },
        }

        if (["deployments", "missionRules", "primaryMissions"].includes(action.section))
          returnState.missionSetup = {
            deployment: action.section === "deployments" ? drawnCard : state.missionSetup.deployment,
            missionRule: action.section === "missionRules" ? drawnCard : state.missionSetup.missionRule,
            primaryMission: action.section === "primaryMissions" ? drawnCard : state.missionSetup.primaryMission,
          }
        if (action?.player)
          returnState[action.player] = {
            secondaryMissionOne: action?.secondaryMissionIndex === 0 ? drawnCard : state[action.player].secondaryMissionOne,
            secondaryMissionTwo: action?.secondaryMissionIndex === 1 ? drawnCard : state[action.player].secondaryMissionOne,
            tertiaryMission: action.section === "gambits" || action.section === "secretMissions" ? drawnCard : state[action.player].tertiaryMission,
          }

        return returnState
      }
      case "insert": {
        console.log(`Inserting card into section '${action.section}'`)
        return state
      }
      default: return state
    }
  }

  function new_shuffle(section: MissionDeckSection, player: CardType | null = null) : void {
    matchDispatch({ type: "shuffle", section, player } as MatchReducerAction)
  }

  function new_draw(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "draw", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  /**
   * Since editing the passed missionDeckCards prop (shuffling/removing cards)
   * will mess with that value in CardViewer, the prop should be treated as readonly.
   * Instead of editing the prop directly, several states will hold the card.cardIndex
   * values, which will then be matched against missionDeckCards to show the actual card JSX.
   * 
   * deck - Holds the indices of the cards that are currently unplayed.
   * discards - Holds the indices of the cards that have been discarded, and are no longer in deck.
   * activeCards - Hold the indices of the cards that are currently in use.
   */
  const [deck, setDeck] = useState({} as MissionDeckCardIndices)
  const [discards, setDiscards] = useState({} as MissionDeckCardIndices)
  const [activeCards, setActiveCards] = useState({} as MissionDeckCardsActive)

  useEffect(() => {
    // Initialize states with empty objects
    let initializedDeck: MissionDeckCardIndices = {
      deployments: missionDeckCards.deployments.map(x => x.cardIndex),
      missionRules: missionDeckCards.missionRules.map(x => x.cardIndex),
      primaryMissions: missionDeckCards.primaryMissions.map(x => x.cardIndex),
      secondaryMissions: {
        attacker: missionDeckCards.secondaryMissions.attacker.map(x => x.cardIndex),
        defender: missionDeckCards.secondaryMissions.defender.map(x => x.cardIndex),
      },
      gambits: {
        attacker: missionDeckCards.gambits?.attacker.map(x => x.cardIndex) ?? [],
        defender: missionDeckCards.gambits?.defender.map(x => x.cardIndex) ?? [],
      },
      secretMissions: {
        attacker: missionDeckCards.secretMissions?.attacker.map(x => x.cardIndex) ?? [],
        defender: missionDeckCards.secretMissions?.defender.map(x => x.cardIndex) ?? [],
      },
    }
    let initializedDiscards: MissionDeckCardIndices = {
      deployments: [],
      missionRules: [],
      primaryMissions: [],
      secondaryMissions: {
        attacker: [],
        defender: [],
      },
      gambits: {
        attacker: [],
        defender: [],
      },
      secretMissions: {
        attacker: [],
        defender: [],
      },
    }
    let initializedActiveCards: MissionDeckCardsActive = {
      deployments: null,
      missionRules: null,
      primaryMissions: null,
      secondaryMissions: {
        attacker: [null, null],
        defender: [null, null],
      },
      gambits: {
        attacker: null,
        defender: null,
      },
      secretMissions: {
        attacker: null,
        defender: null,
      },
    }

    setDeck(initializedDeck)
    setDiscards(initializedDiscards)
    setActiveCards(initializedActiveCards)
  }, [])

  function fisherYatesShuffle(array: Array<number>) : Array<number> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }

  function shuffle(section: MissionDeckSection, cardType: CardType | null = null) : void {
    if (deck && section && deck[section]) {
      if (section === "deployments" || section === "missionRules" || section === "primaryMissions")
        setDeck({
          [section]: fisherYatesShuffle(deck[section]),
          ...deck
        })
      else if (cardType)
        setDeck({
          [section]: {
            [cardType]: fisherYatesShuffle(deck[section][cardType]),
            ...deck[section]
          },
          ...deck
        })
    }
  }

  function draw(section: MissionDeckSection, cardType: CardType | null = null, index: number | null = null) : void {
    if (section === "secondaryMissions" && index === null)
      console.error("When drawing a Secondary Mission, an index 0 or 1 must be provided")

    if (activeCards !== null) {
      let drawnCard: number

      if (section === "deployments" || section === "missionRules" || section === "primaryMissions") {
        // Only bother drawing a card if there isn't already one drawn
        if (activeCards[section] === null && deck[section].length > 0) {
          drawnCard = deck[section].shift() as number
          setActiveCards({
            ...activeCards,
            [section]: drawnCard
          })
          setDeck({
            ...deck,
            [section]: deck[section]
          })
        }
      }
      else if (cardType) {
        let valid: boolean = false
        // Only proceed if there's cards in the deck section
        if (deck[section][cardType].length > 0) {
          if (section === "secondaryMissions" && index !== null)
            if (activeCards[section][cardType][index] === null)
              valid = true
          else if (activeCards[section][cardType] === null)
            valid = true
        }

        // If enough cards exist in the section the user is attempting to draw from, don't do anything
        if (valid) {
          drawnCard = deck[section][cardType].shift() as number
          let newActiveCards: number | Array<number | null> = drawnCard
          if (section === "secondaryMissions" && index !== null) {
            newActiveCards = activeCards[section][cardType].map(
              (item: number | null, i: number) => {
                if (i === index)
                  return drawnCard
                else
                  return item
              }
            )
          }

          setActiveCards({
            ...activeCards,
            [section]: {
              ...activeCards[section],
              [cardType]: newActiveCards,
            },
          })
          setDeck({
            ...deck,
            [section]: {
              ...deck[section],
              [cardType]: deck[section][cardType],
            },
          })
        }
      }
    }
  }

  function discard(section: MissionDeckSection, cardType: CardType | null = null, index: number | null = null) {
    if (section === "secondaryMissions" && index === null)
      console.error("When discarding a Secondary Mission, an index 0 or 1 must be provided")

    if (activeCards !== null) {
      let discardedCard: number

      if (section === "deployments" || section === "missionRules" || section === "primaryMissions") {
        // Only bother discarding a card if there's already one drawn
        if (activeCards[section] != null) {
          let discardedCard: number = activeCards[section]

          setDiscards({
            ...discards,
            [section]: [...discards[section], discardedCard]
          })
          setActiveCards({
            ...activeCards,
            [section]: null
          })
        }
      }
      else if (cardType) {
        let valid: boolean = false
        if (section === "secondaryMissions" && index !== null)
          if (activeCards[section][cardType][index] !== null)
            valid = true
        else if (activeCards[section][cardType] !== null)
          valid = true

        // If a card exists to discard, discard it
        if (valid) {
          let newActiveCards: Array<number | null> | null = null
          if (section === "secondaryMissions" && index !== null) {
            discardedCard = activeCards[section][cardType][index] as number
            newActiveCards = activeCards[section][cardType].map(
              (item: number | null, i: number) => {
                if (i === index)
                  return null
                else
                  return item
              }
            )
          }
          else
            discardedCard = activeCards[section][cardType] as number

          setDiscards({
            ...discards,
            [section]: {
              ...discards[section],
              [cardType]: [...discards[section][cardType], discardedCard]
            }
          })
          setActiveCards({
            ...activeCards,
            [section]: {
              ...activeCards[section],
              [cardType]: newActiveCards
            },
          })
        }
      }
    }
  }

  function recycle(section: MissionDeckSection, cardType: CardType | null = null, index: number | null = null) {
    if (section === "secondaryMissions" && index === null)
      console.error("When shuffling a Secondary Mission back into the deck, an index 0 or 1 must be provided")

    if (activeCards !== null) {
      let recycledCard: number

      if (section === "deployments" || section === "missionRules" || section === "primaryMissions") {
        // Only bother replacing a card if there's already one drawn
        if (activeCards[section] != null) {
          let recycledCard: number = activeCards[section]

          setDeck({
            ...deck,
            [section]: fisherYatesShuffle([...deck[section], recycledCard])
          })
          setActiveCards({
            ...activeCards,
            [section]: null
          })
        }
      }
      else if (cardType) {
        let valid: boolean = false
        if (section === "secondaryMissions" && index !== null)
          if (activeCards[section][cardType][index] !== null)
            valid = true
        else if (activeCards[section][cardType] !== null)
          valid = true

        // If a card exists to be recycled, recycle it
        if (valid) {
          let newActiveCards: Array<number | null> | null = null
          if (section === "secondaryMissions" && index !== null) {
            recycledCard = activeCards[section][cardType][index] as number
            newActiveCards = activeCards[section][cardType].map(
              (item: number | null, i: number) => {
                if (i === index)
                  return null
                else
                  return item
              }
            )
          }
          else
            recycledCard = activeCards[section][cardType] as number

          setDeck({
            ...deck,
            [section]: {
              ...deck[section],
              [cardType]: fisherYatesShuffle([...deck[section][cardType], recycledCard])
            }
          })
          setActiveCards({
            ...activeCards,
            [section]: {
              ...activeCards[section],
              [cardType]: newActiveCards
            },
          })

          // Shuffle the deck again after replacing card.
          // This is easier than placing the card into a random index.
          shuffle(section, cardType)
        }
      }
    }
  }

  if (Object.keys(deck).length > 0)
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Button
          onClick={() => new_shuffle("deployments")}
        >
          Shuffle Deployments
        </Button>
        <Button
          onClick={() => new_draw("deployments", null)}
        >
          Draw Deployment
        </Button>
        <Button
          onClick={() => discard("deployments", null, null)}
        >
          Discard Deployment
        </Button>
        <Button
          onClick={() => recycle("deployments", null, null)}
        >
          Replace Deployment
        </Button>
        <br />
        Drawn Deployment:
        <div>
          {match.missionSetup.deployment !== null ? missionDeckCards.deployments[match.missionSetup.deployment].card : null}
        </div>
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
            {match.deck.deployments.map((i: number) => missionDeckCards.deployments.find((j: CardInfo) => j.cardIndex === i)?.card)}
          </div>
        </ScrollArea>
  
        <br /><br />
  
        <Button
          onClick={() => shuffle("missionRules", null)}
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
          {deck.missionRules.map((i: number) => missionDeckCards.missionRules.find((j: CardInfo) => j.cardIndex === i)?.card)}
          </div>
        </ScrollArea>
  
        <br /><br />
  
        <Button
          onClick={() => shuffle("primaryMissions", null)}
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
            {deck.primaryMissions.map((i: number) => missionDeckCards.primaryMissions.find((j: CardInfo) => j.cardIndex === i)?.card)}
          </div>
        </ScrollArea>
  
        <br /><br />
  
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            onClick={() => new_shuffle("secondaryMissions", "attacker")}
            style={{ marginRight: 10 }}
          >
            Shuffle Attacker Secondary Missions
          </Button>
          <Button
            onClick={() => shuffle("secondaryMissions", "defender")}
          >
            Shuffle Defender Secondary Missions
          </Button>
          <Button
            onClick={() => new_draw("secondaryMissions", "attacker", 0)}
          >
            Draw Attacker Secondary 0
          </Button>
          <Button
            onClick={() => new_draw("secondaryMissions", "attacker", 1)}
          >
            Draw Attacker Secondary 1
          </Button>
          <Button
            onClick={() => discard("secondaryMissions", "attacker", 0)}
          >
            Discard Attacker Secondary Card 0
          </Button>
          <Button
            onClick={() => discard("secondaryMissions", "attacker", 1)}
          >
            Discard Attacker Secondary Card 1
          </Button>
        </div>
        Drawn Attacker Secondary:
        <div className={cardStyles.cardList}>
          {match.attacker.secondaryMissionOne !== null ? missionDeckCards.secondaryMissions.attacker[match.attacker.secondaryMissionOne].card : <div style={{ height: 440, width: 254 }}>No Card</div>}
          {match.attacker.secondaryMissionTwo !== null ? missionDeckCards.secondaryMissions.attacker[match.attacker.secondaryMissionTwo].card : <div style={{ height: 440, width: 254 }}>No Card</div>}
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
            {match.deck.secondaryMissions.attacker.map((i: number) => missionDeckCards.secondaryMissions.attacker.find((j: CardInfo) => j.cardIndex === i)?.card)}
          </div>
          <div className={cardStyles.cardList}>
            {match.deck.secondaryMissions.defender.map((i: number) => missionDeckCards.secondaryMissions.defender.find((j: CardInfo) => j.cardIndex === i)?.card)}
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
          <Button
            onClick={() => draw("gambits", "attacker")}
          >
            Draw Attacker Gambit
          </Button>
        </div>
        <br />
        Drawn Attacker Gambit:
        <div>
          {activeCards.gambits.attacker ? missionDeckCards.deployments[activeCards.gambits.attacker].card : null}
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
            {deck.gambits.attacker.map((i: number) => missionDeckCards?.gambits?.attacker.find((j: CardInfo) => j.cardIndex === i)?.card)}
          </div>
          <div className={cardStyles.cardList}>
            {deck.gambits.defender.map((i: number) => missionDeckCards?.gambits?.defender.find((j: CardInfo) => j.cardIndex === i)?.card)}
          </div>
        </ScrollArea>
      </div>
    )
}