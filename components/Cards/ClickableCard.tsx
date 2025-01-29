'use client'

import { MissionDeck, Section, CardVariants } from '@/components/Cards/AllCards'
import cardStyles from '@/css/Cards.module.css'

function simulateMouseClick(
  element: HTMLElement,
  missionDeck: MissionDeck,
  section: Section,
  cardIndex: number,
  variant: CardVariants
) {
  const myEvent = new CustomEvent("card-viewer-modal-button-click", {
    detail: {
      missionDeck,
      section,
      cardIndex,
      variant
    }
  })
  element.dispatchEvent(myEvent)
}

export default function ClickableCard({
  missionDeck,
  section,
  cardIndex,
  variant,
  children
} : {
  missionDeck: MissionDeck,
  section: Section,
  cardIndex: number,
  variant: CardVariants,
  children: React.ReactNode
}) : React.ReactNode {
  const md = missionDeck
  const se = section
  const ci = cardIndex
  const cv = variant

  function handleButtonClick() {
    const cardViewerModalButton: HTMLElement | null = document.getElementById("card-viewer-modal-button")
    if (cardViewerModalButton) {
      simulateMouseClick(cardViewerModalButton, md, se, ci, cv)
    }
  }

  return (
    <button type="button" className={cardStyles.cardButton} onClick={handleButtonClick}>
      {children}
    </button>
  )
}