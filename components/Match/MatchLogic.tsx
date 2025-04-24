'use client'

import { useState, useEffect, useReducer } from "react"
import {
  type CardType,
  type MissionDeckCards,
  type MissionDeckCardIndices,
  type MissionDeckSection,
  type MissionDeckSectionUntyped,
  type MissionDeckSectionTyped,
  CardInfo,
} from "@/components/Cards/MissionDeck"
import { pascalCase } from "@/utils/utility_functions"

interface MatchObject {
  deck: MissionDeckCardIndices,
  //discards: MissionDeckCardIndices, // Don't know if keeping track of discards is strictly necessary...
  missionSetup: MissionSetupCards,
  attacker: PlayerMissions,
  defender: PlayerMissions,
}

export type MissionSetupSections = "deployment" | "missionRule" | "primaryMission" | "layout"

interface MissionSetupCards {
  [key: string]: Array<number> | number | null
  deployment: number | null
  missionRule: number | null
  primaryMission: number | null
  validLayouts: Array<number>
  layout: number | null
}

interface PlayerMissions {
  [key: string]: number | null
  secondaryMissionOne: number | null
  secondaryMissionTwo: number | null
  secondaryMissionThree: number | null
  tertiaryMission: number | null
}

export interface MatchReducerAction {
  type: string
  section: MissionDeckSection
  player?: CardType
  secondaryMissionIndex?: number
  missionSetup?: MissionSetupCards
  cardIndex?: number
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
      layouts: missionDeckCards.layouts.map(x => x.cardIndex),
    } as MissionDeckCardIndices,
    missionSetup: {
      deployment: null,
      missionRule: null,
      primaryMission: null,
      layout: null,
      validLayouts: missionDeckCards.layouts.map(x => x.cardIndex),
    } as MissionSetupCards,
    attacker: {
      secondaryMissionOne: null,
      secondaryMissionTwo: null,
      secondaryMissionThree: null,
      tertiaryMission: null,
    } as PlayerMissions,
    defender: {
      secondaryMissionOne: null,
      secondaryMissionTwo: null,
      secondaryMissionThree: null,
      tertiaryMission: null,
    } as PlayerMissions
  } as MatchObject
}

