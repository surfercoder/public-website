"use client"

import React, { useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

function SpotlightCard({ children, className, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn("spotlight group relative", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default SpotlightCard
