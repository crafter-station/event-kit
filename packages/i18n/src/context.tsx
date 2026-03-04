"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { en, type Translations } from "./en";
import { es } from "./es";

export type Locale = "en" | "es";

const dictionaries: Record<Locale, Translations> = { en, es };

type I18nContextValue = {
  t: Translations;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("locale") as Locale | null)
        : null;
    if (stored && (stored === "en" || stored === "es")) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  return (
    <I18nContext
      value={{ t: dictionaries[locale], locale, setLocale, toggleLocale }}
    >
      {children}
    </I18nContext>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
