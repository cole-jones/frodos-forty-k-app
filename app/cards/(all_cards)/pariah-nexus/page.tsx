import Link from "next/link"
import { Button } from "@mantine/core"

export default async function PariahNexusCardShowcase(): Promise<React.ReactNode> {
  return (
    <>
    <div style={{ height: 'var(--app-body)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '36pt', fontFamily: 'Conduit ITC Bold', color: 'light-dark(var(--mantine-primary-color-9), var(--mantine-primary-color-1))' }}>
      This page is currently under construction
      <Link href="/cards/">
        <Button size="xl">
          Go Back
        </Button>
      </Link>
    </div>
  </>
  )
}