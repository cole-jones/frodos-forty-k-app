import { capitalizeEachWord, pascalCase, newlineToBreak } from '@/utils/utility_functions'
import { type MissionDeckName, type CardType, type MissionDeckSection } from '@/components/Cards/MissionDeck'
import styles from '@/css/Cards.module.css'

/**
 * Render the container of the card, containing root styling.
 *
 * @param missionDeckName - The name of the mission deck, either "Leviathan" or "Pariah Nexus".
 * @param cardTitle - The title of the card, used to pick deployment class.
 * @param cardSection - The section of the card.
 * @param cardIsFixed - Whether the card is considered fixed or not.
 * @param cardType - The type of card, "attacker" or "defender", or null.
 * @param children - This child components provided.
 *
 * @returns ReactNode representing the main container of the card, with root styling.
 */
export function CardContainer({
  missionDeckName,
  cardTitle,
  cardSection,
  cardIsFixed,
  cardType = null,
  children
} : {
  missionDeckName: MissionDeckName,
  cardTitle: string,
  cardSection: MissionDeckSection
  cardIsFixed: boolean,
  cardType: CardType | null,
  children: React.ReactNode
}) : React.ReactNode {
  /* Build string of class names for card. */
  let classNameString = styles.card

  /* Get the proper class for the background image, based on the type of card and variant (Attacker or Defender (if applicable)) */
  if (cardSection === "deployments")
    classNameString += ` ${styles[`card${missionDeckName.replace(' ', '')}Deployment${pascalCase(cardTitle)}`]}`
  else if (cardSection === "missionRules" || cardSection === "primaryMissions")
    classNameString += ` ${styles[`card${missionDeckName.replace(' ', '')}${pascalCase(cardSection.slice(0, -1))}Front`]}`
  else if (cardType)
    classNameString += ` ${styles[`card${missionDeckName.replace(' ', '')}${pascalCase(cardSection.slice(0, -1))}Front${pascalCase(cardType)}`]}`

  return (
    <div className={styles.cardContainer}>
      <div
        key={`${cardSection.replace(' ', '')}_${cardTitle.replace(' ', '')}${cardType === null ? '' : `_${cardType}`}`}
        className={classNameString}
      >
        {children}
      </div>

      {/* If the card is a fixed mission (Secondary Missions only) then add the Fixed Mission icon. */}
      {cardIsFixed ?
        <div className={styles.cardFixedIcon}>
          <img
            alt="fixed_mission"
            src="/cards/Fixed_Mission_Icon.svg"
          />
        </div>
        :
        null
      }
    </div>
  )
}

/**
 * Render the header of the card, containing the section (possibly type) and title.
 *
 * @param cardTitle - The title of the card, used to pick deployment class.
 * @param cardSection - The section of the card.
 * @param cardType - The type of card, "attacker" or "defender", or null.
 *
 * @returns ReactNode representing the header of the card with the title.
 */
export function CardHeader({
  cardTitle,
  cardSection,
  cardType = null,
} : {
  cardTitle: string,
  cardSection: MissionDeckSection
  cardType: CardType | null,
}) : React.ReactNode {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.cardSection}>
        {capitalizeEachWord(cardSection.slice(0, -1), " ")}{["gambits", "secondaryMissions", "secretMissions"].includes(cardSection) ? ` – ${cardType}` : ""}
      </div>
      <div className={styles.cardTitle}>
        <strong>{cardTitle}</strong>
      </div>
    </div>
  )
}

/**
 * Render the container of the card, containing root styling.
 *
 * @param pariahNexus - If true, extra styling is added for Pariah Nexus
 * @param cardSection - The section of the card.
 * @param cardFlavor - The flavor text for the card, as a string.
 *
 * @returns ReactNode representing the flavor text and body of the card.
 */
