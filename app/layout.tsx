import '@mantine/core/styles.css';
import '@/css/global.css'

import RootWrappers from '@/app/RootWrappers'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'


export const metadata = {
  title: "Frodo's Forty-K",
  description: "Slapdash attempt at creating a WH40k companion app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript/>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <RootWrappers>
          {children}
        </RootWrappers>
      </body>
    </html>
  );
}
