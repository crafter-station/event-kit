"use client";

import { HeroSection } from "@/components/hero-section";
import { InstallSection } from "@/components/install-section";
import { PresetsSection } from "@/components/presets-section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TryItSection } from "@/components/try-it-section";
import { THEMES } from "@/lib/identity";
import { EventKitProvider } from "@crafter/event-kit-react";
import { useState } from "react";

export default function DemoPage() {
	const [themeId, setThemeId] = useState("crafter");
	const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
	const { identity } = theme;

	return (
		<EventKitProvider identity={identity}>
			<div
				style={{
					minHeight: "100vh",
					background: identity.brand.colors.background,
					color: identity.brand.colors.text,
					fontFamily: identity.brand.fonts.body.family,
					transition: "background 0.4s ease, color 0.4s ease",
				}}
			>
				<nav
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						zIndex: 50,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "12px 24px",
						background: `${identity.brand.colors.background}cc`,
						backdropFilter: "blur(12px)",
						borderBottom: "1px solid rgba(255,255,255,0.04)",
					}}
				>
					<span
						style={{
							fontSize: 12,
							fontWeight: 600,
							letterSpacing: "0.15em",
							color: identity.brand.colors.primary,
							fontFamily: "monospace",
							transition: "color 0.4s ease",
						}}
					>
						event-kit
					</span>
					<ThemeSwitcher themes={THEMES} activeId={themeId} onChange={setThemeId} />
				</nav>

				<HeroSection
					accent={identity.brand.colors.primary}
					secondary={identity.brand.colors.secondary}
					roles={identity.roles}
				/>

				<TryItSection accent={identity.brand.colors.primary} />

				<PresetsSection accent={identity.brand.colors.primary} />

				<InstallSection accent={identity.brand.colors.primary} />
			</div>
		</EventKitProvider>
	);
}
