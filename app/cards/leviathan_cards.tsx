import { type MissionCard } from '@/components/Cards/MissionDeck'
import { Paragraph, Keyword, Strong, Header, List } from '@/components/Cards/MissionDeckComponents'

export interface LeviathanCards {
  deployments: Array<MissionCard>
  missionRules: Array<MissionCard>
  primaryMissions: Array<MissionCard>
  secondaryMissions: Array<MissionCard>
  gambits: Array<MissionCard>
}

const leviathanDeploymentCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "deployments",
    title: "Crucible of Battle",
    flavor: "",
    body: null
  },
  {
    isFixed: false,
    section: "deployments",
    title: "Dawn of War",
    flavor: "",
    body: null
  },
  {
    isFixed: false,
    section: "deployments",
    title: "Hammer and Anvil",
    flavor: "",
    body: null
  },
  {
    isFixed: false,
    section: "deployments",
    title: "Search and Destroy",
    flavor: "",
    body: null
  },
  {
    isFixed: false,
    section: "deployments",
    title: "Sweeping Engagement",
    flavor: "",
    body: null
  },
]

const leviathanMissionRuleCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "missionRules",
    title: "Chilling Rain",
    flavor: "Intense winds gust across the battlefield, whipping through the shattered remains of bombed ruins and heavy with the stench of death. Icy rain drenches and  chills the warriors, only adding to their misery and  discomfort.",
    body: (
      <>
        <Paragraph>
          In this mission, no additional mission rules apply.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Chosen Battlefield",
    flavor: "Both sides have scouted the area extensively, pinpointing the exact location of vital sites.",
    body: (
      <>
        <Paragraph>
          In this mission, objective markers are not placed<br />
          as shown on the Deployment card drawn. Instead, players roll off at the start of the
          Place Objective Markers step, then alternate setting up objective markers, one at a time,
          starting with the winner of the roll off.
        </Paragraph>
        <Paragraph>
          One objective marker must be placed wholly within each deployment zone, and the remaining 
          objective markers must be placed wholly within No Man's Land, as shown on the Deployment card drawn.
          Objective markers must be placed more that 6" away from any battlefield edge and more than 9" away
          from all other objective markers.
        </Paragraph>
        <Paragraph>
          If for whatever reason it is not possible to set up an objective marker as described above,
          it is not placed on the battlefield.
        </Paragraph>
        <Paragraph>
          If any rules require players to set up additional objective markers (e.g. Hidden Supplies) during
          the Place Objective Markers step, players set them up as described on this Mission Card.
        </Paragraph>
        <Paragraph>
          If any rules instruct players to remove<br />one or more objective markers, do so<br />
          after setting them all up.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Delayed Reserves",
    flavor: "Enemy interceptors roam the skies, strafing and bombing any of our reinforcement units they discover. Our forces will inevitably be delayed as they attempt to dedge these vicious aerial patrols.",
    body: (
      <>
        <Paragraph>
          In this mission, until the start of the third battle<br />
          round, each time a Reserves or Strategic Reserves<br />
          unit wishes to arrive on the battlefield, the controlling player must make a Reserves roll for it.
          To do so, that player rolls one D6: on a 3+, that unit arrives on the battlefield; otherwise, the
          Reserves roll fails and that unit does not arrive this turn.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Hidden Supplies",
    flavor: "Reconnaissance units have uncovered a hidden cache  of ammunition, fuel and rations in this  war  zone.",
    body: (
      <>
        <Paragraph>
          In this mission, players must set up one additional objective marker in No Man's Land.
        </Paragraph>
        <Paragraph>
          Unless the Chosen Battlefield mission rule is also in effect, before setting up this new objective marker,
          players must first move the objective marker in the centre of the battlefield 6" directly towards one of the
          corners of the battlefield (if No Man's Land touches<br />
          and of the corners of the battlefield, you must move the
          objective markers towards one of those corners). Players then set up the new objective marker 6" from the centre
          of the battlefield towards the diagonally opposite corner of the battlefield to the previously moved objective marker.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Maelstrom of Battle",
    flavor: "Little respite or sanctuary is available across the battlefields of the 41st Millennium.",
    body: (
      <>
        <Paragraph>
          In this mission, shuffle the remaining Mission<br />
          Rule cards together before drawing 2 new Mission<br />
          Rule cards.
        </Paragraph>
        <Paragraph>
          If either of these new Mission Rule cards is Chilling Rain, discard that Mission Rule card
          and draw 2 additionall new Mission Rule cards (for a total of 3 new Mission Rule cards).
        </Paragraph>
        <Paragraph>
          Apply all the drawn Mission Rule cards to the battle.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Minefields",
    flavor: "Buried ordnance and hidden boody traps litter this battlefield, posing a threat to all units that advance recklessly and without due care.",
    body: (
      <>
        <Paragraph>
          In this mission, each time an Advance roll of 6 is made for a unit, that unit sufferes 1 mortal wound.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Scrambler Fields",
    flavor: "Scrambler fields and more esoteric devices have been activated in this area, restricting the use of advanced stealth and teleportation technologies.",
    body: (
      <>
        <Paragraph>
          In this mission:
        </Paragraph>
        <List
          items={[
            <>Players' units with the Infiltrators ability cannot<br />be set up within range of an objective marker<br />that is either in No Man's Land or their opponent's deployment zone.</>,
            <>Players' units with the Scouts ability that make<br />a move before the first turn begins cannot end<br />that move within range of an objective marker<br />that is either in No Man's Land or their opponent's deployment zone.</>,
            <>If any rule is userd to redeploy a unit, that rule cannot be used to set up that unit within range of an objective marker in No Man's Land.</>,
            <>When a player's Reserves and Strategic Reserves units are set up on the battlefield, they cannot<br />be set up within range of an objective marker<br />that is either in No Man's Land or their opponent's deployment zone.</>
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Secret Intel",
    flavor: "Our spies and recon teams have reported back with secret intelligence, allowing us to better coordinate our  next tactical move.",
    body: (
      <>
        <Paragraph>
          In this mission, in each player's Command phase,<br />
          the first time that player draws Secondary Mission cards that phase, that player can draw one
          additional Secondary Mission card, and then discard one of their active Secondary Mission cards.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Supply Lines",
    flavor: "Enemy infiltrators are attempting to sabotage and disrupt your supply lines. Maintain vigilance to secure  lines of communication and safeguard vital strategic  resources.",
    body: (
      <>
        <Paragraph>
          In this mission, if a player controls the objective marker in their own deployment zone
          at the start of their Command phase, they roll one D6: on a 4+, that player gains 1CP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Sweep and Clear",
    flavor: "Forces have been ordered to perform a firesweep of this battlefield, methodically cleansing strategic sites of enemies one at a time before moving on.",
    body: (
      <>
        <Paragraph>
          In this mission, if a player controls an objective<br />marker at the end of their Command phase,
          that objective marker remains under their control, even if they have no models within range of it,
          unless their opponent controls it at the end of any subsequent Command phase.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Targets of Opportunity",
    flavor: "This battle zone is replete with tactical targets of opportunity, ideal for warlords who are eager for glory.",
    body: (
      <>
        <Paragraph>
          In this mission, if a player is using Tactical missions, then each time that player determines which
          Secondary Mission cards are active for them, if they have fewer than 3 active Secondary Mission cards,<br />
          that player draws from their Secondary Mission deck until they have 3 Secondary Mission cards.
        </Paragraph>
        <Paragraph>
          In this mission, if a player is using Fixed Missions,<br />then in addition to the 2 Fixed Mission Cards,
          that player will also draw cards from their Secondary Mission deck during the battle. At the end of the
          Select Secondary Missions step, that player should retrieve their Secondary Mission deck, remove all the
          Fixed Mission cards that they did not select at the start of that step, then shuffle the remaining cards.
          Then, at the start of each of that player's Command phases, if that player has fewer than 3 active Secondary Mission
          cards (including their Fixed Mission cards), they draw from their Secondary Mission deck until they have<br />
          3 Secondary Mission cards. That player has access<br />to the New Orders Stratagem, and can spend CP to<br />
          use it after drawing their Secondary<br />Mission cards if they wish (remember<br />
          that Fixed Mission cards cannot be<br />
          discarded for any reason).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Vox Static",
    flavor: "Stellar flares, malicious scrapcode and electromagnetic energy restrict communications.",
    body: (
      <>
        <Paragraph>
          In this mission, the Command Re-roll Stratagem and New Orders Stratagem both cost 2CP to use.
        </Paragraph>
      </>
    )
  },
]

const leviathanPrimaryMissionCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Deploy Servo-Skulls",
    flavor: "This area contains mobile surveillance devices. Redeploy these to scout behind the enemy lines.",
    body: (
      <>
        <Paragraph extraSmall>
          The objective markers that start the battle in No Man's Land are servo-skulls. At the end of each turn,
          each of these objective markers can be moved up to 6" in any direction by the player that controls it.
          When moving objective markers, they cannot end that move on top of any other objective marker or model,
          or insize impassable parts of terrain<br />
          features (such as the walls of a ruin).
        </Paragraph>
        <Header
          leviathan
          text="In the second, third, fourth and fifth battle rounds:"
        />
        <Paragraph extraSmall>
          At the end of each turn, the player whose turn it is scores VP<br />
          as follows:
        </Paragraph>
        <List
          extraSmall
          items={[
            "2VP for each servo-skull that is wholly within 12\" of their opponent's deployment zone.",
            "5VP for each servo-skull that is wholly within 6\" of their opponent's deployment zone.",
            "8VP for each servo-skull that is wholly within their opponent's deployment zone.",
          ]}
        />
        <Paragraph extraSmall>
          Note that these are not cumulative; if more than one applies, the player whose turn it is scores
          the applicable condition that carries the highest VP reward.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Priority Targets",
    flavor: "The objectives in this area are vital to our war effort and securing them is your highest priority. Spare nothing in ensuring that they do not fall into enemy hands.",
    body: (
      <>
        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall>
          At the end of each Command phase, the player whose turn it<br />
          is scores 5VP for each objective marker they control (up to 10VP per turn).
        </Paragraph>

        <Header
          leviathan
          text="At the end of the battle:"
        />
        <Paragraph extraSmall>
          Each player scores 5VP for each objective marker they control (up to 15VP per player).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Purge the Foe",
    flavor: "Exterminate the enemy. Show them no mercy.",
    body: (
      <>
        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall>
          At the end of each Command phase, the player whose turn it<br />
          is scores 4VP if they control one or more objective markers, and an extra
          4VP if they control more objective markers than their opponent controls.
        </Paragraph>
        
        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores VP as<br />described above.</>,
            <>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</>,
          ]}
        />
        
        <Header
          leviathan
          text="In every battle round:"
        />
        <Paragraph extraSmall>
          At the end of the battle round, each player scores 4VP if one<br />
          or more enemy units were destroyed that battle round, and<br />
          an extra 4VP if more enemy units than friendly units were destroyed that battle round.
        </Paragraph>
        <Paragraph extraSmall>
          Note that a unit can, if it is returned to the battlefield for any reason, potentailly
          contribute to this Primary Mission several times (assuming it is returned and subsequently
          destroyed several times over).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "The Ritual",
    flavor: "Bitter foes clash in a race to finish a ritual to either sanctify or corrupt the battlefield.",
    body: (
      <>
        <Paragraph extraSmall>
          When setting up the battlefield, remove all objective markers<br />
          in No Man's Land except the one closest to the centre of<br />
          the battlefield.
        </Paragraph>
        <Paragraph extraSmall>
          In each player's Shooting phase, the player whose turn it is<br />
          can select one unit from their army that is not Battle-shocked and is eligible to shoot.
          Until the end of that turn, that unit<br />
          is not eligible to shoot or declare a charge. At the end of that turn, the player whose
          turn it is can set up one objective marker wholly within No Man's Land and within 1" of
          that unit provided it can be set up exactly 9" from one other objective marker and not
          within 6" of any other objective marker.
        </Paragraph>

        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall>
          At the end of each Command phase, the player whose turn it<br />
          is scores 5VP for each objective marker in No Man's Land they control (up to 15VP per turn).
        </Paragraph>
        
        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores VP as<br />described above.</>,
            <>The player who has the second turn scores VP as described above, but does so at the end of their<br />turn instead of at the end of their<br />Command phase.</>
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Scorched Earth",
    flavor: "What cannot be secured must be burned to ash.",
    body: (
      <>
        <Paragraph extraSmall>
          From the second battle round, in each player's Shooting<br />
          phase, the player whose turn it is can select one unit from<br />
          their army that is not Battle-shocked and is eligible to shoot.
          Until the end of that turn, that unit is not eligible to shoot<br />
          or declare a charge. At the start of its controlling player's<br />
          next Command phase, if that unit is within 1" of an objective marker
          that the player whose turn it is controls, that objective marker is
          burned and removed from the battlefield.
        </Paragraph>
        
        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall squished>
          At the end of each Command phase, the player whose turn it<br />
          is scores 5VP for each objective marker they control (up to 10VP per turn).
        </Paragraph>
        
        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores VP as<br />described above.</>,
            <>The player who has the second turn scores VP as<br />described above, but does so at the end of their turn instead of at the end of their Command phase.</>,
          ]}
        />

        <Header
          leviathan
          text="At the end of the battle:"
        />
        <Paragraph extraSmall squished>
          Each player scores 5VP if one or more objective<br />
          markers in No Man's Land were burned by a unit from<br />
          their army, and 10VP if the objective marker<br />
          in their opponent's deployment zone<br />
          was burned.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Sites of Power",
    flavor: "There is great power for those bold enough to claim it.",
    body: (
      <>
        <Paragraph extraSmall>
          The objective markers in No Man's Land are sites of power. At the end of each Command phase,
          the player whose turn it is empowers all sites of power that they control that have one or more
          <Keyword word="Character" /> models from their army within range; each site of power remains
          empowered by that player while one or more of their <Keyword word="Character" />
          models remains within range of it.
        </Paragraph>

        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall squished>
          At the end of each player's Command phase, the player whose turn it is scores VP as follows
          (up to 15VP per turn):
        </Paragraph>
        <List
          extraSmall
          items={[
            "3VP for each objective marker they control.",
            "3VP for each site of power that they have empowered.",
          ]}
        />
        <Paragraph extraSmall>
          Note that these are cumulative, so a player that controls one objective marker
          they have also empowered will score 6VP<br />
          that turn.
        </Paragraph>

        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores VP as<br />described above.</>,
            <>The player who has the second turn scores VP as<br />described above, but does so at the end of their turn instead of at the end of their Command phase.</>,
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Supply Drop",
    flavor: "Supplies are inbound. Secure the drop coordinates.",
    body: (
      <>
        <Paragraph extraSmall squished>
          At the start of the battle, players randomly select two different objective markers in No Man's Land:
          the first selected is the Alpha objective, the second selected is the Omega objective.<br />
          At the start of the fourth battle round, the Alpha objective is removed from the battlefield.
          At the start of the fifth battle round, all objective markers in No Man's Land apart from the
          Omega objective are also removed.
        </Paragraph>
        
        <Header
          leviathan
          text="In the second and third battle rounds:"
        />
        <Paragraph extraSmall squished>
          At the end of each Command phase, the player whose turn<br />
          it is scores 5VP for each objective marker they control in No Man's Land.
        </Paragraph>

        <Header
          leviathan
          text="In the fourth battle round:"
        />
        <Paragraph extraSmall squished>
          At the end of each Command phase, the player whose turn<br />
          it is scores 8VP for each objective marker they control in No Man's Land.
        </Paragraph>
        
        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores 15VP at the end of their Command phase if they control the objective marker in No Man's Land.</>,
            <>The player who has the second turn scores 15VP at the<br />end of their turn if they control the objective marker in No Man's Land.</>,
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Take and Hold",
    flavor: "Several strategic locations have been identified in your vicinity. You are ordered to assault these positions, secure them and hold them at any cost.",
    body: (
      <>
        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall>
          At the end of each Command Phase, the player whose turn it<br />
          is scores 5VP for each objective marker they control (up to<br />
          15VP per turn).
        </Paragraph>
        
        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores VP as<br />described above.</>,
            <>The player who has the second turn scores VP as described above, but does so at the end of their turn instead of at the end of their Command phase.</>,
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Vital Ground",
    flavor: "The most vital ground in the region is in enemy hands.",
    body: (
      <>
        <Paragraph extraSmall>
          If you draw this and the Hidden Supplies Mission Rule card,
          discard this card and draw a new Primary Mission Card.
        </Paragraph>
        <Paragraph extraSmall>
          After setting up the battlefield, remove the objective marker
          in No Man's Land that is closest to the centre of the battlefield.
        </Paragraph>
        
        <Header
          leviathan
          text="In the second, third and fourth battle rounds:"
        />
        <Paragraph extraSmall>
          At the end of each Command Phase, the player whose turn it<br />
          is scores VP as follows:
        </Paragraph>
        <List
          extraSmall
          items={[
            "If they control the objective marker in their own deployment zone, they score 2VP.",
            "For each objective marker in No Man's Land that they control, they score 5VP.",
            "If they control the objective marker in their opponent's deployment zone, they score 6VP.",
          ]}
        />

        <Header
          leviathan
          text="In the fifth battle round:"
        />
        <List
          extraSmall
          extraTopMargin
          items={[
            <>The player who has the first turn scores VP as<br />described above.</>,
            <>The player who has the second turn scores VP as<br />described above, but does so at the end of their turn instead of at the end of their Command phase.</>
          ]}
        />
      </>
    )
  },
]

const leviathanSecondaryMissionCards: Array<MissionCard> = [
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Area Denial",
    flavor: "It is critical that this area is dominated. No enemy vanguard or guerrilla units can be allowed to disrupt our plans.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if one or more units from your army (excluding Battle-shocked units)
          are wholly within 6" of the centre of the battlefield, and there are no enemy units wholly within
          6" of the centre of the battlefield, this Secondary Mission is achieved and your score 5VP.
        </Paragraph>
        <Paragraph>
          If, at the end of your turn, there are one or more enemy units wholly within 6" of
          the centre of the battlefield, but there are no enemy units within 3" of the centre<br />
          of the battlefield, then this Secondary Mission is still achieved, but in this instance you score 3VP instead<br />
          of 5VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Assassination",
    flavor: "The enemy look to their champions for courage. Identify and eliminate them with extreme prejudice.",
    body: (
      <>
        <Paragraph>
          If you are using Fixed Missions, then while this Secondary Mission is active, each time an enemy
          <Keyword word="Character" /> model is destroyed, you score 4VP.
        </Paragraph>
        <Paragraph>
          If you are using Tactical Missions, then at the end<br />of the turn, if either of the conditions below
          are satisfied, this Secondary Mission is achieved and you score 5VP:
        </Paragraph>
        <List
          items={[
            <>One or more enemy <Keyword word="Character" /> units were destroyed during this turn.</>,
            <>All <Keyword word="Character" /> units from your opponent's Army Roster have been destroyed during the battle.</>
          ]}
        />
        <Paragraph>
          Note that if you are using Tactical Missions, this Secondary Mission is achieved even if such a unit<br />
          was destroyed and then subsuquently resurrected for any reason.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Behind Enemy Lines",
    flavor: "Break through the foe's army and cut off their lines of  escape.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if two or more units from your army (excluding
          <Keyword word="Aircraft" noRight />) are wholly within your opponent's deployment zone,
          this Secondary Mission is achieved and you score 4VP.
        </Paragraph>
        <Paragraph>
          If, at the end of your turn, only one unit from your army (excluding
          <Keyword word="Aircraft" noRight />) is wholly within your opponent's deployment zone,
          then this Secondary Mission is still achieved, but in this instance you score 2VP instead<br />
          of 4VP.
        </Paragraph>
        <Paragraph>
          If you are using Tactical Missions, then when this Secondary Mission is acheived
          you score an extra 1VP (for a maximum of 5VP).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Bring it Down",
    flavor: "The opposing army contains numerous heavily armoured units. Take any opportunity to bring them  down.",
    body: (
      <>
        <Paragraph small>
          While this Secondary Mission is active, each time an enemy
          <Keyword word="Monster" /> or <Keyword word="Vehicle" />
          model is destroyed, you score 2VP<br />and an extra 1VP for each
          of the conditions below that are satisfied (all are cumulative):
        </Paragraph>
        <List
          small
          items={[
            "The destroyed model had a Wounds characteristic of 10+.",
            "The destroyed model had a Wounds characteristic of 15+.",
            "The destroyed model had a Wounds characteristic of 20+.",
          ]}
        />
        <Paragraph small>
          Note that VP are scored even if such a model is destroyed and then subsequently
          resurrected for any reason. If you score any VP from this Secondary Mission during
          a turn, then at the end of that turn this Secondary Mission is achieved.
        </Paragraph>
        <Paragraph small>
          If you are using Tactical Missions, then when this Secondary Mission is achieved you
          score an extra 1VP. However, if you are using Tactical Missions, you cannot score more
          than 8VP in total from this Secondary Mission.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Capture Enemy Outpost",
    flavor: "A vital objective has been identified in you vicinity, but  it is currently held by the enemy. You are ordered to capture it at any cost.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if you control one or more objective markers in
          your opponent's deployment zone, this Secondary Mission is achieved and<br />
          you score 8VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Cleanse",
    flavor: "The objectives in this area have been tainted and must be cleansed with ritual and purifying flame.",
    body: (
      <>
        <Paragraph>
          In your Shooting phase, you can select one or more units from you army that are not Battle-shocked and are
          eligible to shoot. Until the end of your turn, the units you selected are not eligible to shoot or declare<br />
          a charge.
        </Paragraph>
        <Paragraph>
          At the end of your turn, each objective marker that is not within you deployment zone that you control that
          has one or more of these selected units within range is cleansed by your army.
        </Paragraph>
        <Paragraph>
          If one or more objective markers are cleansed by your army this turn, this Secondary Mission
          is achieved and you score a number of VP depending on the number<br />
          of objective markers cleansed by your army this turn, as follows:
        </Paragraph>
        <List
          items={[
            <>1 objective marker cleansed = 2VP if you are<br />using Fixed Missions, or 3VP if you are using Tactical Missions.</>,
            <>2 or more objective marker cleansed = 4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions.</>
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: false,
    section: "secondaryMissions",
    title: "Defend Stronghold",
    flavor: "You are charged with the defence of a key objective. It must not be permitted to fall into enemy hands.",
    body: (
      <>
        <Paragraph>
          At the end of your opponent's turn, or at the end of the battle (whichever comes first),
          if you control one or more objective markers in your own deployment zone, this Secondary Mission
          is achieved and you score 3VP.
        </Paragraph>
        <Paragraph>
          This Secondary Mission cannot be achieved during<br />
          the first battle round; if you draw this Secondary Mission card during the
          first battle round, draw a new Secondary Mission card and shuffle this Secondary Mission
          card back into your Secondary Mission deck.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Deploy Teleport Homer",
    flavor: "An allied fleet approaches ready to launch a full-scale invasion of this planet. If our vanguard forces deploy a  series of teleport homers and landing beacons deep within enemy territory, troops aboard our ships will be able to launch a deadly surprise assault from orbit.",
    body: (
      <>
        <Paragraph>
          In your Shooting phase, you can select one unit from your army that is not Battle-shocked and is eligible<br />
          to shoot. Until the end of your turn, that unit is not eligible to shoot or declare a charge.
        </Paragraph>
        <Paragraph>
          At the end of your turn, if that unit is within your opponent's deployment zone, or within 6" of the centre of
          the battlefield, it deploys a teleport homer at that location, this Secondary Mission is achieved and you score
          a number of VP depending on where the teleport homer was deployed, as follows:
        </Paragraph>
        <List
          items={[
            "Centre of battlefield = 3VP.",
            "Opponent's deployment zone = 4VP if you are using Fixed Missions, or 5VP if you are using Tactical Missions.",
          ]}
        />
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Engage on all Fronts",
    flavor: "This area is of extreme importance. You are to lead an immediate all-out assault to capture it and deny it to our enemy for good.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if you have one or more qualifying units (see below) from your army
          wholly within three or more different table quarters, and<br />
          those units are all more that 3" away from any other table quarter, this Secondary Mission is achieved<br />
          and you score 4VP if you have qualifying units in four different table quarters, or 2VP if you have
          qualifying units in three different table quarters.
        </Paragraph>
        <Paragraph>
          While a unit is Battle-shocked , it is not a<br />
          qualifying unit.
        </Paragraph>
        <Paragraph>
          If, when you draw this Secondary Mission card, you only have one or two qualifying units remaining in<br />
          your army, you can discard this Secondary Mission card and draw a new Secondary Mission card.
        </Paragraph>
        <Paragraph>
          If you are using Tactical Missions, then when this Secondary Mission is achieved you score an extra
          1VP (for a maximum of 5VP).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Extend Battle Lines",
    flavor: "The battleground is won one yard at a time. Continue to establish a strong military presence in the area.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if you control one or more objective markers in your own deployment zone and you also
          control one or more objective markers in No Man's Land, this Secondary Mission is achieved and you score 5VP.
        </Paragraph>
        <Paragraph>
          If you only have one unit remaining in your army, then this Secondary Mission is instead
          achieved at the end of your turn if that unit controls one objective marker<br />
          in No Man's Land, but in this instance you score 2VP instead of 5VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Investigate Signals",
    flavor: "Our fleet has received a mysterious signal in this war zone, and its source has been identified as originating somewhere in the vicinity of this battlefield. Locate and secure it without delay.",
    body: (
      <>
        <Paragraph>
          In your Shooting phase, you can select one or more units from your army that are not
          Battle-shocked and are eligible to shoot. Until the end of your turn, the units you
          selected are not eligible to shoot or declare<br />
          a charge.
        </Paragraph>
        <Paragraph>
          At the end of your turn, each corner of the battlefield that has one or more of these
          selected units wholly within 9" of it is scanned by your army.
        </Paragraph>
        <Paragraph>
          If one or more corners are scanned by your army, this Secondary Mission is achieved and
          you score 2VP for each corner scanned by your army this turn.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "No Prisoners",
    flavor: "Exterminate your enemies.",
    body: (
      <>
        <Paragraph>
          While this Secondary Mission is active, each time<br />
          an enemy unit is destroyed, you score 2VP (to a maximum of 5VP).
        </Paragraph>
        <Paragraph>
          Note that VP are scored even if such a unit is<br />
          destroyed and then subsequently resurrected for<br />
          any reason. If you score any VP from this Secondary Mission during a
          turn, then at the end of that turn this Secondary Mission is achieved.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Overwhelming Force",
    flavor: "Scour the enemy from the face of the battlefield.",
    body: (
      <>
        <Paragraph>
          While this Secondary Mission is active, each time an enemy unit that
          started the turn within range of an objective marker is destroyed,
          you score 3VP (to a maximum of 5VP).
        </Paragraph>
        <Paragraph>
          Note that VP are scored even if such a unit is<br />
          destroyed and then subsequently resurrected for<br />
          any reason. If you score any VP from this Secondary Mission during a turn,
          then at the end of that turn this Secondary Mission is achieved.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "Secure No Man's Land",
    flavor: "You must advance swiftly into no man's land and  seize it before the enemy can, lest they take control of the entire battlefield.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if you control two or more objective markers in No Man's Land,
          this Secondary Mission is achieved and you score 5VP.
        </Paragraph>
        <Paragraph>
          If, at the end of your turn, you only control one objective marker in No Man's Land,
          this Secondary Mission is still achieved, but in this instance you score 2VP instead of 5VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: true,
    firstTurnAllowed: false,
    section: "secondaryMissions",
    title: "Storm Hostile Objective",
    flavor: "Dominate the field of battle. Storm every site of tactical  import and leave the foe with no place to hide.",
    body: (
      <>
        <Paragraph>
          At the end of your turn, if either of the below conditions are satisfied,
          this Secondary Mission is achieved and you score 4VP if you are using Fixed Missions,
          or 5VP if you are using Tactical Missions:
        </Paragraph>
        <List
          items={[
            "You control one or more objective markers that were controlled by your opponent at the start of your turn.",
            "Your opponent did not control any objective markers at the start of your turn and you control one or more objective markers that you did not control at the start of your turn.",
          ]}
        />
        <Paragraph>
          This Secondary Mission cannot be achieved during the first battle round;
          if you randomly drew this Secondary Mission card during the first battle round, draw a new
          Secondary Mission card and shuffle this Secondary Mission card back into your Secondary Mission deck.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    firstTurnAllowed: true,
    section: "secondaryMissions",
    title: "A Tempting Target",
    flavor: "An opportunity to seize a valuable asset has been identified, but the enemy are likely to use it as bait in  a  trap. Move to secure the site, but be wary of enemy ambushes.",
    body: (
      <>
        <Paragraph>
          When this Secondary Mission card is drawn, your opponent must select one objective marker in No Man's Land.
        </Paragraph>
        <Paragraph>
          At the end of your turn, if you control that selected objective marker, this Secondary Mission is achieved and you score 5VP.
        </Paragraph>
      </>
    )
  },
]

const leviathanGambitCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "gambits",
    title: "Delaying Tactics",
    flavor: "The whole battle was a ruse to buy our covert kill teams the time they need to successfully complete a mission that could turn the tide of the entire war.",
    body: (
      <>
        <Paragraph>
        <Strong uppercase typed text="Determine Evacuation Target:" /> Your Distraction target will be equal
          to half the number of enemy units that are within Engagement Range of one or more<br />
          units from your army (rounding up) at the end of your fifth turn. If your Distraction
          target is less than 4, it is increased to 4.
        </Paragraph>
        <Paragraph>
          <Strong uppercase typed text="Distract Enemy Units:" /> At the end of your fifth<br />
          turn, roll one D6 for each enemy unit that is within Engagement Range of one or more units from<br />
          your army. Add 1 to the result if that enemy unit is Battle-shocked and subtract 1 if one or more
          of the units from your army that are within Engagement Range of it are Battle-shocked.
          On a 4+, that enemy unit has been successfully delayed.
        </Paragraph>
        <Paragraph>
          <Strong uppercase typed text="Determine Gambit Success:" /> If the number of enemy units that have been
          successfully delayed is greater than or equal to your Distraction target, this Gambit
          is successfully completed and you score 30VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "gambits",
    title: "Emergency Evacuation",
    flavor: "Remaining in this battlezone is folly. Teleportariums are being sanctified and orbital transports are inbound  to exfiltrate what forces remain. Prepare for immediate extraction.",
    body: (
      <>
        <Paragraph>
          <Strong uppercase typed text="Determine Evacuation Target:" /> Your Evacuation<br />
          target will be equal to half the number of units from your army that are on the battlefield
          at the end of the battle (rounding up), including units embarked within <Keyword word="Transport" /> models
          that are on the battlefield. If your Evacuation target is less than 4, it is increased to 4.
          </Paragraph>
        <Paragraph>
        <Strong uppercase typed text="Evacuate Units:" /> At the end of your fifth turn, roll one D6
          for each unit from your army that is wholly within<br />
          6" of the centre of the battlefield, subtracting 1 from the result if that unit is Battle-shocked.
          On a 4+, that unit (and any units embarked within it) are marked<br />
          for evacuation.
        </Paragraph>
        <Paragraph>
        <Strong uppercase typed text="Determine Gambit Success:" /> If the number of your units that are marked for evacuation is greater than<br />
          or equal to your Evacuation target, this Gambit is successfully completed and you score 30VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "gambits",
    title: "Orbital Strike Coordinates",
    flavor: "The battlefield is lost. Triangulate coordinates and transmit them to our orbital assets so that they can unleash their fury and deny the enemy their prize.",
    body: (
      <>
        <Paragraph>
          At the end of your fifth turn, if one or more units from your army that are not Battle-shocked
          are wholly within 9" of a corner of the battlefield, and those units are not withing your own
          deployment zone, roll 2D6.
        </Paragraph>
        <Paragraph>
          Add 1 to the result for every other corner of the battlefield that has one or more units from your<br />
          army wholly within 9" of it (excluding units that are Battle-schocked or within Engagement Range of any enemy units).
        </Paragraph>
        <Paragraph>
          If the final result is 12 or more, this Gambit is successfully completed and you score 30VP.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "gambits",
    title: "Proceed as planned",
    flavor: "Your battle plan is unfolding as you had foreseen, and the time to strike the fatal blow is almost at hand. Stay the course, and victory is all but assured.",
    body: (
      <>
        <Paragraph>
          If you select this Gambit card, you have chosen not to attempt a gambit.
        </Paragraph>
        <Paragraph>
          Until the end of the battle, you continue to score VP from your Primary Mission.
        </Paragraph>
      </>
    )
  },
]

export const leviathanCards: LeviathanCards = {
  deployments: leviathanDeploymentCards,
  missionRules: leviathanMissionRuleCards,
  primaryMissions: leviathanPrimaryMissionCards,
  secondaryMissions: leviathanSecondaryMissionCards,
  gambits: leviathanGambitCards
}