import { MissionCard } from "@/app/cards/(all_cards)/leviathan/leviathan_cards"
import Card from "@/components/Cards/Card"
import CardViewer from "@/components/Cards/CardViewer"
import { Suspense } from "react"

export default function CardList({ keyName, cards, variant } : { keyName: string, cards: Array<MissionCard>, variant?: "Attacker" | "Defender" | null | undefined }) {
  return (
    <div key={keyName} style={{ display: 'flex', flexDirection: 'row' }}>
      {cards.map((card: MissionCard) =>
        <>
          <CardViewer>
            <Suspense fallback={<div>Hello!</div>}>
              <Card card={card} variant={variant} />
            </Suspense>
          </CardViewer>
        </>
      )}
    </div>
  )
}