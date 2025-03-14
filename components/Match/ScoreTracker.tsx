'use client'

import { useState } from "react"
import { Button, Textarea } from "@mantine/core"
import { Separator } from "@/components/Cards/MissionDeckComponents"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import styles from "@/css/Match.module.css"

interface RoundScore {
  primary: number
  secondary: number
}
type GameScore = [RoundScore, RoundScore, RoundScore, RoundScore, RoundScore]
function initializeGameScore() : GameScore {
  return [
    { primary: 0, secondary: 0 },
    { primary: 0, secondary: 0 },
    { primary: 0, secondary: 0 },
    { primary: 0, secondary: 0 },
    { primary: 0, secondary: 0 },
  ]
}

export default function ScoreTracker({
  player
} : {
  player: "Attacker" | "Defender"
}) : React.ReactNode {
  const [commandPoints, setCommandPoints] = useState<number>(0)
  const [gameScore, setGameScore] = useState<GameScore>(initializeGameScore)

  function decrementCommandPoints(event: React.MouseEvent<HTMLButtonElement>) : void {
    let subAmt: number = event.shiftKey ? 5 : 1
    if (commandPoints - subAmt < 0)
      setCommandPoints(0)
    else if (commandPoints > 0)
      setCommandPoints(commandPoints - subAmt)
  }

  function incrementCommandPoints(event: React.MouseEvent<HTMLButtonElement>) : void {
    let addAmt: number = event.shiftKey ? 5 : 1
    if (commandPoints + addAmt > 9)
      setCommandPoints(9)
    else if (commandPoints < 9)
      setCommandPoints(commandPoints + addAmt)
  }

  function decrementScore(event: React.MouseEvent<HTMLButtonElement>, round: number, section: "primary" | "secondary") : void {
    let gs = [...gameScore] as GameScore
    let subAmt: number = event.shiftKey ? 5 : 1
    if (gs[round][section] - subAmt < 0)
      gs[round][section] = 0
    else if (gs[round][section] > 0)
      gs[round][section] -= subAmt
    
    setGameScore(gs)
  }

  function incrementScore(event: React.MouseEvent<HTMLButtonElement>, round: number, section: "primary" | "secondary") {
    let gs = [...gameScore] as GameScore
    let addAmt: number = event.shiftKey ? 5 : 1
    if (gs[round][section] + addAmt > 99)
      gs[round][section] = 99
    else if (gs[round][section] < 99)
      gs[round][section] += addAmt
    
    setGameScore(gs)
  }

  function Score({
    value,
    command = false
  } : {
    value: number,
    command?: boolean
  }) : React.ReactNode {
    const [firstDigit, secondDigit]: string[] = (
      value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }).split("")
    )

    return (
      <div className={`${styles.scoreTrackerScoreContainer} ${command ? styles.scoreTrackerScoreContainerCommand : ""}`}>
        {command ?
          null
          :
          <>
            <div className={`${styles.scoreTrackerDigit} ${command ? styles.scoreTrackerDigitCommand : ""}`}>
              {firstDigit}
            </div>
            <div className={styles.scoreTrackerScoreSpacer} />
          </>
        }
        <div className={`${styles.scoreTrackerDigit} ${command ? styles.scoreTrackerDigitCommand : ""}`}>
          {secondDigit}
        </div>
      </div>
    )
  }

  function ScoreButtons({
    group,
    round = -1
  } : {
    group: "command" | "primary" | "secondary"
    round?: number,
  }) : React.ReactNode {
    const cmd: boolean = group === "command"

    return (
      <div className={cmd ? styles.scoreTrackerButtonsContainerCommand : styles.scoreTrackerButtonsContainer}>
        <Button
          className={cmd ? styles.scoreTrackerButtonCommand : styles.scoreTrackerButton}
          onClick={(e) => {
            if (cmd)
              decrementCommandPoints(e)
            else if (round > -1)
              decrementScore(e, round, group as "primary" | "secondary")
          }}
        >
          <IconMinus size={cmd ? 24 : 18} />
        </Button>
        <Score
          command={cmd}
          value={cmd ? commandPoints : gameScore[round][group as "primary" | "secondary"]}
        />
        <Button
          className={cmd ? styles.scoreTrackerButtonCommand : styles.scoreTrackerButton}
          onClick={(e) => {
            if (cmd)
              incrementCommandPoints(e)
            else if (round > -1)
              incrementScore(e, round, group as "primary" | "secondary")
          }}
        >
          <IconPlus size={cmd ? 24 : 18} />
        </Button>
      </div>
    )
  }
 
  function ScoreButtonGroup({ round } : { round: number }) : React.ReactNode {
    return (
      <div className={styles.scoreTrackerButtonGroupContainer}>
        <span>Battle Round {round + 1}</span>

        <div className={styles.scoreTrackerButtonGroup}>
          <ScoreButtons
            group="primary"
            round={round}
          />
          <ScoreButtons
            group="secondary"
            round={round}
          />
        </div>
        <Separator leviathan short />
      </div>
    )
  }

  return (
    <div className={`${styles.scoreTrackerContainer} ${player === "Attacker" ? styles.scoreTrackerContainerAttacker : styles.scoreTrackerContainerDefender}`}>
      <div className={`${styles.scoreTrackerPlayer} ${player === "Attacker" ? styles.scoreTrackerPlayerAttacker : styles.scoreTrackerPlayerDefender}`}>
        {player}
      </div>
      <br />
      <div className={styles.scoreTrackerCommandPointsGroup}>
        <div className={styles.scoreTrackerCommandPoints}>
          Command Points
        </div>
        <ScoreButtons group="command" />
      </div>
      <br />
      <ScoreButtonGroup round={0} />
      <ScoreButtonGroup round={1} />
      <ScoreButtonGroup round={2} />
      <ScoreButtonGroup round={3} />
      <ScoreButtonGroup round={4} />
      <br />
      <div className={styles.scoreTrackerTotalsContainer}>
        <div className={styles.scoreTrackerSumGroup}>
          <Score
            value={gameScore.reduce((sum: number, item: RoundScore) => sum + item.primary, 0)}
          />
          <span>Primary</span>
        </div>

        <div className={styles.scoreTrackerSumGroup}>
          <Score
            value={gameScore.reduce((sum: number, item: RoundScore) => sum + item.secondary, 0)}
          />
          <span>Secondary</span>
        </div>
      </div>
      <div className={styles.scoreTrackerTotal}>
        <Score
          value={gameScore.reduce((sum: number, item: RoundScore) => sum + item.primary + item.secondary, 0)}
        />
        <span>Total</span>
      </div>

      <span>Notes</span>
      <div className={styles.scoreTrackerTextareaContainer}>
        <Textarea
          placeholder="..."
          variant="filled"
          radius="sm"
          classNames={{
            root: styles.scoreTrackerTextareaWrapper,
            wrapper: styles.scoreTrackerTextareaWrapper,
            input: styles.scoreTrackerTextareaInput,
          }}
        />
      </div>
    </div>
  )
}