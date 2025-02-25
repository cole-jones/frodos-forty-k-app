'use client'

import styles from "@/css/MissionDeckSelector.module.css"

function changeBg(src: string) {
  const missionDeckSelectorContainer = document.getElementById("mission-deck-selector-container")
  const missionDeckSelectorBackground = document.getElementById("mission-deck-selector-background")
  
  if (missionDeckSelectorContainer && missionDeckSelectorBackground) {
    if (src === 'url(/transparent_1px.png)') {
      missionDeckSelectorContainer.style.color = 'light-dark(var(--mantine-color-primary-9), var(--mantine-color-primary-1))'
      missionDeckSelectorContainer.style.textShadow = '2px 2px 4px light-dark(var(--mantine-color-primary-5), var(--mantine-color-primary-2))'
    }
    else {
      missionDeckSelectorContainer.style.color = 'light-dark(var(--mantine-color-primary-5), var(--mantine-color-primary-0))'
      missionDeckSelectorContainer.style.textShadow = '2px 2px 4px light-dark(var(--mantine-color-primary-9), var(--mantine-color-primary-3))'
    }

    missionDeckSelectorBackground.style.backgroundImage = src
  }
}

export function MissionDeckSelectorButton({ missionDeck, children } : { missionDeck: "Leviathan" | "Pariah Nexus", children: React.ReactNode }) {
  return (
    <button
      type="button"
      onMouseOver={() => changeBg(`url(/${missionDeck.replace(' ', '_')}_Background.png)`)}
      onMouseOut={() => changeBg('url(/transparent_1px.png)')}
      className={styles.missionDeckSelectorButton}
    >
      {children}
    </button>
  )
}