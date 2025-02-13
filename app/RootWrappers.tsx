'use server'

import { AppShell, AppShellHeader, AppShellMain, MantineProvider } from '@mantine/core'
import { theme } from '@/theme'
import { AppHeader } from '@/components/AppHeader/AppHeader'

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
          {children}
        </AppShellMain>
      </AppShell>
    </MantineProvider>
  )
}

export default RootWrappers
