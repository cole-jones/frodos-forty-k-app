'use client'

import { useState, useEffect, useCallback } from "react"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import { type CardInfo, type MissionDeckCards } from "@/components/Cards/MissionDeck"
import styles from "@/css/CardViewer.module.css"

// Edit HTMLElementEventMap so knows to expect a custom event on 'card-viewer-modal-button-click'
declare global {
  interface HTMLElementEventMap {
    'card-viewer-modal-button-click': CustomEvent;
  }
}

export default function CardViewer({
  leviathanCards = null,
  pariahNexusCards = null
} : {
  leviathanCards?: MissionDeckCards | null | undefined,
  pariahNexusCards?: MissionDeckCards | null | undefined
}) : React.ReactNode {
  const [opened, { open, close }] = useDisclosure(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(<div />)
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("portrait")

  const openModal = useCallback((event: CustomEvent) => {
    const {
      missionDeckName,
      missionDeckSection,
      cardType,
      cardIndex,
    } : {
      missionDeckName: string,
      missionDeckSection: string,
      cardType: string,
      cardIndex: number,
    } = event.detail

    /* cardIndex is the original index value of the card, which will not change when the
       card sections are shuffled. Using find() allows direct lookup instead of array indexing. */
    let newModalContent = null
    if (missionDeckName === "Leviathan" && leviathanCards) {
      if (cardType === null)
        newModalContent = leviathanCards[missionDeckSection].find((card: CardInfo) => card.cardIndex === cardIndex)
      else
        newModalContent = leviathanCards[missionDeckSection][cardType].find((card: CardInfo) => card.cardIndex === cardIndex)
    }
    else if (missionDeckName === "Pariah Nexus" && pariahNexusCards) {
      if (cardType === null)
        newModalContent = pariahNexusCards[missionDeckSection].find((card: CardInfo) => card.cardIndex === cardIndex)
      else
        newModalContent = pariahNexusCards[missionDeckSection][cardType].find((card: CardInfo) => card.cardIndex === cardIndex)
    }

    setOrientation(missionDeckSection === "layouts" ? "landscape" : "portrait")
    setModalContent(
      <div className={`${styles.cardInModal} ${missionDeckSection === "layouts" ? styles.cardInModalLandscape : ""}`}>
        {newModalContent.card}
      </div>
    )
    open()
  }, [])

  const closeModal = () => {
    close()
    setModalContent(<div />)
  }

  useEffect(() => {
    const buttonElement = document.getElementById("card-viewer-modal-button")
    buttonElement?.addEventListener("card-viewer-modal-button-click", (e) => openModal(e))

    return () => {
      buttonElement?.removeEventListener("card-viewer-modal-button-click", (e: CustomEvent) => openModal(e))
    }
  }, [])

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        title=""
        centered
        withCloseButton={false}
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
        className={orientation === "portrait" ? styles.cardModal : styles.cardModalLandscape}
        removeScrollProps={{ removeScrollBar: true }}
      >
        <div id="modal-content">
          {modalContent}
        </div>
      </Modal>

      <button hidden aria-hidden id="card-viewer-modal-button" type="button">
        Click Me!
      </button>
    </>
  )
}