import styles from '@/css/Cards.module.css'

export interface MissionCard {
  isFixed: boolean
  firstTurnAllowed?: boolean
  type: "Deployment" | "Primary Mission" | "Mission Rule" | "Secondary Mission" | "Gambit" | "Secret Mission"
  title: string
  flavorText: string
  bodyText: React.ReactNode | null
}

export interface LeviathanCards {
  deployments: Array<MissionCard>
  primaryMissions: Array<MissionCard>
  secondaryMissions: Array<MissionCard>
  missionRules: Array<MissionCard>
  gambits: Array<MissionCard>
}

const leviathanDeploymentCards: Array<MissionCard> = [
  {
    isFixed: false,
    type: "Deployment",
    title: "Crucible of Battle",
    flavorText: "",
    bodyText: null
  },
  {
    isFixed: false,
    type: "Deployment",
    title: "Dawn of War",
    flavorText: "",
    bodyText: null
  },
  {
    isFixed: false,
    type: "Deployment",
    title: "Hammer and Anvil",
    flavorText: "",
    bodyText: null
  },
  {
    isFixed: false,
    type: "Deployment",
    title: "Search and Destroy",
    flavorText: "",
    bodyText: null
  },
  {
    isFixed: false,
    type: "Deployment",
    title: "Sweeping Engagement",
    flavorText: "",
    bodyText: null
  },
]

