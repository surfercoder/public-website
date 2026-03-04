"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

function emptySubscribe() {
  return () => {}
}

function getMounted() {
  return true
}

/* istanbul ignore next -- server snapshot for SSR */
function getMountedServer() {
  return false
}

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, getMounted, getMountedServer)

  const isDark = (theme ?? resolvedTheme) === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full text-gray-700 dark:text-gray-200"
    >
      {/* Sun is the default/SSR fallback; Moon shown only when mounted and dark */}
      {mounted && isDark ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
