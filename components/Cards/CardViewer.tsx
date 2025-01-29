'use client'

import { useState, useEffect, useCallback } from "react"
import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import cardStyles from "@/css/Cards.module.css"
import { MissionDeckCards } from "@/components/Cards/AllCards"

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
  const [modalContent, setModalContent] = useState(<div />)

  const openModal = useCallback((event: CustomEvent) => {
    const {
      missionDeck,
      section,
      cardIndex,
      variant
    } : {
      missionDeck: string,
      section: string,
      cardIndex: number,
      variant: string
    } = event.detail

    let newModalContent = null
    if (missionDeck === "Leviathan" && leviathanCards) {
      newModalContent = leviathanCards[section][variant][cardIndex]
    }
    else if (missionDeck === "Pariah Nexus" && pariahNexusCards) {
      newModalContent = pariahNexusCards[section][variant][cardIndex]
    }

    setModalContent(
      <div className={cardStyles.cardInModal}>
        {newModalContent}
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
        className={cardStyles.cardModal}
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