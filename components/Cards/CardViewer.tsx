'use client'

import { useDisclosure } from "@mantine/hooks"
import { Modal } from "@mantine/core"
import cardStyles from "@/css/Cards.module.css"

export default function CardViewer({ children } : { children: React.ReactNode }) : React.ReactNode {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title=""
        centered
        withCloseButton={false}
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
        className={cardStyles.cardModal}
        removeScrollProps={{ removeScrollBar: true }}
      >
        <div className={cardStyles.cardInModal}>
          {children}
        </div>
      </Modal>

      <button className={cardStyles.cardButton} type="button" onClick={open}>
        {children}
      </button>
    </>
  )
}