'use client'

import {
  type MissionDeckName,
  type MissionDeckSection,
  type CardType
} from '@/components/Cards/MissionDeck'
import styles from '@/css/CardViewer.module.css'

function simulateMouseClick(
  element: HTMLElement,
  missionDeckName: MissionDeckName,
  missionDeckSection: MissionDeckSection,
  cardType: CardType | null,
  cardIndex: number
) {
  const myEvent = new CustomEvent("card-viewer-modal-button-click", {
    detail: {
      missionDeckName,
      missionDeckSection,
      cardType,
      cardIndex,
    }
  })
  element.dispatchEvent(myEvent)
}

export default function ClickableCard({
  missionDeckName,
  missionDeckSection,
  cardIndex,
  cardType = null,
  children
} : {
  missionDeckName: MissionDeckName,
  missionDeckSection: MissionDeckSection,
  cardIndex: number,
  cardType: CardType | null,
  children: React.ReactNode
}) : React.ReactNode {
  /* Simulate a mouse click on the invisible CardViewer button by executing a custom event. */
  function handleButtonClick() {
    const cardViewerModalButton: HTMLElement | null = document.getElementById("card-viewer-modal-button")
    if (cardViewerModalButton) {
      simulateMouseClick(
        cardViewerModalButton,
        missionDeckName,
        missionDeckSection,
        cardType,
        cardIndex
      )
    }
  }

  return (
    <button type="button" className={styles.cardButton} onClick={handleButtonClick}>
      {children}
    </button>
  )
}