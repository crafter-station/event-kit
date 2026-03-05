"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { EventStyle } from "@event-sdk/core";
import { event } from "@/lib/event";
import type { ThemeDefinition } from "./types";
import { analogTheme } from "./analog";
import { retroTheme } from "./retro";
import { brutalTheme } from "./brutal";

const THEMES: Record<string, ThemeDefinition> = {
	analog: analogTheme,
	retro: retroTheme,
	brutal: brutalTheme,
};

interface ThemeStyleContextValue {
	theme: ThemeDefinition;
	styleId: EventStyle;
	setStyleId: (id: EventStyle) => void;
	iconWeight: "regular" | "bold" | "fill";
}

const ThemeStyleContext = createContext<ThemeStyleContextValue | null>(null);

export function ThemeStyleProvider({ children }: { children: React.ReactNode }) {
	const { resolvedTheme } = useTheme();
	const [styleId, setStyleIdState] = useState<EventStyle>(() => {
		return (event.style as EventStyle) || "analog";
	});

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const urlStyle = params.get("style") as EventStyle | null;
		if (urlStyle && THEMES[urlStyle]) {
			setStyleIdState(urlStyle);
			return;
		}
		const saved = localStorage.getItem("event-sdk-style") as EventStyle | null;
		if (saved && THEMES[saved]) {
			setStyleIdState(saved);
		}
	}, []);

	const setStyleId = useCallback((id: EventStyle) => {
		setStyleIdState(id);
		localStorage.setItem("event-sdk-style", id);
	}, []);

	const theme = THEMES[styleId] || analogTheme;
	const mode = resolvedTheme === "light" ? "light" : "dark";

	useEffect(() => {
		const root = document.documentElement;
		const tokens = theme.tokens[mode];
		for (const [key, value] of Object.entries(tokens)) {
			root.style.setProperty(key, value);
		}
		root.style.setProperty("--font-display", theme.fontDisplayVar);
		root.style.setProperty("--radius", theme.borderRadius);
	}, [theme, mode]);

	return (
		<ThemeStyleContext.Provider
			value={{ theme, styleId, setStyleId, iconWeight: theme.iconWeight }}
		>
			{children}
		</ThemeStyleContext.Provider>
	);
}

export function useThemeStyle() {
	const ctx = useContext(ThemeStyleContext);
	if (!ctx) throw new Error("useThemeStyle must be used within ThemeStyleProvider");
	return ctx;
}
