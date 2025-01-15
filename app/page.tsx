import Link from "next/link"
import { Button, Title } from "@mantine/core"

export default function HomePage() {
  return (
    <div style={{ width: '100%', height: 'calc(var(--mantine-scrollarea-height) - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', color: 'light-dark(var(--mantine-primary-color-9), var(--mantine-primary-color-1))' }}>
        <Title order={1} size="48pt">
          Welcome
        </Title>
        <Title order={3} size="22pt">
          Frodo's Warhammer 40K App
        </Title>
        < br/>
        <p>
          It's very much still a work in progress, there will be more to come.<br />
          Right now, all you can do is look at the<br /><br />
          <Link href="/cards/leviathan">
            <Button size="xl">
              Leviathan Mission Deck
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
