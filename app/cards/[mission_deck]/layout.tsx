'use server'

import { ScrollArea } from '@mantine/core'
import scrollbarStyles from '@/css/Scrollbars.module.css'

export default async function CardsLayout({ children } : { children: React.ReactNode }) : Promise<React.ReactNode> {
  return (
    <ScrollArea
      type="auto"
      offsetScrollbars="y"
      scrollbars="y"
      h="var(--app-body-height)" // Calculate size, removing height of header and footer
      classNames={scrollbarStyles}
    >
      {children}
    </ScrollArea>
  )
}