const leviathanPrimaryMissionCards: Array<MissionCard> = [
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Deploy Servo-Skulls",
    flavorText: "This area contains mobile surveillance devices. Redeploy these to scout behind the enemy lines.",
    bodyText: (
      <>
        <p>
          The objective markers that start the battle in No Man's Land are servo-skulls. At the end of each turn, each of these objective markers can be moved up to 6" in any direction
          by the player that controls it. When moving objective markers, they cannot end that move on top of any other objective marker or model, or insize impassable parts of terrain<br />
          features (such as the walls of a ruin).
        </p>
        <div className={styles.primaryMissionHeader}>In the second, third, fourth and fifth battle rounds:</div>
        <p>At the end of each turn, the player whose turn it is scores VP<br />as follows:</p>
        <ul className={styles.missionCardList}>
          <li><span>2VP for each servo-skull that is wholly within 12" of their opponent's deployment zone.</span></li>
          <li><span>5VP for each servo-skull that is wholly within 6" of their opponent's deployment zone.</span></li>
          <li><span>8VP for each servo-skull that is wholly within their opponent's deployment zone.</span></li>
        </ul>
        <p>Note that these are not cumulative; if more than one applies, the player whose turn it is scores the applicable condition that carries the highest VP reward.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Priority Targets",
    flavorText: "The objectives in this area are vital to our war effort and securing them is your highest priority. Spare nothing in ensuring that they do not fall into enemy hands.",
    bodyText: (
      <>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each Command phase, the player whose turn it<br />is scores 5VP for each objective marker they control (up to 10VP per turn).</p>
        <div className={styles.primaryMissionHeader}>At the end of the battle:</div>
        <p>Each player scores 5VP for each objective marker they control (up to 15VP per player).</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Purge the Foe",
    flavorText: "Exterminate the enemy. Show them no mercy.",
    bodyText: (
      <>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each Command phase, the player whose turn it<br />is scores 4VP if they control one or more objective markers, and an extra 4VP if they control more objective markers than their opponent controls.</p>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores VP as<br />described above.</span></li>
          <li><span>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</span></li>
        </ul>
        <div className={styles.primaryMissionHeader}>In every battle round:</div>
        <p>At the end of the battle round, each player scores 4VP if one<br />or more enemy units were destroyed that battle round, and<br />an extra 4VP if more enemy units than friendly units were destroyed that battle round.</p>
        <p>Note that a unit can, if it is returned to the battlefield for any reason, potentailly contribute to this Primary Mission several times (assuming it is returned and subsequently destroyed several times over).</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "The Ritual",
    flavorText: "Bitter foes clash in a race to finish a ritual to either sanctify or corrupt the battlefield.",
    bodyText: (
      <>
        <p>When setting up the battlefield, remove all objective markers<br />in No Man's Land except the one closest to the centre of<br />the battlefield.</p>
        <p>
          In each player's Shooting phase, the player whose turn it is<br />can select one unit from their army that is not Battle-shocked and is eligible to shoot.
          Until the end of that turn, that unit<br />is not eligible to shoot or declare a charge. At the end of that turn, the player whose turn it is can set up one objective
          marker wholly within No Man's Land and within 1" of that unit provided it can be set up exactly 9" from one other objective marker and not within 6" of any other objective marker.
        </p>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each Command phase, the player whose turn it<br />is scores 5VP for each objective marker in No Man's Land they control (up to 15VP per turn).</p>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores VP as<br />described above.</span></li>
          <li><span>The player who has the second turn scores VP as described above, but does so at the end of their<br />turn instead of at the end of their<br />Command phase.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Scorched Earth",
    flavorText: "What cannot be secured must be burned to ash.",
    bodyText: (
      <>
        <p>
          From the second battle round, in each player's Shooting<br />phase, the player whose turn it is can select one unit from<br />their army that is not Battle-shocked and is eligible to shoot.
          Until the end of that turn, that unit is not eligible to shoot<br />or declare a charge. At the start of its controlling player's<br />next Command phase, if that unit is within 1" of an objective marker
          that the player whose turn it is controls, that objective marker is burned and removed from the battlefield.
        </p>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each Command phase, the player whose turn it<br />is scores 5VP for each objective marker they control (up to 10VP per turn).</p>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores VP as<br />described above.</span></li>
          <li><span>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</span></li>
        </ul>
        <div className={styles.primaryMissionHeader}>At the end of the battle:</div>
        <p>Each player scores 5VP if one or more objective<br />markers in No Man's Land were burned by a unit from<br />their army, and 10VP if the objective marker<br />in their opponent's deployment zone<br />was burned.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Sites of Power",
    flavorText: "There is great power for those bold enough to claim it.",
    bodyText: (
      <>
        <p>
          The objective markers in No Man's Land are sites of power. At the end of each Command phase, the player whose turn it is empowers all sites of power that they control that have one or more
          {" "}<span className={styles.cardKeyword}>Character</span>{" "}
          models from their army within range; each site of power remains empowered by that player while one or more of their
          {" "}<span className={styles.cardKeyword}>Character</span>{" "}
          models remains within range of it.
        </p>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each player's Command phase, the player whose turn it is scores VP as follows (up to 15VP per turn):</p>
        <ul className={styles.missionCardList}>
          <li><span>3VP for each objective marker they control.</span></li>
          <li><span>3VP for each site of power that they have empowered.</span></li>
        </ul>
        <p>Note that these are cumulative, so a player that controls one objective marker they have also empowered will score 6VP<br />that turn.</p>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores VP as<br />described above.</span></li>
          <li><span>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Supply Drop",
    flavorText: "Supplies are inbound. Secure the drop coordinates.",
    bodyText: (
      <>
        <p>
          At the start of the battle, players randomly select two different objective markers in No Man's Land: the first selected is the Alpha objective, the second selected is the Omega objective.<br />
          At the start of the fourth battle round, the Alpha objective is removed from the battlefield. At the start of the fifth battle round, all objective markers in No Man's Land apart from the
          Omega objective are also removed.
        </p>
        <div className={styles.primaryMissionHeader}>In the second and third battle rounds:</div>
        <p>At the end of each Command phase, the player whose turn<br />it is scores 5VP for each objective marker they control in No Man's Land.</p>
        <div className={styles.primaryMissionHeader}>In the fourth battle round:</div>
        <p>At the end of each Command phase, the player whose turn<br />it is scores 8VP for each objective marker they control in No Man's Land.</p>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores 15VP at the end of their Command phase if they control the objective marker in No Man's Land.</span></li>
          <li><span>The player who has the second turn scores 15VP at the<br />end of their turn if they control the objective marker in No Man's Land.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Take and Hold",
    flavorText: "Several strategic locations have been identified in your vicinity. You are ordered to assault these positions, secure them and hold them at any cost.",
    bodyText: (
      <>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each Command Phase, the player whose turn it<br />is scores 5VP for each objective marker they control (up to<br />15VP per turn).</p>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores VP as<br />described above.</span></li>
          <li><span>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: false,
    type: "Primary Mission",
    title: "Vital Ground",
    flavorText: "The most vital ground in the region is in enemy hands.",
    bodyText: (
      <>
        <p>If you draw this and the Hidden Supplies Mission Rule card, discard this card and draw a new Primary Mission Card.</p>
        <p>After setting up the battlefield, remove the objective marker in No Man's Land that is closest to the centre of the battlefield.</p>
        <div className={styles.primaryMissionHeader}>In the second, third and fourth battle rounds:</div>
        <p>At the end of each Command Phase, the player whose turn it<br />is scores VP as follows:</p>
        <ul className={styles.missionCardList}>
          <li><span>If they control the objective marker in their own deployment zone, they score 2VP.</span></li>
          <li><span>For each objective marker in No Man's Land that they control, they score 5VP.</span></li>
          <li><span>If they control the objective marker in their opponent's deployment zone, they score 6VP.</span></li>
        </ul>
        <div className={styles.primaryMissionHeader}>In the fifth battle round:</div>
        <ul className={`${styles.missionCardList} ${styles.primaryMissionCardListAfterHeader}`}>
          <li><span>The player who has the first turn scores VP as<br />described above.</span></li>
          <li><span>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</span></li>
        </ul>
      </>
    )
  },
]

const leviathanSecondaryMissionCards: Array<MissionCard> = [
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Area Denial",
    flavorText: "It is critical that this area is dominated. No enemy vanguard or guerrilla units can be allowed to disrupt our plans.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if one or more units from your army (excluding Battle-shocked units) are wholly within 6" of the centre
          of the battlefield, and there are no enemy units wholly within 6" of the centre of the battlefield, this Secondary Mission is
          achieved and your score 5VP.
        </p>
        <p>
          If, at the end of your turn, there are one or more enemy units wholly within 6" of the centre of the battlefield, but there are
          no enemy units within 3" of the centre<br />of the battlefield, then this Secondary Mission is still achieved, but in this instance
          you score 3VP instead<br />of 5VP.
        </p>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Assassination",
    flavorText: "The enemy look to their champions for courage. Identify and eliminate them with extreme prejudice.",
    bodyText: (
      <>
        <p>
          If you are using Fixed Missions, then while this Secondary Mission is active, each time an enemy
          {" "}<span className={styles.cardKeyword}>Character</span>{" "}
          model is destroyed, you score 4VP.
        </p>
        <p>
          If you are using Tactical Missions, then at the end<br />of the turn, if either of the conditions below
          are satisfied, this Secondary Mission is achieved and you score 5VP:
        </p>
        <ul className={styles.missionCardList}>
          <li><span>One or more enemy <span className={styles.cardKeyword}>Character</span> units were destroyed during this turn.</span></li>
          <li><span>All <span className={styles.cardKeyword}>Character</span> units from your opponent's Army Roster have been destroyed during the battle.</span></li>
        </ul>
        <p>
          Note that if you are using Tactical Missions, this Secondary Mission is achieved even if such a unit<br />
          was destroyed and then subsuquently resurrected for any reason.
        </p>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Behind Enemy Lines",
    flavorText: "Break through the foe's army and cut off their lines of  escape.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if two or more units from your army (excluding
          {" "}<span className={styles.cardKeyword}>Aircraft</span>
          ) are wholly within your opponent's deployment zone, this Secondary Mission is achieved and you score 4VP.
        </p>
        <p>
          If, at the end of your turn, only one unit from your army (excluding
          {" "}<span className={styles.cardKeyword}>Aircraft</span>
          ) is wholly within your opponent's deployment zone, then this Secondary Mission is still achieved,
          but in this instance you score 2VP instead<br />of 4VP.
        </p>
        <p>If you are using Tactical Missions, then when this Secondary Mission is acheived you score an extra 1VP (for a maximum of 5VP).</p>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Bring it Down",
    flavorText: "The opposing army contains numerous heavily armoured units. Take any opportunity to bring them  down.",
    bodyText: (
      <>
        <p>
          While this Secondary Mission is active, each time an enemy
          {" "}<span className={styles.cardKeyword}>Monster</span> or <span className={styles.cardKeyword}>Vehicle</span>{" "}
          model is destroyed, you score 2VP<br />and an extra 1VP for each of the conditions below that are satisfied (all are cumulative):
        </p>
        <ul className={styles.missionCardList}>
          <li><span>The destroyed model had a Wounds characteristic of 10+.</span></li>
          <li><span>The destroyed model had a Wounds characteristic of 15+.</span></li>
          <li><span>The destroyed model had a Wounds characteristic of 20+.</span></li>
        </ul>
        <p>
          Note that VP are scored even if such a model is destroyed and then dubdequently resurrected for any reason. If you score
          any VP from this Secondary Mission during a turn, then at the end of that turn this Secondary Mission is achieved.
        </p>
        <p>
          If you are using Tactical Missions, then when this Secondary Mission is achieved you score an extra 1VP. However, if you
          are using Tactical Missions, you cannot score more than 8VP in total from this Secondary Mission.
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Capture Enemy Outpost",
    flavorText: "A vital objective has been identified in you vicinity, but  it is currently held by the enemy. You are ordered to capture it at any cost.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if you control one or more objective markers in your opponent's deployment
          zone, this Secondary Mission is achieved and<br />you score 8VP.
        </p>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Cleanse",
    flavorText: "The objectives in this area have been tainted and must be cleansed with ritual and purifying flame.",
    bodyText: (
      <>
        <p>
          In your Shooting phase, you can select one or more units from you army that are not Battle-shocked and are
          eligible to shoot. Until the end of your turn, the units you selected are not eligible to shoot or declare<br />a charge.
        </p>
        <p>
          At the end of your turn, each objective marker that is not within you deployment zone that you control that
          has one or more of these selected units within range is cleansed by your army.
        </p>
        <p>
          If one or more objective markers are cleansed by your army this turn, this Secondary Mission is achieved and
          you score a number of VP depending on the number<br />of objective markers cleansed by your army this turn, as follows:
        </p>
        <ul className={styles.missionCardList}>
          <li><span>1 objective marker cleansed = 2VP if you are<br />using Fixed Missions, or 3VP if you are using Tactical Missions.</span></li>
          <li><span>2 or more objective marker cleansed = 4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: false,
    type: "Secondary Mission",
    title: "Defend Stronghold",
    flavorText: "You are charged with the defence of a key objective. It must not be permitted to fall into enemy hands.",
    bodyText: (
      <>
        <p>
          At the end of your opponent's turn, or at the end of the battle (whichever comes first), if you control one or
          more objective markers in your own deployment zone, this Secondary Mission is achieved and you score 3VP.
        </p>
        <p>
          This Secondary Mission cannot be achieved during<br />the first battle round; if you draw this Secondary Mission card during the
          first battle round, draw a new Secondary Mission card and shuffle this Secondary Mission card back into your Secondary Mission deck.
        </p>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Deploy Teleport Homer",
    flavorText: "An allied fleet approaches ready to launch a full-scale invasion of this planet. If our vanguard forces deploy a  series of teleport homers and landing beacons deep within enemy territory, troops aboard our ships will be able to launch a deadly surprise assault from orbit.",
    bodyText: (
      <>
        <p>
          In your Shooting phase, you can select one unit from your army that is not Battle-shocked and is eligible<br />to shoot.
          Until the end of your turn, that unit is not eligible to shoot or declare a charge.
        </p>
        <p>
          At the end of your turn, if that unit is within your opponent's deployment zone, or within 6" of the centre of the battlefield, it deploys a teleport
          homer at that location, this Secondary Mission is achieved and you score a number of VP depending on where the teleport homer was deployed, as follows:
        </p>
        <ul className={styles.missionCardList}>
          <li><span>Centre of battlefield = 3VP.</span></li>
          <li><span>Opponent's deployment zone = 4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Engage on all Fronts",
    flavorText: "This area is of extreme importance. You are to lead an immediate all-out assault to capture it and deny it to our enemy for good.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if you have one or more qualifying units (see below) from your army wholly within three or more
          different table quarters, and<br />those units are all more that 3" away from any other table quarter, this Secondary Mission
          is achieved<br />and you score 4VP if you have qualifying units in four different table quarters, or 2VP if you have
          qualifying units in three different table quarters.
        </p>
        <p>While a unit is Battle-shocked , it is not a<br />qualifying unit.</p>
        <p>
          If, when you draw this Secondary Mission card, you only have one or two qualifying units remaining in<br />
          your army, you can discard this Secondary Mission card and draw a new Secondary Mission card.
        </p>
        <p>
          If you are using Tactical Missions, then when this Secondary Mission is achieved you score an extra
          1VP (for a maximum of 5VP).
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Extend Battle Lines",
    flavorText: "The battleground is won one yard at a time. Continue to establish a strong military presence in the area.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if you control one or more objective markers in your own deployment zone and you also
          control one or more objective markers in No Man's Land, this Secondary Mission is achieved and you score 5VP.
        </p>
        <p>
          If you only have one unit remaining in your army, then this Secondary Mission is instead achieved at the end of your
          turn if that unit controls one objective marker<br />in No Man's Land, but in this instance you score 2VP instead of 5VP.
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Investigate Signals",
    flavorText: "Our fleet has received a mysterious signal in this war zone, and its source has been identified as originating somewhere in the vicinity of this battlefield. Locate and secure it without delay.",
    bodyText: (
      <>
        <p>
          In your Shooting phase, you can select one or more units from your army that are not Battle-shocked and are eligible to shoot.
          Until the end of your turn, the units you selected are not eligible to shoot or declare<br />a charge.
        </p>
        <p>
          At the end of your turn, each corner of the battlefield that has one or more of these selected units wholly within 9" of it is scanned by your army.
        </p>
        <p>
          If one or more corners are scanned by your army, this Secondary Mission is achieved and you score 2VP for each corner scanned by your army this turn.
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "No Prisoners",
    flavorText: "Exterminate your enemies.",
    bodyText: (
      <>
        <p>
          While this Secondary Mission is active, each time<br />an enemy unit is destroyed, you score 2VP (to a maximum of 5VP).
        </p>
        <p>
          Note that VP are scored even if such a unit is<br />destroyed and then subsequently resurrected for<br />any reason.
          If you score any VP from this Secondary Mission during a turn, then at the end of that turn this Secondary Mission is achieved.
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Overwhelming Force",
    flavorText: "Scour the enemy from the face of the battlefield.",
    bodyText: (
      <>
        <p>
          While this Secondary Mission is active, each time an enemy unit that started the turn within range of an
          objective marker is destroyed, you score 3VP (to a maximum of 5VP).
        </p>
        <p>
          Note that VP are scored even if such a unit is<br />destroyed and then subsequently resurrected for<br />any reason.
          If you score any VP from this Secondary Mission during a turn, then at the end of that turn this Secondary Mission is achieved.
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "Secure No Man's Land",
    flavorText: "You must advance swiftly into no man's land and  seize it before the enemy can, lest they take control of the entire battlefield.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if you control two or more objective markers in No Man's Land,
          this Secondary Mission is achieved and you score 5VP.
        </p>
        <p>
          If, at the end of your turn, you only control one objective marker in No Man's Land,
          this Secondary Mission is still achieved, but in this instance you score 2VP instead of 5VP.
        </p>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: false,
    type: "Secondary Mission",
    title: "Storm Hostile Objective",
    flavorText: "Dominate the field of battle. Storm every site of tactical  import and leave the foe with no place to hide.",
    bodyText: (
      <>
        <p>
          At the end of your turn, if either of the below conditions are satisfied, this Secondary Mission is
          achieved and you score4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions:
        </p>
        <ul className={styles.missionCardList}>
          <li><span>You control one or more objective markers that were controlled by your opponent at the start of your turn.</span></li>
          <li><span>Your opponent did not control any objective markers at the start of your turn and you control one or more objective markers that you did not control at the start of your turn.</span></li>
        </ul>
        <p>
          This Secondary Mission cannot be achieved during the first battle round; if you randomly drew this Secondary Mission card during the
          first battle round, draw a new Secondary Mission card and shuffle this Secondary Mission card back into your Secondary Mission deck.
        </p>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    type: "Secondary Mission",
    title: "A Tempting Target",
    flavorText: "An opportunity to seize a valuable asset has been identified, but the enemy are likely to use it as bait in  a  trap. Move to secure the site, but be wary of enemy ambushes.",
    bodyText: (
      <>
        <p>When this Secondary Mission card is drawn, your opponent must select one objective marker in No Man's Land.</p>
        <p>At the end of your turn, if you control that selected objective marker, this Secondary Mission is achieved and you score 5VP.</p>
      </>
    )
  },
]

const leviathanMissionRuleCards: Array<MissionCard> = [
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Chilling Rain",
    flavorText: "Intense winds gust across the battlefield, whipping through the shattered remains of bombed ruins and heavy with the stench of death. Icy rain drenches and  chills the warriors, only adding to their misery and  discomfort.",
    bodyText: (
      <>
        <p>In this mission, no additional mission rules apply.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Chosen Battlefield",
    flavorText: "Both sides have scouted the area extensively, pinpointing the exact location of vital sites.",
    bodyText: (
      <>
        <p>In this mission, objective markers are not placed<br />as shown on the Deployment card drawn. Instead, players roll off at the start of the Place Objective Markers step, then alternate setting up objective markers, one at a time, starting with the winner of the roll off.</p>
        <p>One objective marker must be placed wholly within each deployment zone, and the remaining objective markers must be placed wholly within No Man's Land, as shown on the Deployment card drawn. Objective markers must be placed more that 6" away from any battlefield edge and more than 9" away from all other objective markers.</p>
        <p>If for whatever reason it is not possible to set up an objective marker as described above, it is not placed on the battlefield.</p>
        <p>If any rules require players to set up additional objective markers (e.g. Hidden Supplies) during the Place Objective Markers step, players set them up as described on this Mission Card.</p>
        <p>If any rules instruct players to remove<br />one or more objective markers, do so<br />after setting them all up.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Delayed Reserves",
    flavorText: "Enemy interceptors roam the skies, strafing and bombinb any of our reinforcement units they discover. Our forces will inevitably be delayed as they attempt to dedge these vicious aerial patrols.",
    bodyText: (
      <>
        <p>In this mission, until the start of the third battle<br />round, each time a Reserves or Strategic Reserves<br />unit wishes to arrive on the battlefield, the controlling player must make a Reserves roll for it. To do so, that player rolls one D6: on a 3+, that unit arrives on the battlefield; otherwise, the Reserves roll fails and that unit does not arrive this turn.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Hidden Supplies",
    flavorText: "Reconnaissance units have uncovered a hidden cache  of ammunition, fuel and rations in this  war  zone.",
    bodyText: (
      <>
        <p>In this mission, players must set up one additional objective marker in No Man's Land.</p>
        <p>Unless the Chosen Battlefield mission rule is also in effect, before setting up this new objective marker, players must first move the objective marker in the centre of the battlefield 6" directly towards one of the corners of the battlefield (if No Man's Land touches<br />and of the corners of the battlefield, you must move the objective markers towards one of those corners). Players then set up the new objective marker 6" from the centre of the battlefield towards the diagonally opposite corner of the battlefield to the previously moved objective marker.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Maelstrom of Battle",
    flavorText: "Little respite or sanctuary is available across the battlefields of the 41st Millennium.",
    bodyText: (
      <>
        <p>In this mission, shuffle the remaining Mission<br />Rule cards together before drawing 2 new Mission<br />Rule cards.</p>
        <p>If either of these new Mission Rule cards is Chilling Rain, discard that Mission Rule card and draw 2 additionall new Mission Rule cards (for a total of 3 new Mission Rule cards).</p>
        <p>Apply all the drawn Mission Rule cards to the battle.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Minefields",
    flavorText: "Buried ordnance and hidden boody traps litter this battlefield, posing a threat to all units that advance recklessly and without due care.",
    bodyText: (
      <>
        <p>In this mission, each time an Advance roll of 6 is made for a unit, that unit sufferes 1 mortal wound.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Scrambler Fields",
    flavorText: "Scrambler fields and more esoteric devices have been activated in this area, restricting the use of advanced stealth and teleportation technologies.",
    bodyText: (
      <>
        <p>In this mission:</p>
        <ul className={styles.missionCardList}>
          <li><span>Players' units with the Infiltrators ability cannot<br />be set up within range of an objective marker<br />that is either in No Man's Land or their opponent's deployment zone.</span></li>
          <li><span>Players' units with the Scouts ability that make<br />a move before the first turn begins cannot end<br />that move within range of an objective marker<br />that is either in No Man's Land or their opponent's deployment zone.</span></li>
          <li><span>If any rule is userd to redeploy a unit, that rule cannot be used to set up that unit within range of an objective marker in No Man's Land.</span></li>
          <li><span>When a player's Reserves and Strategic Reserves units are set up on the battlefield, they cannot<br />be set up within range of an objective marker<br />that is either in No Man's Land or their opponent's deployment zone.</span></li>
        </ul>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Secret Intel",
    flavorText: "Our spies and recon teams have reported back with secret intelligence, allowing us to better coordinate our  next tactical move.",
    bodyText: (
      <>
        <p>In this mission, in each player's Command phase,<br />the first time that player draws Secondary Mission cards that phase, that player can draw one additional Secondary Mission card, and then discard one of their active Secondary Mission cards.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Supply Lines",
    flavorText: "Enemy infiltrators are attempting to sabotage and disrupt your supply lines. Maintain vigilance to secure  lines of communication and safeguard vital strategic  resources.",
    bodyText: (
      <>
        <p>In this mission, if a player controls the objective marker in their own deployment zone at the start of their Command phase, they roll one D6: on a 4+, that player gains 1CP.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Sweep and Clear",
    flavorText: "Forces have been ordered to perform a firesweep of this battlefield, methodically cleansing strategic sites of enemies one at a time before moving on.",
    bodyText: (
      <>
        <p>In this mission, if a player controls an objective<br />marker at the end of their Command phase, that objective marker remains under their control, even if they have no models within range of it, unless their opponent controls it at the end of any subsequent Command phase.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Targets of Opportunity",
    flavorText: "This battle zone is replete with tactical targets of opportunity, ideal for warlords who are eager for glory.",
    bodyText: (
      <>
        <p>In this mission, if a player is using Tactical missions, then each time that player determines which Secondary Mission cards are active for them, if they have fewer than 3 active Secondary Mission cards,<br />that player draws from their Secondary Mission deck until they have 3 Secondary Mission cards.</p>
        <p>In this mission, if a player is using Fixed Missions,<br />then in addition to the 2 Fixed Mission Cards, that player will also draw cards from their Secondary Mission deck during the battle. At the end of the Select Secondary Missions step, that player should retrieve their Secondary Mission deck, remove all the Fixed Mission cards that they did not select at the start of that step, then shuffle the remaining cards. Then, at the start of each of that player's Command phases, if that player has fewer than 3 active Secondary Mission cards (including their Fixed Mission cards), they draw from their Secondary Mission deck until they have<br />3 Secondary Mission cards. That player has access<br />to the New Orders Stratagem, and can spend CP to<br />use it after drawing their Secondary<br />Mission cards if they wish (remember<br />that Fixed Mission cards cannot be<br />discarded for any reason).</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Mission Rule",
    title: "Vox Static",
    flavorText: "Stellar flares, malicious scrapcode and electromagnetic energy restrict communications.",
    bodyText: (
      <>
        <p>In this mission, the Command Re-roll Stratagem and New Orders Stratagem both cost 2CP to use.</p>
      </>
    )
  },
]

const leviathanGambitCards: Array<MissionCard> = [
  {
    isFixed: false,
    type: "Gambit",
    title: "Delaying Tactics",
    flavorText: "The whole battle was a ruse to buy our covert kill teams the time they need to successfully complete a mission that could turn the tide of the entire war.",
    bodyText: (
      <>
        <p><strong>Determine Distraction Target:</strong> Your Distraction target will be equal to half the number of enemy units that are within Engagement Range of one or more<br />units from your army (rounding up) at the end of your fifth turn. If your Distraction target is less than 4, it is increased to 4.</p>
        <p><strong>Distract Enemy Units:</strong> At the end of your fifth<br />turn, roll one D6 for each enemy unit that is within Engagement Range of one or more units from<br />your army. Add 1 to the result if that enemy unit is Battle-shocked and subtract 1 if one or more of the units from your army that are within Engagement Range of it are Battle-shocked. On a 4+, that enemy unit has been successfully delayed.</p>
        <p><strong>Determine Gambit Success:</strong> If the number of enemy units that have been successfully delayed is greater than or equal to your Distraction target, this Gambit is successfully completed and you score 30VP.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Gambit",
    title: "Emergency Evacuation",
    flavorText: "Remaining in this battlezone is folly. Teleportariums are being sanctified and orbital transports are inbound  to exfiltrate what forces remain. Prepare for immediate extraction.",
    bodyText: (
      <>
        <p><strong>Determine Evacuation Target:</strong> Your Evacuation<br />target will be equal to half the number of units from your army that are on the battlefield at the end of the battle (rounding up), including units embarked within <span className={styles.cardKeyword}>Transport</span> models that are on the battlefield. If your Evacuation target is less than 4, it is increased to 4.</p>
        <p><strong>Evacuate Units:</strong> At the end of your fifth turn, roll one D6 for each unit from your army that is wholly within<br />6" of the centre of the battlefield, subtracting 1 from the result if that unit is Battle-shocked. On a 4+, that unit (and any units embarked within it) are marked<br />for evacuation.</p>
        <p><strong>Determine Gambit Success:</strong> If the number of your units that are marked for evacuation is greater than<br />or equal to your Evacuation target, this Gambit is successfully completed and you score 30VP.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Gambit",
    title: "Orbital Strike Coordinates",
    flavorText: "The battlefield is lost. Triangulate coordinates and transmit them to our orbital assets so that they can unleash their fury and deny the enemy their prize.",
    bodyText: (
      <>
        <p>At the end of your fifth turn, if one or more units from your army that are not Battle-shocked are wholly within 9" of a corner of the battlefield, and those units are not withing your own deployment zone, roll 2D6.</p>
        <p>Add 1 to the result for every other corner of the battlefield that has one or more units from your<br />army wholly within 9" of it (excluding units that are Battle-schocked or within Engagement Range of any enemy units).</p>
        <p>If the final result is 12 or more, this Gambit is successfully completed and you score 30VP.</p>
      </>
    )
  },
  {
    isFixed: false,
    type: "Gambit",
    title: "Proceed as planned",
    flavorText: "Your battle plan is unfolding as you had foreseen, and the time to strike the fatal blow is almost at hand. Stay the course, and victory is all but assured.",
    bodyText: (
      <>
        <p>If you select this Gambit card, you have chosen not to attempt a gambit.</p>
        <p>Until the end of the battle, you continue to score VP from your Primary Mission.</p>
      </>
    )
  },
]

export const leviathanCards: LeviathanCards = {
  deployments: leviathanDeploymentCards,
  primaryMissions: leviathanPrimaryMissionCards,
  secondaryMissions: leviathanSecondaryMissionCards,
  missionRules: leviathanMissionRuleCards,
  gambits: leviathanGambitCards
}