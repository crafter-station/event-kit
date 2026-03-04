"use client";

import { HeroSection } from "@/components/hero-section";
import { InstallSection } from "@/components/install-section";
import { PresetsSection } from "@/components/presets-section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TryItSection } from "@/components/try-it-section";
import { THEMES } from "@/lib/identity";
import { getThemeStyles } from "@/lib/theme-styles";
import { EventKitProvider } from "@crafter/event-kit-react";
import { useState } from "react";

export default function DemoPage() {
	const [themeId, setThemeId] = useState("crafter");
	const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
	const { identity } = theme;
	const themeStyles = getThemeStyles(themeId);

	return (
		<EventKitProvider identity={identity}>
			<div
				style={{
					minHeight: "100vh",
					background: identity.brand.colors.background,
					color: identity.brand.colors.text,
					fontFamily: identity.brand.fonts.body.family,
					transition: "background 0.4s ease, color 0.4s ease, font-family 0.4s ease",
					position: "relative",
				}}
			>
				{themeStyles.bgPattern && (
					<div
						style={{
							position: "fixed",
							inset: 0,
							backgroundImage: themeStyles.bgPattern,
							backgroundSize: themeStyles.scanlines ? "6px 6px" : "64px 64px",
							pointerEvents: "none",
							zIndex: 0,
							transition: "opacity 0.4s ease",
						}}
					/>
				)}

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
						borderBottom: `1px solid ${themeId === "sheships" ? "#131414" : "rgba(255,255,255,0.04)"}`,
					}}
				>
					<span
						style={{
							...themeStyles.label,
							color: identity.brand.colors.primary,
							transition: "color 0.4s ease",
						}}
					>
						{themeStyles.cursorBlink && (
							<span className="blink" style={{ marginRight: 4 }}>
								{">_"}
							</span>
						)}
						event-kit
					</span>
					<ThemeSwitcher themes={THEMES} activeId={themeId} onChange={setThemeId} />
				</nav>

				<div style={{ position: "relative", zIndex: 1 }}>
					<HeroSection
						accent={identity.brand.colors.primary}
						secondary={identity.brand.colors.secondary}
						background={identity.brand.colors.background}
						roles={identity.roles}
						themeStyles={themeStyles}
						eventName={identity.name}
						tagline={identity.tagline}
						fontDisplay={identity.brand.fonts.display.family}
					/>

					<TryItSection accent={identity.brand.colors.primary} themeStyles={themeStyles} />

					<PresetsSection accent={identity.brand.colors.primary} themeStyles={themeStyles} />

					<InstallSection accent={identity.brand.colors.primary} themeStyles={themeStyles} />
				</div>
			</div>
		</EventKitProvider>
	);
}
