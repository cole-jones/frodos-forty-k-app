'use server'

import Link from 'next/link';
import { Anchor } from '@mantine/core';
import AppHeaderBreadcrumbs from '@/components/AppHeader/Breadcrumbs';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import homeStyles from '@/css/Home.module.css'

export async function AppHeader() : Promise<JSX.Element> {
  return (
    <div className={homeStyles.headerContainer}>
      <div className={homeStyles.headerContainerFlex}>
        <Link href="/">
          <div className={homeStyles.headerTitle}>
            <img alt="Frodo in the flesh" height={40} width={40} src="/favicon.ico" />
            Frodo's Forty-K
          </div>
        </Link>
        <div className={homeStyles.verticalSplit} />
        <AppHeaderBreadcrumbs />
      </div>
      <div className={homeStyles.navLinks}>
        <Anchor component={Link} href="/match" key={0}>
          Match
        </Anchor>
        <Anchor component={Link} href="/cards" key={1}>
          Cards
        </Anchor>
      </div>
      <ColorSchemeToggle />
    </div>
  )
}