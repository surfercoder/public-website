import Link from "next/link"
import { Mail } from "lucide-react"
import { Github, Linkedin, Instagram } from "@/components/brand-icons"
import { ObfuscatedEmailLink } from "@/components/obfuscated-email"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
      {/* Gradient top border */}
      <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent" />

      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 60%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Link href="/" className="group inline-flex items-center gap-2 text-2xl font-bold">
              <span aria-hidden="true" className="grid place-items-center size-9 rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white shadow-md shadow-[color-mix(in_srgb,var(--brand)_40%,transparent)] transition-transform duration-300 group-hover:rotate-6 font-display text-sm leading-none">
                AC
              </span>
              <span className="bg-gradient-to-r from-white via-white to-[color-mix(in_srgb,var(--brand)_70%,white)] bg-clip-text text-transparent">Agustin Cassani</span>
            </Link>
            <p className="mt-3 text-gray-400 max-w-md leading-relaxed">
              Senior Software Engineer & Technical Leader with 18+ years of experience architecting and delivering
              modern web, mobile, and AI-powered solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/in/agustincassani/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center size-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://github.com/surfercoder/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center size-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="https://www.instagram.com/thesurferdaddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center size-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <ObfuscatedEmailLink
                className="grid place-items-center size-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                ariaLabel="Email"
              >
                <Mail className="size-5" />
              </ObfuscatedEmailLink>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right">© {currentYear} Agustin Cassani. All rights reserved.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-500 text-center md:text-left">
          Crafted with React · Next.js · Tailwind
        </div>
      </div>
    </footer>
  )
}
