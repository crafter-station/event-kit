"use client";

import type { ThemeConfig } from "@/lib/identity";

interface ThemeSwitcherProps {
	themes: ThemeConfig[];
	activeId: string;
	onChange: (id: string) => void;
}

export function ThemeSwitcher({ themes, activeId, onChange }: ThemeSwitcherProps) {
	return (
		<div style={{ display: "flex", gap: 6 }}>
			{themes.map((t) => (
				<button
					key={t.id}
					type="button"
					onClick={() => onChange(t.id)}
					aria-label={t.label}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "6px 12px",
						background: activeId === t.id ? "rgba(255,255,255,0.1)" : "transparent",
						border: `1px solid ${activeId === t.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
						borderRadius: 999,
						cursor: "pointer",
						transition: "all 0.3s ease",
					}}
				>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: "50%",
							background: t.dotColor,
							boxShadow: activeId === t.id ? `0 0 8px ${t.dotColor}` : "none",
							transition: "box-shadow 0.3s ease",
						}}
					/>
					<span
						style={{
							fontSize: 11,
							fontWeight: 500,
							color: activeId === t.id ? "#fff" : "#666",
							fontFamily: "monospace",
							transition: "color 0.3s ease",
						}}
					>
						{t.label}
					</span>
				</button>
			))}
		</div>
	);
}
