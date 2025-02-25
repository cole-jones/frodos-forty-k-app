'use client'

import { usePathname } from "next/navigation"
import { Anchor, Breadcrumbs } from '@mantine/core'
import Link from 'next/link'
import { capitalizeEachWord } from "@/utils/utility_functions"
import styles from '@/css/Home.module.css'

export default function AppHeaderBreadcrumbs() : React.ReactNode {
  const pathname = usePathname()

  function getBreadcrumbs() : Array<React.ReactNode> | null {
    if (pathname) {
      /* If the user is on the root page, make a custom single breadcrumb. */
      if (pathname === "/") {
        return [
          <Anchor component={Link} href="#" key={0}>
            Home
          </Anchor>
        ]
      }

      const pathList = pathname.split('/').filter(i => i)
      const hrefList: Array<{ name: string, href: string }> = [{ name: pathList[0], href: `/${pathList[0]}` }]

      /* Build list of paths, using previous page's path to build current page. */
      pathList.reduce((p, c) => {
        hrefList.push({ name: c, href: `/${p}/${c}` })
        return `${p}/${c}`
      })

      /* Return a list of links to each page in the Breadcrumb. */
      return hrefList.map(({ name, href }, index) =>
        <Anchor component={Link} href={href} key={index}>
          {capitalizeEachWord(name, " ")}
        </Anchor>
      )
    }

    return null
  }

  return (
    <Breadcrumbs className={styles.breadcrumbs} separator=">">
      {getBreadcrumbs()}
    </Breadcrumbs>
  )
}