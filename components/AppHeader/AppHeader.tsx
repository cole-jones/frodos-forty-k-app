'use server'

import Link from 'next/link';
import AppHeaderBreadcrumbs from './Breadcrumbs';
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
      <ColorSchemeToggle />
    </div>
  )
}