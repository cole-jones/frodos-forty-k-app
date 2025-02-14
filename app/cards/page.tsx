'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Title } from '@mantine/core'
import cardStyles from '@/css/Cards.module.css'

export default function CardsPage() : React.ReactNode {
  function changeBg(src: string) {
    const cardsLayoutContainer = document.getElementById("cards-layout-container")
    const cardsBackground = document.getElementById("cards-background")
    
    if (cardsLayoutContainer && cardsBackground) {
      if (src === 'url(/transparent_1px.png)') {
        cardsLayoutContainer.style.color = 'light-dark(var(--mantine-color-primary-9), var(--mantine-color-primary-1))'
        cardsLayoutContainer.style.textShadow = '2px 2px 4px light-dark(var(--mantine-color-primary-5), var(--mantine-color-primary-2))'
      }
      else {
        cardsLayoutContainer.style.color = 'light-dark(var(--mantine-color-primary-5), var(--mantine-color-primary-0))'
        cardsLayoutContainer.style.textShadow = '2px 2px 4px light-dark(var(--mantine-color-primary-9), var(--mantine-color-primary-3))'
      }

      cardsBackground.style.backgroundImage = src
    }
  }

  return (
    <div id="cards-layout-container" className={cardStyles.cardsLayoutContainer}>
      <div id="cards-background" className={cardStyles.missionDeckSelectorBackground} />
      <Title order={1} size="36pt">
        Select a Mission Deck
      </Title>
      <br />
      <div className={cardStyles.missionDeckSelectorContainer}>
        <Link href="/cards/leviathan">
          <button
            type="button"
            onMouseOver={() => changeBg('url(/Leviathan_Background.png)')}
            onMouseOut={() => changeBg('url(/transparent_1px.png)')}
            className={cardStyles.missionDeckSelector}
          >
            <Image
              src="/cards/leviathan/Leviathan_Box.jpg"
              alt="Leviathan Mission Deck"
              height={600}
              width={412}
              quality={100}
              priority
              className={cardStyles.missionDeckImage}
            />
          </button>
        </Link>
        <div className={cardStyles.missionDeckSelectorSpacer} />
        <Link href="/cards/pariah-nexus" style={{ textDecoration: 'none' }}>
          <button
            type="button"
            disabled
            onMouseOver={() => changeBg('url(/Pariah_Nexus_Background.png)')}
            onMouseOut={() => changeBg('url(/transparent_1px.png)')}
            className={`${cardStyles.missionDeckSelector} ${cardStyles.missionDeckSelectorDisabled}`}
          >
            <div className={cardStyles.missionDeckSelectorDisabledWatermark}>
              UNDER<br />CONSTRUCTION
            </div>
            <Image
              src="/cards/pariah_nexus/Pariah_Nexus_Box.jpg"
              alt="Pariah Nexus Mission Deck"
              height={600}
              width={412}
              quality={100}
              priority
              className={cardStyles.missionDeckImage}
            />
          </button>
        </Link>
      </div>
    </div>
  )
}