export function MatchLogic(missionDeckCards: MissionDeckCards) {
  // Reducer to hold decks as arrays of numbers, and deck-related functions.
  // These numbers are to be compared against the missionDeckCards props to display cards.
  const [match, matchDispatch] = useReducer(matchReducer, initializeMatchObject(missionDeckCards))

  const [setupComplete, setSetupComplete] = useState<boolean>(false)

  function finalizeMissionSetup() : void {
    if (!setupComplete) {
      if (
        match.missionSetup.deployment !== null &&
        match.missionSetup.missionRule !== null &&
        match.missionSetup.primaryMission !== null &&
        match.missionSetup.layout !== null &&
        match.missionSetup.validLayouts !== null
      ) {
        setSetupComplete(true)
      }
    }
  }

  /* Shuffle all of the decks to start. */
  useEffect(() => {
    shuffle("deployments")
    shuffle("missionRules")
    shuffle("primaryMissions")
    shuffle("layouts")
    shuffle("secondaryMissions", "attacker")
    shuffle("secondaryMissions", "defender")
    shuffle("gambits", "attacker")
    shuffle("gambits", "defender")
    shuffle("secretMissions", "attacker")
    shuffle("secretMissions", "defender")
  }, [])

  /**
   * Typical Fisher-Yates shuffle algorithm..
   *
   * @remarks
   * Modified such that the index 0 element of the array is never shuffled
   * back into index 0. Will trigger reshuffle if it does not move.
   *
   * @param array - Array of any type.
   *
   * @returns Shuffled array.
   */
  function fisherYatesShuffle(array: Array<any>) : Array<any> {
    // If the array is of length 1, skip, otherwise attempting to shuffle will cause
    // an infinite loop as the new first element will always be equal to the previous.
    if (array.length < 2)
      return array

    // Ensure that what's currently the first item in the list is not still the first after shuffle.
    let firstItem: any = [...array][0]

    do {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    } while (array[0] === firstItem)

    return array
  }

  function missionSetupManualSet(cardTitle: any, section: MissionDeckSection) : void {
    // Get index of selected card in the section
    let cardIndex: number = missionDeckCards[section as MissionDeckSectionUntyped].find(x => x.cardTitle === cardTitle)?.cardIndex ?? 0

    matchDispatch({
      type: "mission_setup_manual_set",
      section: section,
      cardIndex: cardIndex
    })
  }

  function missionSetupManualSetAll(primaryMission: string, missionRule: string, deployment: string, newValidLayouts: Array<string>) : void {
    // Get indices of cards for each section
    let deploymentIndex = missionDeckCards.deployments.find(x => x.cardTitle === deployment)?.cardIndex ?? 0
    let missionRuleIndex = missionDeckCards.missionRules.find(x => x.cardTitle === missionRule)?.cardIndex ?? 0
    let primaryMissionIndex = missionDeckCards.primaryMissions.find(x => x.cardTitle === primaryMission)?.cardIndex ?? 0

    let validLayouts = newValidLayouts.map((layoutName: string) => {
      return missionDeckCards.layouts.find((card: CardInfo) => {
        return `Layout ${card.cardIndex + 1}` === layoutName
      })!.cardIndex
    })

    matchDispatch({
      type: "mission_setup_manual_set_all",
      section: "deployments", // Irrelevant, but I don't want to fix type hinting
      missionSetup: {
        deployment: deploymentIndex,
        missionRule: missionRuleIndex,
        primaryMission: primaryMissionIndex,
        layout: validLayouts.length === 1 ? validLayouts[0] : null,
        validLayouts: validLayouts,
      } as MissionSetupCards
    })
  }

  function tertiaryManualSet(player: CardType, cardIndex: number) : void {
    matchDispatch({ type: "tertiary_manual_set", section: "gambits", player, cardIndex } as MatchReducerAction)
  }

  function shuffle(section: MissionDeckSection, player: CardType | null = null) : void {
    matchDispatch({ type: "shuffle", section, player } as MatchReducerAction)
  }

  function draw(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "draw", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  function discard(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "discard", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  function recycle(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    matchDispatch({ type: "recycle", section, player, secondaryMissionIndex } as MatchReducerAction)
  }

  function recycleAndDraw(section: MissionDeckSection, player: CardType | null = null, secondaryMissionIndex: number | null = null) : void {
    recycle(section, player, secondaryMissionIndex)
    draw(section, player, secondaryMissionIndex)
  }

  function reset() : void {
    matchDispatch({ type: 'reset', section: 'deployments' })
  }

  function matchReducer(state: MatchObject, action: MatchReducerAction) {
    const isMissionSetup: boolean = ["deployments", "missionRules", "primaryMissions", "layouts"].includes(action.section) ?? false
    const hasPlayerSection: boolean = (
      action?.player &&
      ["secondaryMissions", "gambits", "secretMissions"].includes(action.section)
    ) ?? false
    let cardsRemaining: number = 0
    if (action.section === "layouts") {
      cardsRemaining = state.missionSetup?.validLayouts?.length ?? 0
    }
    else {
      cardsRemaining = hasPlayerSection ?
        state.deck[action.section as MissionDeckSectionTyped][action.player as CardType].length
        :
        state.deck[action.section as MissionDeckSectionUntyped].length
    }

    switch (action.type) {
      case "mission_setup_manual_set": {
        return {
          ...state,
          missionSetup: {
            ...state.missionSetup,
            [action.section.slice(0, -1)]: action.cardIndex
          }
        }
      }
      case "mission_setup_manual_set_all": {
        // Manually set Deployment, Mission Rule, Primary Mission
        if (action.missionSetup)
          return {
            ...state,
            missionSetup: action.missionSetup as MissionSetupCards
          }

        return state
      }
      case "tertiary_manual_set": {
        return {
          ...state,
          [action.player as CardType]: {
            ...state[action.player as CardType],
            tertiaryMission: action.cardIndex
          }
        }
      }
      case "shuffle": {
        if (cardsRemaining === 0) {
          console.warn(`No cards remaining in deck '${action.section}'${hasPlayerSection ? ` for player ${action.player}` : ''}, nothing to shuffle`)
          return state
        }

        console.log(`Shuffling deck '${action.section}'`)

        if (action.section === "layouts") {
          return {
            ...state,
            missionSetup: {
              ...state.missionSetup,
              validLayouts: fisherYatesShuffle(state.missionSetup.validLayouts!)
            }
          }
        }
        else {
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
            console.warn(`Unable to draw, card already exists in section '${action.section.slice(0, -1)}'`)
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

        if (action.section === "layouts") {
          [drawnCard, ...remainingDeck] = [...state.missionSetup.validLayouts!]

          return {
            ...state,
            missionSetup: {
              ...state.missionSetup,
              layout: drawnCard,
              validLayouts: remainingDeck
            }
          }
        }

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
            layout: state.missionSetup.layout,
            validLayouts: state.missionSetup.validLayouts
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
            layout: action.section === "layouts" ? null : state.missionSetup.layout,
            validLayouts: state.missionSetup.validLayouts,
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

        let cardToRecycle: number[] | number | null = null
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

        if (action.section === "layouts") {
          return {
            ...state,
            missionSetup: {
              ...state.missionSetup,
              layout: null,
              validLayouts: fisherYatesShuffle([cardToRecycle, ...state.missionSetup.validLayouts!])
            }
          }
        }

        let returnState = {
          ...state,
          deck: {
            ...state.deck,
            [action.section]: hasPlayerSection ?
              {
                ...state.deck[action.section],
                [action.player as CardType]: fisherYatesShuffle([cardToRecycle, ...state.deck[action.section as MissionDeckSectionTyped][action.player as CardType], cardToRecycle])
              }
              :
              fisherYatesShuffle([cardToRecycle, ...state.deck[action.section as MissionDeckSectionUntyped]])
          }
        }

        if (isMissionSetup)
          returnState.missionSetup = {
            deployment: action.section === "deployments" ? null : state.missionSetup.deployment,
            missionRule: action.section === "missionRules" ? null : state.missionSetup.missionRule,
            primaryMission: action.section === "primaryMissions" ? null : state.missionSetup.primaryMission,
            layout: state.missionSetup.layout,
            validLayouts: state.missionSetup.validLayouts,
          } as MissionSetupCards
        else if (action?.player)
          returnState[action.player] = {
            secondaryMissionOne: action?.secondaryMissionIndex === 0 ? null : state[action.player].secondaryMissionOne,
            secondaryMissionTwo: action?.secondaryMissionIndex === 1 ? null : state[action.player].secondaryMissionTwo,
            tertiaryMission: action.section === "gambits" || action.section === "secretMissions" ? null : state[action.player].tertiaryMission,
          } as PlayerMissions

        return returnState
      }
      case 'reset': return initializeMatchObject(missionDeckCards)
      default: return state
    }
  }

  return {
    match,
    matchDispatch,
    setupComplete,
    finalizeMissionSetup,
    tertiaryManualSet,
    missionSetupManualSet,
    missionSetupManualSetAll,
    shuffle,
    discard,
    draw,
    recycle,
    recycleAndDraw,
    reset
  }
}