export function CardFlavor({
  pariahNexus = false,
  cardSection,
  cardFlavor,
} : {
  pariahNexus: boolean
  cardSection: MissionDeckSection
  cardFlavor: string,
}) : React.ReactNode {
/* Build string of class names for card flavor text. */
  let cardFlavorClassString: string = styles.cardFlavor

  /* All Pariah Nexus cards use small font like Leviathan primary missions. */
  if (pariahNexus)
    cardFlavorClassString += ` ${styles.cardFlavorExtraSmall}`
  else if (cardSection === "primaryMissions")
    cardFlavorClassString += ` ${styles.cardFlavorSmall}`

  return (
    <div className={styles.cardFlavorContainer}>
      <div className={cardFlavorClassString}>
        {cardFlavor}
      </div>
    </div>
  )
}

/**
 * Render the container of the card, containing root styling.
 *
 * @param cardSection - The section of the card.
 * @param cardBody - The body of the card, as a ReactNode.
 * @param cardType - The type of card, "attacker" or "defender", or null.
 *
 * @returns ReactNode representing the body of the card.
 */
export function CardBody({
  cardSection,
  cardBody,
  cardType = null,
} : {
  cardSection: MissionDeckSection
  cardBody: React.ReactNode,
  cardType: CardType | null,
}) : React.ReactNode {
  /* Build string of class names for card body. */
  let cardBodyClassString = styles.cardBody

  /* ColorPlaceholder classes exist to apply colors to elements with specific IDs. */
  if (cardSection === "primaryMissions")
    cardBodyClassString += ` ${styles.colorPlaceholderPrimary}`
  if (cardType === "attacker")
    cardBodyClassString += ` ${styles.colorPlaceholderAttacker}`
  else if (cardType === "defender")
    cardBodyClassString += ` ${styles.colorPlaceholderDefender}`

  return (
    <div className={styles.cardBodyContainer}>
      <div className={cardBodyClassString}>
        {cardBody}
      </div>
    </div>
  )
}

/**
 * Render a keyword, a custom formatted <span>.
 *
 * @param word - The word to make into a keyword.
 * @param noLeft - If true, exclude the space on the left.
 * @param noRight - If true, exclude the space on the right.
 *
 * @returns ReactNode representing a string in keyword format.
 */
export function Keyword({
  word,
  noLeft = false,
  noRight = false,
} : {
  word: string,
  noLeft?: boolean,
  noRight?: boolean,
}) : React.ReactNode {
  return (
    <>
      {noLeft ? "" : " "}
      <span className={styles.cardKeyword}>
        {word}
      </span>
      {noRight ? "" : " "}
    </>
  )
}

/**
 * Render custom formatted bold text.
 *
 * @param text - The text to be styled.
 * @param bold - If true, apply additional bold styling.
 * @param typed - If true, apply coloring based on card type.
 * @param uppercase - If true, apply 'text-transform: uppercase' to the text.
 *
 * @returns ReactNode representing a string with custom bold formatting.
 */
export function Strong({
  text,
  bold,
  typed,
  uppercase,
} : {
  text: string,
  bold?: boolean,
  typed?: boolean,
  uppercase?: boolean,
}) : React.ReactNode {
  let classNameString: string = styles.cardBodyStrongText
  let id: string = "card-body-strong"

  if (uppercase)
    classNameString += ` ${styles.cardBodyStrongTextUppercase}`
  if (bold)
    classNameString += ` ${styles.cardBodyStrongTextBold}`

  // Since this component has no way of knowing if the card is primary/attacker/defender,
  // rely on the parent component containing one of the following classes:
  // '.cardBodyStrongTextAttacker' or '.cardBodyStrongTextDefender'.
  // CSS selectors will then look for elements with id "card-body-strong-needs-color"
  // and attach the Attacker or Defender color.
  if (typed)
    id = "card-body-strong-needs-color"

  return (
    <strong id={id} className={classNameString}>
      {text}
    </strong>
  )
}

