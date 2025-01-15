'use client';

import { Button, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import classes from '@/css/ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <div className={classes.buttonContainer}>
      <Button
        aria-label="Toggle Theme"
        variant="outline"
        className={classes.themeToggleButton}
        onClick={() => toggleColorScheme()}
      >
          {colorScheme === "light" ?
            <IconSun />
            :
            <IconMoonStars />
          }
      </Button>
    </div>
  )
}