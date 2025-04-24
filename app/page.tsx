import Link from "next/link"
import Image from "next/image";
import { Button, Title } from "@mantine/core"

export default function HomePage() {
  return (
    <div style={{ width: '100%', height: 'calc(var(--app-body-height) - 100px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', color: 'light-dark(var(--mantine-primary-color-9), var(--mantine-primary-color-1))' }}>
        <Title order={1} size="48pt">
          Welcome
        </Title>
        <Title order={3} size="22pt">
          Frodo's Warhammer 40K App
        </Title>
        <br />
        <Image
          src="/frodo_irl.jpg"
          alt="© Steve Downer, 2018"
          aria-label="© Steve Downer, 2018"
          width={394}
          height={464}
          style={{ borderRadius: 10 }}
        />
        <br /><br />
        <p>
          <Link href="/match/">
            <Button size="xl" style={{ marginRight: 20 }}>
              Play a Match
            </Button>
          </Link>
          <Link href="/cards/">
            <Button size="xl">
              View Mission Decks
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