/**
 * Render a dotted line, used as a separator between flavor text, body, and paragraphs.
 *
 * @param leviathan - If true, use Leviathan deck styling. Default false.
 * @param pariahNexus - If true, use Pariah Nexus deck styling. Default false.
 * @param squished - If true, reduce the spacing above/below the line. Default false.
 *
 * @returns ReactNode representing a dotted line.
 */
export function Separator({
  leviathan = false,
  pariahNexus = false,
  squished = false,
} : {
  leviathan?: boolean,
  pariahNexus?: boolean,
  squished?: boolean
}) : React.ReactNode {
  let classNameString: string = ""
  let bodyText: string = ""

  if (leviathan) {
    classNameString = styles.cardFlavorDottedLineLeviathan
    bodyText = ".".repeat(57)
  }
  else if (pariahNexus) {
    classNameString = styles.cardFlavorDottedLinePariahNexus
    bodyText = ".".repeat(114)
  }

  if (squished)
    classNameString += ` ${styles.cardFlavorDottedLineSquished}`

  return (
    <div className={classNameString}>
      {bodyText}
    </div>
  )
}

/**
 * Render a paragraph with specific styling.
 *
 * @param small - If true, use 'font-size: var(--card-body-font-size-small)' on the paragraph.
 * @param extraSmall - If true, use 'font-size: var(--card-body-font-size-extra-small); line-height: var(--card-line-height-tall)' on the paragraph.
 * @param tight - If true, add 6px of padding to the left of the paragraph, 0px on the right.
 * @param squished - If true, use smaller top/bottom margins.
 * @param extraSquished - If true, use much smaller top/bottom margins.
 * @param noWrap - If true, set 'text-wrap: nowrap; overflow: visible' on the paragraph.
 * @param children - ReactNode to apply as body text.
 *
 * @returns ReactNode representing a stylized div element for paragraphs.
 */
export function Paragraph({
  small = false,
  extraSmall = false,
  tight = false,
  squished = false,
  extraSquished = false,
  noWrap = false,
  children,
} : {
  small?: boolean,
  extraSmall?: boolean,
  tight?: boolean,
  squished?: boolean,
  extraSquished?: boolean,
  noWrap?: boolean,
  children: React.ReactNode,
}) : React.ReactNode {
  let classNameString: string = styles.cardBodyParagraph

  if (small)
    classNameString += ` ${styles.cardBodyParagraphSmall}`
  if (extraSmall)
    classNameString += ` ${styles.cardBodyParagraphExtraSmall}`
  if (tight)
    classNameString += ` ${styles.cardBodyParagraphTight}`
  if (squished)
    classNameString += ` ${styles.cardBodyParagraphSquished}`
  if (extraSquished)
    classNameString += ` ${styles.cardBodyParagraphExtraSquished}`
  if (noWrap)
    classNameString += ` ${styles.cardBodyParagraphNoWrap}`

  return (
    <div style={{ flex: 1 }} className={classNameString}>
      {children}
    </div>
  )
}

/**
 * Render a paragraph on a secondary mission card with victory points.
 *
 * @param points - The number of points the section is worth.
 * @param maxPoints - The maximum number of point obtainable from the mission.
 * @param minHeight - The minimum height (in px) of the paragraph.
 * @param type - Different point label for fixed or tactical missions.
 * @param plus - If true, add a plus box to the paragraph and + to the point value.
 * @param noWrap - If true, set 'text-wrap: nowrap; overflow: visible' on the paragraph.
 * @param children - The child node to display in the paragraph.
 *
 * @returns ReactNode representing a row for totaling victory points on a secondary mission.
 */
