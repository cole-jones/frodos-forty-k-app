'use server'

import Image from 'next/image'
import Link from 'next/link'
import { Title } from '@mantine/core'
import { MissionDeckSelectorButton } from './MissionDeckSelectorButtons'
import cardStyles from '@/css/Cards.module.css'

export default async function MissionDeckSelector(section: "cards" | "match") : Promise<React.ReactNode> {
  return (
    <div id="mission-deck-selector-container" className={cardStyles.missionDeckSelectorContainer}>
      <div id="mission-deck-selector-background" className={cardStyles.missionDeckSelectorBackground} />
      <Title order={1} size="36pt">
        Select a Mission Deck
      </Title>
      <br />
      <div className={cardStyles.missionDeckSelectorButtonsContainer}>
        <Link href={`/${section}/leviathan`}>
          <MissionDeckSelectorButton missionDeck="Leviathan">
            <Image
              src="/cards/leviathan/Leviathan_Box.jpg"
              alt="Leviathan Mission Deck"
              height={600}
              width={412}
              quality={100}
              className={cardStyles.missionDeckImage}
              placeholder="blur"
              blurDataURL="/transparent_1px.png"
            />
          </MissionDeckSelectorButton>
        </Link>
        <div className={cardStyles.missionDeckSelectorSpacer} />
        <Link href={`/${section}/pariah-nexus`} style={{ textDecoration: 'none' }}>
          <MissionDeckSelectorButton missionDeck="Pariah Nexus">
            <div className={cardStyles.missionDeckSelectorDisabledWatermark}>
              UNDER<br />CONSTRUCTION
            </div>
            <Image
              src="/cards/pariah_nexus/Pariah_Nexus_Box.jpg"
              alt="Pariah Nexus Mission Deck"
              height={600}
              width={412}
              quality={100}
              className={cardStyles.missionDeckImage}
              placeholder="blur"
              blurDataURL="/transparent_1px.png"
            />
          </MissionDeckSelectorButton>
        </Link>
      </div>
    </div>
  )
}