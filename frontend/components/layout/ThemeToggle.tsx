"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggle = () => {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
    >
      {/* Icons swap purely via CSS so there is no hydration flash. */}
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
      <MoonIcon className="block h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}