export function PointsParagraph({
  points,
  maxPoints,
  minHeight = 0,
  type = "",
  plus = false,
  noWrap = false,
  children,
} : {
  points: number,
  maxPoints?: number,
  minHeight?: number,
  type?: "fixed" | "tactical" | ""
  plus?: boolean,
  noWrap?: boolean,
  children: React.ReactNode,
}) : React.ReactNode {
  return (
    <div className={styles.headerFlexbox}>
      {plus ?
        <div className={styles.cardBodyPointsParagraphPlus}>
          <div id="points-plus">
            +
          </div>
        </div>
        :
        null
      }
      <Paragraph extraSmall tight={!plus} extraSquished noWrap={noWrap}>
        {children}
      </Paragraph>
      {/* Spacer div to limit paragraph size, give a place for
        * the next paragraph (which is 'position: absolute') to sit. */}
      <div style={{ width: '27.5%', minHeight: minHeight }} />
      <div className={styles.cardBodyPointsParagraph}>
        <Strong bold uppercase text={type} />
        <Strong bold uppercase text={`${plus ? "+" : ""}${points}VP`} />
        <Strong bold uppercase text={maxPoints ? `(UP TO ${maxPoints}VP)` : ""} />
      </div>
    </div>
  )
}

/**
 * Render a section header for a primary mission card.
 *
 * @param text - The text for the header.
 * @param or - Flag to return an OR header, which does not use text.
 * @param lessTopMargin - If true, use less top margin.
 * @param victoryPoints - If true, render a header for displaying victory points.
 * @param leviathan - If true, use Leviathan deck styling. Default false.
 * @param pariahNexus - If true, use Pariah Nexus deck styling. Default false.
 *
 * @returns ReactNode representing a stylized div for a primary mission card header.
 */
export function Header({
  text = "",
  or = false,
  lessTopMargin = false,
  victoryPoints = false,
  leviathan = false,
  pariahNexus = false
} : {
  text?: string,
  or?: boolean,
  lessTopMargin?: boolean,
  victoryPoints?: boolean,
  leviathan?: boolean,
  pariahNexus?: boolean
}) : React.ReactNode {
  let classNameString: string = ""

  if (or) {
    if (lessTopMargin)
      classNameString = styles.headerOrLessTopMargin

    classNameString += ` ${styles.headerOr}`
    return (
      <div id="or-header" className={classNameString} />
    )
  }

  if (leviathan)
    classNameString = styles.headerLeviathan
  else if (pariahNexus)
    classNameString = styles.headerPariahNexus

  return (
    <div className={`${styles.headerFlexbox} ${lessTopMargin ? styles.headerLessTopMargin : null}`}>
      <div id="header" className={classNameString} style={{ flexGrow: 1 }}>
        {text}
      </div>
      {victoryPoints ?
        <>
          <div style={{ width: '1%'}} />
          <div id="header-victory-points" className={`${classNameString} ${styles.headerVictoryPoints}`}>
            Victory Points
          </div>
          <div id="header-victory-points-background" className={styles.headerVictoryPointsBackground} />
        </>
        :
        null
      }
    </div>
  )
}

/**
 * Render an action for a primary mission card.
 *
 * @param text - The text for the action.
 * @param starts - Text to appear next to "Starts:" header.
 * @param units - Text to appear next to "Units:" header.
 * @param completes - Text to appear next to "Completes:" header.
 * @param ifCompleted - Text to appear next to "If Completed:" header.
 * @param lessTopMargin - If true, add -10px top margin to the first div.
 *
 * @returns ReactNode representing a stylized div for a primary mission card action.
 */
