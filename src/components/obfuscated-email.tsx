"use client"

import { useSyncExternalStore, type ReactNode } from "react"

// Email stored as character codes to prevent bot scraping from static HTML
// User part: agustinscassani
const _u = [97, 103, 117, 115, 116, 105, 110, 115, 99, 97, 115, 115, 97, 110, 105]
// Domain part: gmail.com
const _d = [103, 109, 97, 105, 108, 46, 99, 111, 109]

function decodeEmail(): string {
  return String.fromCharCode(..._u) + "@" + String.fromCharCode(..._d)
}

function emptySubscribe() {
  return () => {}
}

function getEmail() {
  return decodeEmail()
}

/* istanbul ignore next -- server snapshot for SSR */
function getEmailServer() {
  return ""
}

export function ObfuscatedEmailLink({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  const email = useSyncExternalStore(emptySubscribe, getEmail, getEmailServer)

  return (
    <a href={email ? `mailto:${email}` : undefined} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  )
}

export function ObfuscatedEmailText({ className }: { className?: string }) {
  const email = useSyncExternalStore(emptySubscribe, getEmail, getEmailServer)

  if (!email) {
    return <span className={className} />
  }

  return <span className={className}>{email}</span>
}
