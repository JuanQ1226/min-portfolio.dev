"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <Switch
      size="lg"
      color="primary"
      isSelected={isDark}
      onValueChange={(isSelected) => {
        setTheme(isSelected ? "dark" : "light");
      }}
      startContent={<SunIcon className="w-4 h-4" />}
      endContent={<MoonIcon className="w-4 h-4" />}
    />
  );
}