export function Action({
  text,
  starts,
  units,
  completes,
  ifCompleted,
  lessTopMargin = false,
} : {
  text: string,
  starts: React.ReactNode,
  units: React.ReactNode,
  completes: React.ReactNode,
  ifCompleted: React.ReactNode,
  lessTopMargin?: boolean,
}) : React.ReactNode {
  let actionClassNames: string = styles.action;

  if (lessTopMargin)
    actionClassNames += ` ${styles.headerLessTopMargin}`

  return (
    <>
      <div className={actionClassNames}>
        <div id="action-header" className={`${styles.actionHeader} ${styles.headerPariahNexus}`}>
          {text} (action)
        </div>
        <div id="action-spacer" className={styles.actionSpacer} />
        <div id="action-icon" className={styles.actionIcon}>
          {/* Using this SVG inline so that color styles can be applied to path. */}
          <svg
            version="1.1"
            id="svg1"
            width="41.276211"
            height="64.471252"
            viewBox="0 0 41.276211 64.471252"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="defs1" />
            <g
              id="g1"
              transform="translate(-9.8624577,-6.7119504)"
            >
              <path
                d="M 9.8624577,46.709696 C 36.710259,6.7119504 36.710259,6.7119504 36.710259,6.7119504 L 34.838219,36.025366 H 51.13867 l -25.888952,35.157836 1.96336,-24.473506 z"
                id="action-bolt-path"
              />
            </g>
          </svg>
        </div>
      </div>

      <Paragraph extraSmall tight extraSquished>
        <Strong typed uppercase text="Starts: " />
        {starts}
      </Paragraph>
      <Paragraph extraSmall tight extraSquished>
        <Strong typed uppercase text="Units: " />
        {units}
      </Paragraph>
      <Paragraph extraSmall tight extraSquished>
        <Strong typed uppercase text="Completes: " />
        {completes}
      </Paragraph>
      <Paragraph extraSmall tight extraSquished>
        <Strong typed uppercase text="If Completed: " />
        {ifCompleted}
      </Paragraph>
      <Separator pariahNexus />
    </>
  )
}

/**
 * Render a stylized unordered list.
 *
 * @param items - Array of JSX elements used to create bullets.
 * @param tight - If true, add 6px of padding to the left of the paragraph, 0px on the right.
 * @param small - If true, use 'font-size: var(--card-body-font-size-small)' on the paragraph.
 * @param extraSmall - If true, use 'font-size: var(--card-body-font-size-extra-small); line-height: var(--card-line-height-tall)' on the paragraph.
 * @param extraTopMargin - If true, add a bit more margin to the top of the list..
 *
 * @returns ReactNode representing a stylized unordered list.
 */
export function List({
  items,
  tight = false,
  small = false,
  extraSmall = false,
  extraTopMargin = false,
} : {
  items: Array<React.ReactNode>,
  tight?: boolean,
  small?: boolean,
  extraSmall?: boolean,
  extraTopMargin?: boolean,
}) : React.ReactNode {
  let classNameString: string = styles.missionCardList
  
  if (tight)
    classNameString += ` ${styles.missionCardListTight}`
  if (small)
    classNameString += ` ${styles.cardBodyParagraphSmall}`
  if (extraSmall)
    classNameString += ` ${styles.cardBodyParagraphExtraSmall}`
  if (extraTopMargin)
    classNameString += ` ${styles.missionCardListTopMargin}`

  return (
    <ul className={classNameString}>
      {items.map(i =>
        <li><span>{i}</span></li>
      )}
    </ul>
  )
}

/**
 * Render a section header for a primary mission card.
 *
 * @remarks
 * Currently expects fixed-length arrays. Will update if the need arises.
 *
 * @param headers - Array of length 2 containing the headers for the table.
 * @param rows - Array of tuples of length 2 containing each row's cells.
 *
 * @returns ReactNode representing a stylized table.
 */
export function MissionRuleTable({
  headers,
  rows,
} : {
  headers: [string, string],
  rows: Array<[string, string]>
}) : React.ReactNode {
  return (
    <table className={styles.cardMissionRuleTable}>
      <thead>
        <tr key="table-header-row">
          <th key="th0"><span>{headers[0]}</span></th>
          <th key="th1" />
          <th key="th2">{newlineToBreak(headers[1])}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([cell1, cell2], index) =>
          <>
            <tr key={`tr${index}`}>
              <td key={`tr${index}-td0`}>{cell1}</td>
              <td key={`tr${index}-td1`}/>
              <td key={`tr${index}-td2`}>{cell2}</td>
            </tr>
            <tr key={`tr${index}-separator`}>
              <td key={`tr${index}-separator-td`} colSpan={3}>
                <Separator pariahNexus />
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  )
}
