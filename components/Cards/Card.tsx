'use server'

import { MissionCard } from "@/app/cards/(all_cards)/leviathan/leviathan_cards"
import { CardType } from "@/components/Cards/MissionDeck"
import { pascalCase } from "@/utils/utility_functions"
import cardStyles from "@/css/Cards.module.css"

export default async function Card({ card, variant = null } : { card: MissionCard, variant?: CardType | null }) : Promise<React.ReactNode> {
  /**
   * Render a single MissionCard from the Leviathan deck.
   * 
   * @param card - MissionCard object holding information about the card
   * @param variant - The type of card, either "Attacker" or "Defender" or null
   * 
   * @returns ReactNode representing a single rendered Mission Deck card with all styling
   */

  function getCardClassNames(card: MissionCard) : string {
    /* Build string of class names for card. */
    let classString = cardStyles.card
    /* Get the proper class for the background image, based on the type of card and variant (Attacker or Defender (if applicable)) */
    if (card.type === "Deployment") {
      classString += ` ${cardStyles[`cardFrontDeployment${pascalCase(card.title)}`]}`
    }
    else if (card.type === "Mission Rule" || card.type === "Primary Mission") {
      classString += ` ${cardStyles[`cardFront${card.type.replace(' ', '')}`]}`
    }
    else if (variant) {
      classString += ` ${cardStyles[`cardFront${variant[0].toUpperCase() + variant.slice(1)}${card.type.replace(' ', '')}`]}`
    }
    return classString
  }

  function getCardFlavorClassNames(card: MissionCard) : string {
    /* Build string of class names for card flavor text. */
    let classString = cardStyles.cardFlavor
    if (card.type === "Primary Mission") {
      classString += ` ${cardStyles.cardFlavorSmall}`
    }
    return classString
  }

  function getCardBodyClassNames(card: MissionCard) : string {
    /* Build string of class names for card body. */
    let classString = cardStyles.cardBody
    if (card.type === "Primary Mission") {
      classString += ` ${cardStyles.cardBodyPrimaryMission}`
    }
    if (card.title === "Bring it Down") {
      classString += ` ${cardStyles.cardBodySmallSecondaryMission}`
    }
    if (card.type === "Gambit") {
      classString += ` ${variant === "attacker" ? cardStyles.cardBodyStrongTextAttacker : cardStyles.cardBodyStrongTextDefender}`
    }
    return classString
  }

  const cardKey = `${card.type.replace(' ', '')}_${card.title.replace(' ', '')}${variant === null ? '' : `_${variant}`}`
  const cardClassNames = getCardClassNames(card)
  const cardFlavorClassNames = getCardFlavorClassNames(card)
  const cardBodyClassNames = getCardBodyClassNames(card)

  /* Since Deployment cards have the image as their body, they only need the header. */
  if (card.type === "Deployment") {
    return (
      <div className={cardStyles.cardContainer}>
        <div key={cardKey} className={cardClassNames}>
          <div className={cardStyles.cardHeader}>
            <div className={cardStyles.cardType}>
              {card.type}
            </div>
            <div className={cardStyles.cardTitle}>
              <strong>{card.title}</strong>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* If the card is not Deployment, build the whole thing. */
  return (
    <div className={cardStyles.cardContainer}>
      <div key={cardKey} className={cardClassNames}>
        <div className={cardStyles.cardHeader}>
          <div className={cardStyles.cardType}>
            {card.type}{card.type === "Gambit" || card.type === "Secondary Mission" ? ` – ${variant}` : ""}
          </div>
          <div className={cardStyles.cardTitle}>
            <strong>{card.title}</strong>
          </div>
        </div>
        <div className={cardStyles.cardFlavorBodyContainer}>
          <div className={cardFlavorClassNames}>
            {card.flavorText}
          </div>
          <div className={cardStyles.cardFlavorDottedLine}>
            {".".repeat(57)}
          </div>
          <div className={cardBodyClassNames}>
            {card.bodyText}
          </div>
        </div>
      </div>

      {/* If the card is a fixed mission (Secondary Missions only) then add the Fixed Mission icon. */}
      {card.isFixed ?
        <div className={cardStyles.cardFixedIcon}>
          <img
            alt="fixed_mission"
            src="/cards/Fixed_Mission_Icon.svg"
          />
        </div>
        :
        null
      }
    </div>
  )
}