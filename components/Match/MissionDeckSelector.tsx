'use server'

import Image from 'next/image'
import Link from 'next/link'
import { Title } from '@mantine/core'
import { MissionDeckSelectorButton } from '@/components/Match/MissionDeckSelectorButtons'
import styles from '@/css/MissionDeckSelector.module.css'

export default async function MissionDeckSelector(section: "cards" | "match") : Promise<React.ReactNode> {
  return (
    <div id="mission-deck-selector-container" className={styles.missionDeckSelectorContainer}>
      <div id="mission-deck-selector-background" className={styles.missionDeckSelectorBackground} />
      <Title order={1} size="36pt">
        Select a Mission Deck
      </Title>
      <br />
      <div className={styles.missionDeckSelectorButtonsContainer}>
        <Link href={`/${section}/leviathan`}>
          <MissionDeckSelectorButton missionDeck="Leviathan">
            <Image
              src="/cards/leviathan/Leviathan_Box.jpg"
              alt="Leviathan Mission Deck"
              height={600}
              width={412}
              quality={100}
              className={styles.missionDeckImage}
              placeholder="blur"
              blurDataURL="/transparent_1px.png"
            />
          </MissionDeckSelectorButton>
        </Link>
        <div className={styles.missionDeckSelectorSpacer} />
        <Link href={`/${section}/pariah-nexus`} style={{ textDecoration: 'none' }}>
          <MissionDeckSelectorButton missionDeck="Pariah Nexus">
            <Image
              src="/cards/pariah_nexus/Pariah_Nexus_Box.jpg"
              alt="Pariah Nexus Mission Deck"
              height={600}
              width={412}
              quality={100}
              className={styles.missionDeckImage}
              placeholder="blur"
              blurDataURL="/transparent_1px.png"
            />
          </MissionDeckSelectorButton>
        </Link>
      </div>
    </div>
  )
}