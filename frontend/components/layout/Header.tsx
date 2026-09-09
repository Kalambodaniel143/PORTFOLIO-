"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:text-accent"
        >
          {site.shortName}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base transition-colors",
                  isActive(item.href)
                    ? "bg-surface-muted text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
