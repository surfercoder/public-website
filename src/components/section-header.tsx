import React from "react"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
}

function SectionHeader({ eyebrow, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center mb-16" : "mb-16"}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] mb-5">
          <span className="size-1.5 rounded-full bg-[var(--brand)] animate-ping-soft" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
        {title.split(" ").map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={`${word}-${i}`} className="gradient-text"> {word}</span>
          ) : (
            <span key={`${word}-${i}`}>{i === 0 ? "" : " "}{word}</span>
          )
        )}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base md:text-lg text-muted-foreground max-w-2xl text-pretty ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default React.memo(SectionHeader)
