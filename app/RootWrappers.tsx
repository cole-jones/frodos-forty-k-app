'use server'

import { AppShell, AppShellHeader, AppShellMain, MantineProvider, ScrollArea } from '@mantine/core'
import { theme } from '@/theme'
import { AppHeader } from '@/components/AppHeader/AppHeader'
import scrollbarStyles from '@/css/Scrollbars.module.css'

function RootWrappers({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 50 }}
        padding={6}
      >
        <AppShellHeader withBorder={false}>
          <AppHeader />
        </AppShellHeader>
        <AppShellMain>
          <ScrollArea
            type="auto"
            offsetScrollbars
            scrollbars="y"
            h="var(--mantine-scrollarea-height)" // Calculate size, removing height of header and footer
            classNames={scrollbarStyles}
          >
            {children}
          </ScrollArea>
        </AppShellMain>
      </AppShell>
    </MantineProvider>
  )
}

export default RootWrappers
