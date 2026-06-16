"use client"

import React, { useCallback, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "article"
  y?: number
}

function Reveal({ children, delay = 0, className = "", as = "div", y = 18 }: RevealProps) {
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined")

  const refCallback = useCallback((el: HTMLElement | null) => {
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = as as React.ElementType
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  }
  if (!visible) style.willChange = "opacity, transform"

  return (
    <Tag ref={refCallback as React.Ref<HTMLElement>} className={className} style={style}>
      {children}
    </Tag>
  )
}

export default Reveal
