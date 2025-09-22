export function getInitialSection(pathname: string, hash: string, sections: string[]): string {
  if (pathname === "/resume") return "resume";
  if (pathname === "/") {
    const cleaned = (hash || "").replace(/^#/, "");
    if (cleaned && sections.includes(cleaned)) return cleaned;
    return "home";
  }
  return "home";
}
