import { type MissionCard } from '@/components/Cards/MissionDeck'
import {
  List,
  Strong,
  Keyword,
  Separator,
  Paragraph,
  PointsParagraph,
  Header,
  Action,
  MissionRuleTable,
} from "@/components/Cards/MissionDeckComponents"

export interface PariahNexusCards {
  deployments: Array<MissionCard>
  missionRules: Array<MissionCard>
  primaryMissions: Array<MissionCard>
  secondaryMissions: Array<MissionCard>
  secretMissions: Array<MissionCard>
}

const pariahNexusDeploymentCards: Array<MissionCard> = [
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
  {
    isFixed: false,
    section: "deployments",
    title: "Tipping Point",
    flavor: "",
    body: null
  },
]

const pariahNexusMissionRuleCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "missionRules",
    title: "Adapt or Die",
    flavor: "On this changing battlefield, only a commander who can adapt their strategy swiftly and decisively stands any chance of seizing victory.",
    body: (
      <>
        <Header
          pariahNexus
          text="For players using fixed missions"
        />
        <Paragraph small squished>
          Once per battle, at the end of that player's turn, after scoring any VP, they can discard
          one of their Secondary Mission cards and replace it with another Secondary Mission card
          that has the Fixed Mission symbol.
        </Paragraph>
        
        <Header
          lessTopMargin
          pariahNexus
          text="For players using tactical missions"
        />
        <Paragraph small squished>
          Twice per battle, after drawing a Secondary Mission card, that player can draw another
          Secondary Mission card, then shuffle one of those two Secondary Mission cards back into
          their Secondary Mission deck.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Fog of War",
    flavor: "Due to strange atmospheric conditions or supernatural phenomena, confusion abounds. Enemy positions are unknown, and you dare not commit your resources blindly.",
    body: (
      <>
        <Paragraph small>
          In the first battle round, units have the Benefit of Cover,<br />
          and players cannot use Core Stratagems (excluding the<br />
          New Orders Strategem).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Hidden Supplies",
    flavor: "Reconnaissance units have uncovered a hidden cache of ammunition, fuel and rations in this war zone.",
    body: (
      <>
        <Paragraph small>
          <Strong text="When Drawn: " />
          If you also drew The Ritual Primary Mission card,
          discard this Mission Rule card and draw a new Mission Rule card.
        </Paragraph>
        <Paragraph small>
          In the Place Objective Markers step, players must set up one additional objective
          marker in No Man's Land.
        </Paragraph>
        <Paragraph small>
          Before setting up this new objective marker, players must first move the objective marker
          in the centre of the battlefield 6" directly towards one of the corners of the battlefield 
          (if No Man's Land touches any of the corners of the battlefield, you must move the objective
          marker towards one of those corners). Players must then set up the new objective marker 6"
          from the centre of the battlefield towards the diagonally opposite corner of the battlefield
          to the previously moved objective marker.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Inspired Leadership",
    flavor: "Few sights set such an inspiring example upon the battlefield than a commander leading from the very front, wreathed in glory and stained with gore.",
    body: (
      <>
        <Paragraph small>
          While a player's <Keyword word="Warlord" /> is not within their deployment<br />
          zone, each time a unit from that player's army takes a<br />
          Battle-shock test, if that player's <Keyword word="Warlord" /> is within 9" of
          and visible to that unit, add 1 to that test.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Prepared Positions",
    flavor: "This is a battle long in the offing, a fight for which both commanders have had ample time to prepare both their warriors and their defences.",
    body: (
      <>
        <Paragraph small>
          Players can target their <Keyword word="Battleline" /> units with the Go to Ground
          and Heroic Intervention Stratagems for 0CP (but cannot do so if they have already
          used that Stratagem on a different unit that turn).
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Raise Banners",
    flavor: "It is not enough this day simply to defeat the foe. Instead you must raise your banners high, announcing your conquests to all who witness them.",
    body: (
      <>
        <Paragraph small>
          At the end of each palyer's turn, if a <Keyword word="Battleline" />
          unit from their army is within range of an objective marker that player controls, that unit
          raises a banner on that objective marker: that player scores <strong>1VP</strong> (which is
          counted towards their Secondary Mission score), and that player's units can no longer raise
          a banner on that objective marker.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Rapid Escalation",
    flavor: "Armies hurl themselves recklessly into what is swiftly becoming a maelstrom of battle. With every passing moment, the flames of conflict rage higher.",
    body: (
      <>
        <Paragraph small>
          In the first battle round, each player can set up <Keyword word="Battleline" />
          units from Strategic Reserves in the Reinforcements step of their Movement phase.
          If they do, those units must be set up wholly within 6" of any battlefield edge,
          but no model in those units can be set up within the enemy deployment zone.
        </Paragraph>
        <Paragraph small>
          The points total of the units a player can set up in this way cannot exceed 10%
          of their total points limit for the chosen battle size, as shown below.
        </Paragraph>

        <MissionRuleTable
          headers={["BATTLE SIZE", "MAXIMUM POINTS TOTAL\nOF STRATEGIC RESERVES UNITS"]}
          rows={[
            ["Incursion", "100 pts"],
            ["Strike Force", "200 pts"],
            ["Onslaught", "300 pts"],
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Smoke And Mirrors",
    flavor: "Be it through technological trickery, sorcerous illusion or  sheer  cunning, both commanders seek to outfox and outmanoeuvre the other.",
    body: (
      <>
        <Paragraph small>
          After both players have deployed their armies, starting with the Attacker, each player
          can place one unit from their army that is on the battlefield into Strategic Reserves,
          regardless of how many units are already in strategic reserves.
        </Paragraph>
        <Paragraph small>
          The points value of such a unit cannot exceed 25% of each player's total points
          limit for the chose battle size, as<br />
          shown below.
        </Paragraph>

        <MissionRuleTable
          headers={["BATTLE SIZE", "MAXIMUM POINTS VALUE OF UNIT"]}
          rows={[
            ["Incursion", "250 pts"],
            ["Strike Force", "500 pts"],
            ["Onslaught", "750 pts"],
          ]}
        />
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Stalwarts",
    flavor: "This is not a time for gilded glory, but instead it is the hour when the mud-splattered, blood-drenched rank and file step forward and prove their worth.",
    body: (
      <>
        <Paragraph small>
          <Keyword word="Battleline" /> units that perform an Action are still eligible
          to shoot in that turn (but cannot start to perform another Action in that turn), and
          <Keyword word="Battleline" /> units can perform Actions while within
          Engagement Range of one or more enemy units.
        </Paragraph>
      </>
    )
  },
  {
    isFixed: false,
    section: "missionRules",
    title: "Swift Action",
    flavor: "Time is running out. Cataclysm approaches on an unimaginable scale. In the face of such terrors, every warrior fights with the speed and fury of desperation.",
    body: (
      <>
        <Paragraph small>
          <Keyword word="Battleline" />
          units that Advance or Fall Back are still eligible to perform an Action in that turn.
        </Paragraph>
      </>
    )
  },
]

const pariahNexusPrimaryMissionCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Burden of Trust",
    flavor: "The strategic prizes in this region must be guarded at all costs  – a duty that falls upon a chosen few.",
    body: (
      <>
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores <Strong bold text="4VP" /> for each objective
          marker they control that is not within their deployment<br />
          zone. Then, for each objective marker that player controls, they can select one unit
          from their army (excluding <Keyword word="Aircraft" noRight />) within range of that
          objective marker to <Strong text="guard" /> it until the start of their next turn.
        </Paragraph>
        <Separator pariahNexus />
       
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of each player's turn.
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The opponent of the player whose turn it is scores <Strong bold text="2VP" /><br />
          for each of their units (excluding Battle-shocked units)<br />
          that are within range of and <Strong bold text="guarding" /> an objective marker they control.
        </Paragraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Linchpin",
    flavor: "True victory is built upon a firm foundation. If the centre cannot  hold then all else swiftly crumbles.",
    body: (
      <>
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          If the player whose turn it is does not control the objective marker in their
          deployment zone, they score <Strong bold text="3VP" /> for each objective marker they control.
        </Paragraph>
        <Header or />
        <Paragraph extraSmall tight extraSquished>
          If the player whose turn it is controls the objective marker<br />
          in their deployment zone, they score <Strong bold text="3VP" /> for controlling<br />
          that objective marker, and <Strong bold text="5VP" /> for each other objective marker they control.
        </Paragraph>
        <Separator pariahNexus />
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
        <Header pariahNexus text="Any Battle Round" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the battle round.
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          Each player scores <Strong bold text="4VP" /> if one or more
          enemy units were destroyed this battle round.
        </Paragraph>
        <Separator pariahNexus />
        
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the battle round.
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          Each player scores <Strong bold text="4VP" /> if more enemy units
          than friendly units were destroyed this battle round.
        </Paragraph>
        <Separator pariahNexus />
        
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores <Strong bold text="4VP" /> if they control<br />
          one or more objective markers, and an additional<br />
          <Strong bold text="4VP" /> if they control more objective markers than their opponent controls.
        </Paragraph>
        <Separator pariahNexus />
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
        <Action
          text="Burn Objective"
          starts={<>Your Shooting phase, from the second battle<br /> round onwards.</>}
          units={<>One unit from your army within range of an objective marker that is not within your deployment zone.</>}
          completes={<>End of your opponent's next turn or the end of the battle (whichever comes first), if your unit is still within range of the same objective marker and you control that objective marker.</>}
          ifCompleted={<>That objective marker is <Strong bold text="burned" /> and<br />removed from the battlefield.</>}
        />
        
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          Any time.
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          Each time the player whose turn it is <Strong bold text="burns" /> an objective marker,
          that player scores <Strong bold text="5VP" /> if that objective marker was<br />
          in No Man's Land, or <Strong bold text="10VP" /> instead if that objective marker was
          in their opponent's deployment zone.
        </Paragraph>
        <Separator pariahNexus />

        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores <Strong bold text="5VP" /> for each objective
          marker they control (up to <Strong bold text="10VP" /> per turn).
        </Paragraph>
        <Separator pariahNexus />
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
        <Paragraph extraSmall>
          <Strong text="Start of Battle: " />
          Players randomly select two different<br />
          objective markers in No Man's Land; the first selected is the
          Alpha objective, the second selected is the Omega objective.
        </Paragraph>
        <Paragraph extraSmall>
          <Strong text="Start of the Fourth Battle Round: " />
          The Alpha objective is removed from the battlefield.
        </Paragraph>
        <Paragraph extraSmall>
          <Strong text="Start of the Fifth Battle Round: " />
          All objective markers in No Man's Land apart from the Omega objective
          are removed from the battlefield.
        </Paragraph>

        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores the following VP for<br />
          each objective marker in No Man's Land that they control,
          depending on the current battle round:
        </Paragraph>
        <List
          extraSmall
          tight
          items={[
            <><Strong bold text="5VP" /> in the second and third battle rounds.</>,
            <><Strong bold text="8VP" /> in the fourth battle round.</>,
            <><Strong bold text="15VP" /> in the fifth battle round.</>,
          ]}
        />
        <Separator pariahNexus />
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
        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores <Strong text="5VP" /> for each objective
          marker they control (up to <Strong text="15VP" /> per turn).
        </Paragraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Terraform",
    flavor: "Victory here lies in dominating not only the foe, but also the landscape of the battlefield itself.",
    body: (
      <>
        <Action
          text="Terraform"
          starts={<>Your Shooting phase.</>}
          units={<>One or more units from your army, each within<br />range of a different objective marker that is not within your deployment zone and has not been <Strong text="terraformed" />.</>}
          completes={<>End of your opponent's next turn or the end of the battle (whichever comes first), if the unit performing this Action is still within range of the same objective marker and you control that objective marker.</>}
          ifCompleted={<>Each of those objective markers<br />is <Strong bold text="terraformed" />.</>}
        />

        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores VP as follows (up
          to <Strong bold text="15VP" /> per turn):
        </Paragraph>
        <List
          extraSmall
          tight
          items={[
            <><Strong bold text="4VP" /> for each objective marker they control.</>,
            <><Strong bold text="2VP" /> for each objective marker they have <Strong bold text="terraformed"/> during the battle.</>,
          ]}
        />
        <Paragraph extraSmall tight squished>
          <Strong bold text="Note: " />
          The above VP are cumulative, so a player who controls one objective marker that they
          have also <Strong bold text="terraformed" /> will score 6VP that turn.
        </Paragraph>
        <Separator pariahNexus squished />
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
          in No Man's Land except the once closest to the center of<br />
          the battlefield.
        </Paragraph>
        <Action
          lessTopMargin
          text="The Ritual"
          starts={<>Your Shooting phase.</>}
          units={<>One unit from your army.</>}
          completes={<>End of your turn.</>}
          ifCompleted={
            <>
              Set up one objective marker anywhere on<br />
              the battlefield wholly within No Man's Land and within 1"<br />
              of your unit, provided it can be set up exactly 12" from one other objective
              marker within No Man's Land and not within 6" of any other objective marker.
            </>
          }
        />

        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the Command phase (or the end of your turn<br />
          if it is the fifth battle round and you are going second).
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores <Strong bold text="5VP" /> for each objective
          marker in No Man's Land that they control (up to <Strong bold text="15VP" /><br />
          per turn).
        </Paragraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "primaryMissions",
    title: "Unexploded Ordnance",
    flavor: "Volatile undetonated material lies in your path. Shifting such hazards towards enemy territory could be the key to victory.",
    body: (
      <>
        <Paragraph extraSmall>
          The objective markers that start the battle in No Man's Land are Hazard objective markers.
        </Paragraph>
        <Action
          lessTopMargin
          text="Move Hazard"
          starts={<>Your Shooting phase.</>}
          units={<>One or more units from your army, each within range of a different Hazard objective marker you control.</>}
          completes={<>End of your turn, if the unit performing this Action is still within range of the same Hazard objective marker and you control that objective marker.</>}
          ifCompleted={
            <>
              You can move each of those Hazard objective markers up to 6".
              When doing so, that objective marker cannot end that move on top of any
              other objective marker or model, or inside impassable parts of terrain features.
            </>
          }
        />

        <Header pariahNexus text="Second Battle Round Onwards" />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of each player's turn.
        </Paragraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          The player whose turn it is scores VP as follows:
        </Paragraph>
        <List
          extraSmall
          tight
          items={[
            <><Strong bold text="8VP" /> for each Hazard objective marker that is wholly<br />within their opponent's deployment zone.</>,
            <><Strong bold text="5VP" /> for each other Hazard objective marker that is<br />wholly within 6" of their opponent's deployment zone.</>,
            <><Strong bold text="2VP" /> for each other Hazard objective marker that is<br />wholly within 12" of their opponent's deployment zone.</>,
          ]}
        />
        <Separator pariahNexus />
      </>
    )
  },
]

const pariahNexusSecondaryMissionCards: Array<MissionCard> = [
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Area Denial",
    flavor: "It is critical that this area is dominated. No enemy vanguard or  guerrilla units can be allowed to disrupt our plans.",
    body: (
      <>
        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          One or more units from your army (excluding <Keyword word="Aircraft" />
          and Battle-shocked units) are within 3" of the centre of the battlefield,
          and there are no enemy units within 3" of the centre of the battlefield.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={5}>
          One or more units from your army (excluding <Keyword word="Aircraft" />
          and Battle-shocked units) are within 3" of the centre of the battlefield,
          and there are no enemy units within 6" of the centre of the battlefield.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Assassination",
    flavor: "The enemy look to their champions for courage. Identify and eliminate them with extreme prejudice.",
    body: (
      <>
        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          While this card is active<br />
          (if you are using Fixed Missions).
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph type="fixed" points={4}>
          Each time an enemy <Keyword word="Character" /> model<br />
          is destroyed.
        </PointsParagraph>
        <Separator pariahNexus />

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of either player's turn<br />
          (if you are using Tactical Missions).
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph type="tactical" points={5}>
          One or more enemy <Keyword word="Character" /> units<br />
          were destroyed this turn.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph type="tactical" points={5}>
          All <Keyword word="Character" /> units from your
          opponent's army have been destroyed during<br />
          the battle.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Behind Enemy Lines",
    flavor: "Break through the foe's army and cut off their lines of escape.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If it is the first battle round, you can draw a new Secondary Mission card
          and shuffle this card back into your Secondary Mission deck.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={3}>
          One unit from your army (excluding <Keyword word="Aircraft" />
          and Battle-shocked units)<br />
          is wholly within your opponent's deployment zone.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={4}>
          Two or more units from your army (excluding <Keyword word="Aircraft" />
          and Battle-shocked units) are wholly within your opponent's deployment zone.
        </PointsParagraph>
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Bring it Down",
    flavor: "The opposing army contains numerous heavily armoured units. Take any opportunity to bring them down.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If there are no enemy <Keyword word="Monster" /> or <Keyword word="Vehicle" /> units
          on the battlefield, you can discard this card and draw a new Secondary Mission card.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          While this card is active.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          Each time an enemy <Keyword word="Monster" /> or <Keyword word="Vehicle" />
          unit is destroyed
        </PointsParagraph>
        <Separator pariahNexus />
        <PointsParagraph plus points={2}>
          The total Wounds<br />
          characteristics of the models in<br />
          that destroyed unit was 15+<br />
          (at its Starting Strength).
        </PointsParagraph>
        <Separator pariahNexus />
        <PointsParagraph plus points={2}>
          The total Wounds<br />
          characteristics of the models in<br />
          that destroyed unit was 20+<br />
          (at its Starting Strength).
        </PointsParagraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          <Strong bold text="Note: " />
          The above VP are cumulative, so destroying a<br />
          <Keyword word="Monster" /> or <Keyword word="Vehicle" />
          unit with a combined Wounds characteristic of 20 (at its Starting Strength)
          would award you 6VP.
        </Paragraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Cleanse",
    flavor: "The objectives in this area have been tainted and must be cleansed with ritual and purifying flame.",
    body: (
      <>
        <Action
          text="Cleanse"
          starts={<>Your Shooting phase.</>}
          units={<>One or more units from your army within range of an objective marker that is not within your deployment zone.</>}
          completes={<>End of your turn, if the unit performing this Action is still within range of the same objective marker and you control that objective marker.</>}
          ifCompleted={<>That objective marker is <Strong bold text="cleansed" /> by<br />your army.</>}
        />

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          One objective marker was <Strong bold text="cleansed" /> by<br />
          your army this turn.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={4}>
          Two or more objective markers were <Strong bold text="cleansed" /> by
          your army this turn.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Containment",
    flavor: "By setting up servo-sentries, laying booby traps or demolishing routes of egress, you must trap your foes within the bounds of the battlefield.",
    body: (
      <>
        <Action
          text="Containment"
          starts={<>Your Shooting phase.</>}
          units={
            <>
              One or more units from your army that are wholly within 9" of one or more battlefield edges and not within<br />
              your deployment zone. Select a different one of those battlefield edges for each of those units.
            </>
          }
          completes={<>Immediately.</>}
          ifCompleted={<>Each battlefield edge you selected is <Strong bold text="contained" /> by your army.</>}
        />

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={3} maxPoints={6}>
          For each battlefield edge <Strong bold text="contained" /> by<br />
          your army this turn.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Cull the Horde",
    flavor: "The enemy come forth in teeming masses. Their ranks must be thinned if the day is to be won.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If there are no enemy units on the battlefield<br />
          that satisfy either of the conditions required to achieve this card,
          you can discard this card and draw a new Secondary Mission card.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          While this card is active
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={5}>
          Each time an enemy <Keyword word="Infantry" /> unit is destroyed,
          if one or more of the following conditions are satisfied:

          <List
            items={[
              <>The Starting Strength of the destroyed unit was 20+.</>,
              <>The total Wounds characteristics of the models in the destroyed unit<br />was 25+ (at its Starting Strength).</>,
            ]}
          />
        </PointsParagraph>
        <Separator pariahNexus />
        <Paragraph extraSmall tight extraSquished>
          <Strong text="Note: " />
          For the purposes of the above conditions, models in attacked Leader units are ignored.
        </Paragraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Defend Stronghold",
    flavor: "You are charged with the defense of a key objective. It must not be permitted to fall into enemy hands.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If it is the first battle round, draw a new Secondary Mission card
          and shuffle this card back into your Secondary Mission deck.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your opponent's turn or the<br />
          end of the battle (whichever comes first).
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={3}>
          You control one or more objective markers in your deploment zone.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Engage on all Fronts",
    flavor: "This area is of extreme importance. You are to lead an immediate all-out assault to capture it and deny it to our enemy for good.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If there are fewer than three units from your army on the battlefield,
          you can discard this card and draw a new Secondary Mission card.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          One or more unit from your army (excluding <Keyword word="Aircraft" /> and Battle-shocked
          units) are wholly within three different table quarters, and those units are all<br />
          more than 6" away from the centre of<br />
          the battlefield.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={4}>
        One or more unit from your army (excluding <Keyword word="Aircraft" /> and Battle-shocked
          units) are wholly within four different<br />
          table quarters, and those units are all<br />
          more than 6" away from the centre of<br />
          the battlefield.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Establish Locus",
    flavor: "Whether a teleport homer crackling with arcane energies, a daemonic summoning circle, a pheromonal marker or some other means of guiding forces onto the battlefield, this locus must be set up swiftly to pave the road to victory.",
    body: (
      <>
        <Action
          text="Establish Locus"
          starts={<>Your Shooting phase.</>}
          units={<>One unit from your army.</>}
          completes={<>End of your turn, if that unit is within your opponent's deployment zone or within 6" of the centre of<br />the battlefield.</>}
          ifCompleted={<>Your unit <Strong bold text="establishes a locus" />.</>}
        />

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          Your unit <Strong bold text="established a locus" /> this
          turn and is within 6" of the centre of the battlefield.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={4}>
          Your unit <Strong bold text="established a locus" /> this<br />
          turn and is within your opponent's<br />
          deployment zone.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Extend Battle Lines",
    flavor: "The battleground is conquered one yard at a time. Press forward to establish a strong military presence in the area.",
    body: (
      <>
        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={5}>
          You control one or more objective<br />
          markers within your deployment zone<br />
          and one or more objective markers within No Man's Land.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={2}>
          You only have one unit on the battlefield,
          and that unit controls one objective<br />
          marker within No Man's Land.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Marked for Death",
    flavor: "These specific enemy assets must be eliminated to ensure victory, no matter how insignificant they might seem.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          Your opponment must select three units from their army on the battlefield.
          If there are only one or two units from their army on the battlefield, they must
          select those units. If there are no units from their army on the battlefield,
          discard this card and draw a new Secondary Mission card.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of either player's turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={5}>
          One or more of the selected units<br />
          were destroyed (or removed from the battlefield for any other reason) this turn.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "No Prisoners",
    flavor: "Exterminate your enemies.",
    body: (
      <>
        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          While this card is active.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2} maxPoints={5} minHeight>
          Each time an enemy unit is destroyed.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Overwhelming Force",
    flavor: "Scour the enemy from the face of the battlefield.",
    body: (
      <>
        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          While this card is active.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={3} maxPoints={5}>
          Each time an enemy unit that started the turn withing range
          of an objective marker<br />
          is destroyed.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Recover Assets",
    flavor: "Scattered strategic assets must be swiftly reclaimed.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If there are fewer than two units from your army on the battlefield,
          you can discard this card and draw a new Secondary Mission card.
        </Paragraph>

        <Action
          lessTopMargin
          text="Recover Assets"
          starts={<>Your Shooting phase.</>}
          units={
            <>
              Two or more units from your army, if each of those units is wholly
              within a different one of the following areas: your deployment zone;
              No Man's Land; your opponent's deployment zone.
            </>
          }
          completes={
            <>
              End of your opponent's next turn of the end of the battle (whichever
              comes first), if either two or three of those units are on the battlefield.
            </>
          }
          ifCompleted={<>Those units <Strong bold text="recover assets" />.</>}
        />

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your opponent's turn or the<br />
          end of the battle (whichever comes first).
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={3} noWrap>
          Two of your units <Strong bold text="recovered assets" /> this turn.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={6} noWrap>
          Three of your units <Strong bold text="recovered assets" /> this turn.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Sabotage",
    flavor: "This region is replete with strategic assets or supply caches vital to the fie. See to it that they are reduced to just so much flaming wreckage.",
    body: (
      <>
        <Action
          text="Sabotage"
          starts={<>Your Shooting phase.</>}
          units={<>One unit from your army that is within a terrain feature and not within your deployment zone.</>}
          completes={<>End of your opponent's next turn or the end<br />of the battle (whichever comes first), if your unit is on<br />the battlefield.</>}
          ifCompleted={<>Your unit <Strong bold text="commits sabotage" />.</>}
        />

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your opponent's turn or the<br />
          end of the battle (whichever comes first).
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={3}>
          Your units <Strong bold text="committed sabotage" /> this<br />
          turn and is not within your opponment's deployment zone.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={6}>
          Your units <Strong bold text="committed sabotage" /> this<br />
          turn and is within your opponment's deployment zone.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secondaryMissions",
    title: "Secure No Man's Land",
    flavor: "You must advance swiftly into no man's land and seize it before the enemy can, lest they take control of the entire battlefield.",
    body: (
      <>
        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          You control one objective marker in<br />
          No Man's Land.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={5}>
          You control two or more objective markers in No Man's Land.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: true,
    section: "secondaryMissions",
    title: "Storm Hostile Objective",
    flavor: "Dominate the field of battle. Storm every site of tactical import and leave to foe with no place to hide.",
    body: (
      <>
        <Paragraph extraSmall>
          <Strong text="When Drawn: " />
          If it is the first battle round, you can draw a new Secondary Mission
          card and shuffle this card back into your Secondary Mission deck.
        </Paragraph>

        <Header
          text="Any Battle Round"
          victoryPoints
          pariahNexus
          lessTopMargin
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of your turn.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={2}>
          You control one or more objective markers that were controlled
          by your opponent at the start of the turn.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={5}>
          Your opponent did not control any<br />
          objective markers at the start of the turn, and you control one or more
          objective markers that you did not control at the<br />
          start of the turn.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
]

const pariahNexusSecretMissionCards: Array<MissionCard> = [
  {
    isFixed: true,
    section: "secretMissions",
    title: "Command Insertion",
    flavor: "Sometimes vital tasks cannot be entrusted to underlings. At such times, a commander must lead by example, bloodying their own hands to achieve victory.",
    body: (
      <>
        <Header
          text="Secret Mission"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the battle.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={20}>
          Your <Keyword word="Warlord" /> is within range of one<br />
          or more objective markers in your opponenet's deployment zone that<br />
          you control.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secretMissions",
    title: "Shatter Cohesion",
    flavor: "There is no surer way to prevent your foe securing victory than to utterly destroy their strategic and tactical capabilities.",
    body: (
      <>
        <Header
          text="Secret Mission"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the battle.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={20}>
          There are no units from your opponent's army on the battlefield.
        </PointsParagraph>
        <Header or lessTopMargin />
        <PointsParagraph points={20}>
          Every unit from your opponent's army that is on the battlefield meets one or more
          of the following conditions:

          <List
            extraTopMargin
            items={[
              <>That unit is Battle-shocked.</>,
              <>That unit is Below Half-strength.</>,
              <>That unit is more than 3" away from all objective markers.</>,
            ]}
          />
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secretMissions",
    title: "Unbroken Wall",
    flavor: "Intelligence has revealed a secondary enemy attack incoming. Form a wall of warriors across the battlefield, ready to repel it.",
    body: (
      <>
        <Header
          text="Secret Mission"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the battle.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={20}>
          You control three or more objective<br />
          markers that are not within your deployment zone.
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
  {
    isFixed: false,
    section: "secretMissions",
    title: "War of Attrition",
    flavor: "This is to be a battle of numbers, wherein you must husband your core forces with skill while winnowing those of the foe.",
    body: (
      <>
        <Header
          text="Secret Mission"
          victoryPoints
          pariahNexus
        />
        <Paragraph extraSmall tight extraSquished>
          <Strong typed uppercase text="When: " />
          End of the battle.
        </Paragraph>
        <Separator pariahNexus />
        <PointsParagraph points={20}>
          One or more <Keyword word="Battleline" /> units from your army are
          within your opponent's deployment zone, and one of the following conditions applies:

          <List
            extraTopMargin
            items={[
              <>There are no <Keyword word="Battleline" /> units<br />from your opponent's army on<br />the battlefield.</>,
              <>Every <Keyword word="Battleline" /> unit from your opponent's army that is on the battlefield is within your opponent's deployment zone.</>,
            ]}
          />
        </PointsParagraph>
        <Separator pariahNexus />
      </>
    )
  },
]

export const pariahNexusCards: PariahNexusCards = {
  deployments: pariahNexusDeploymentCards,
  missionRules: pariahNexusMissionRuleCards,
  primaryMissions: pariahNexusPrimaryMissionCards,
  secondaryMissions: pariahNexusSecondaryMissionCards,
  secretMissions: pariahNexusSecretMissionCards
}