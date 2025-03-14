'use client'

import { useReducer } from "react"
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

interface MatchObject {
  deck: MissionDeckCardIndices,
  //discards: MissionDeckCardIndices, // Don't know if keeping track of discards is strictly necessary...
  missionSetup: MissionSetupCards,
  attacker: PlayerMissions,
  defender: PlayerMissions,
}

interface MissionSetupCards {
  [key: string]: number | null
  deployment: number | null
  missionRule: number | null
  primaryMission: number | null
}

interface PlayerMissions {
  [key: string]: number | null | undefined
  secondaryMissionOne: number | null
  secondaryMissionTwo: number | null
  secondaryMissionThree?: number | null
  tertiaryMission: number | null
}

export interface MatchReducerAction {
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

export function MatchLogic(missionDeckCards: MissionDeckCards) {
  // Reducer to hold decks as arrays of numbers, and deck-related functions.
  // These numbers are to be compared against the missionDeckCards props to display cards.
  const [match, matchDispatch] = useReducer(matchReducer, initializeMatchObject(missionDeckCards))

  function matchReducer(state: MatchObject, action: MatchReducerAction) {
    const isMissionSetup: boolean = ["deployments", "missionRules", "primaryMissions"].includes(action.section) ?? false
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
          console.warn(`No cards remaining in deck '${action.section}'${hasPlayerSection ? ` for player ${action.player}` : ''}, nothing to shuffle`)
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
          console.warn(`No cards remaining in deck '${action.section}'${hasPlayerSection ? ` for player ${action.player}` : ''}, nothing to draw`)
          return state
        }
        drawValidation: // Label so the break below doesn't break out of the switch
        if (isMissionSetup) {
          if (state.missionSetup[action.section.slice(0, -1)] !== null) {
            console.warn(`Unable to draw, card already exists in seciton '${action.section.slice(0, -1)}'`)
            return state
          }
        }
        else if (action?.player) {
          if (action.section === "secondaryMissions" && action?.secondaryMissionIndex === 0 && state[action.player as CardType].secondaryMissionOne !== null)
            console.warn(`${pascalCase(action.player)} has already selected their first Secondary Mission`)
          else if (action.section === "secondaryMissions" && action?.secondaryMissionIndex === 1 && state[action.player as CardType].secondaryMissionTwo !== null)
            console.warn(`${pascalCase(action.player)} has already selected their second Secondary Mission`)
          else if ((action.section === "gambits" || action.section === "secretMissions") && state[action.player as CardType].tertiaryMission !== null)
            console.warn(`${pascalCase(action.player)} has already selected their Tertiary Mission`)
          else
            break drawValidation

          return state
        }

        console.log(`Drawing card from section '${action.section}'${hasPlayerSection ? ` for ${action.player}` : ''}`)

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

        if (isMissionSetup)
          returnState.missionSetup = {
            deployment: action.section === "deployments" ? drawnCard : state.missionSetup.deployment,
            missionRule: action.section === "missionRules" ? drawnCard : state.missionSetup.missionRule,
            primaryMission: action.section === "primaryMissions" ? drawnCard : state.missionSetup.primaryMission,
          } as MissionSetupCards
        else if (action?.player)
          returnState[action.player] = {
            secondaryMissionOne: action?.secondaryMissionIndex === 0 ? drawnCard : state[action.player].secondaryMissionOne,
            secondaryMissionTwo: action?.secondaryMissionIndex === 1 ? drawnCard : state[action.player].secondaryMissionTwo,
            tertiaryMission: action.section === "gambits" || action.section === "secretMissions" ? drawnCard : state[action.player].tertiaryMission,
          } as PlayerMissions

        return returnState
      }
      case "discard": {
        console.log(`Discarding card from section '${action.section}'`)

        let returnState = {...state}

        if (isMissionSetup)
          returnState.missionSetup = {
            deployment: action.section === "deployments" ? null : state.missionSetup.deployment,
            missionRule: action.section === "missionRules" ? null : state.missionSetup.missionRule,
            primaryMission: action.section === "primaryMissions" ? null : state.missionSetup.primaryMission,
          } as MissionSetupCards
        else if (action?.player)
          returnState[action.player] = {
            secondaryMissionOne: action?.secondaryMissionIndex === 0 ? null : state[action.player].secondaryMissionOne,
            secondaryMissionTwo: action?.secondaryMissionIndex === 1 ? null : state[action.player].secondaryMissionTwo,
            tertiaryMission: action.section === "gambits" || action.section === "secretMissions" ? null : state[action.player].tertiaryMission,
          } as PlayerMissions

        return returnState
      }
      case "recycle": {
        console.log(`Recycling card back into section '${action.section}'${hasPlayerSection ? ` for player '${action.player}'` : ''}`)

        let cardToRecycle: number | null = null
        if (isMissionSetup)
          cardToRecycle = state.missionSetup[action.section.slice(0, -1)]
        else if (action?.player)
          if (action.section === "gambits")
            cardToRecycle = state[action.player].tertiaryMission
          else if (action.secondaryMissionIndex === 0)
            cardToRecycle = state[action.player].secondaryMissionOne
          else if (action.secondaryMissionIndex === 1)
            cardToRecycle = state[action.player].secondaryMissionTwo

        if (cardToRecycle === null)
          return state

        let returnState = {
          ...state,
          deck: {
            ...state.deck,
            [action.section]: hasPlayerSection ?
              {
                ...state.deck[action.section],
                [action.player as CardType]: fisherYatesShuffle([...state.deck[action.section as MissionDeckSectionTyped][action.player as CardType], cardToRecycle])
              }
              :
              fisherYatesShuffle([...state.deck[action.section as MissionDeckSectionUntyped], cardToRecycle])
          }
        }

        if (isMissionSetup)
          returnState.missionSetup = {
            deployment: action.section === "deployments" ? null : state.missionSetup.deployment,
            missionRule: action.section === "missionRules" ? null : state.missionSetup.missionRule,
            primaryMission: action.section === "primaryMissions" ? null : state.missionSetup.primaryMission,
          } as MissionSetupCards
        else if (action?.player)
          returnState[action.player] = {
            secondaryMissionOne: action?.secondaryMissionIndex === 0 ? null : state[action.player].secondaryMissionOne,
            secondaryMissionTwo: action?.secondaryMissionIndex === 1 ? null : state[action.player].secondaryMissionTwo,
            tertiaryMission: action.section === "gambits" || action.section === "secretMissions" ? null : state[action.player].tertiaryMission,
          } as PlayerMissions

        return returnState
      }
      default: return state
    }
  }

  function fisherYatesShuffle(array: Array<number>) : Array<number> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }

  return {
    match,
    matchDispatch
  }
}