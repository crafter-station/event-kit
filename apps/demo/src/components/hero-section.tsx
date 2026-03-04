"use client";

import { TEAM } from "@/lib/identity";
import { BadgeCard } from "@crafter/event-kit-react";

interface HeroSectionProps {
	accent: string;
	secondary: string;
	roles: { id: string; displayName: string }[];
}

export function HeroSection({ accent, secondary, roles }: HeroSectionProps) {
	return (
		<section
			style={{
				minHeight: "100dvh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				position: "relative",
				padding: "80px 24px 40px",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					background: `radial-gradient(ellipse at 50% 40%, ${accent}08 0%, transparent 70%)`,
					pointerEvents: "none",
				}}
			/>

			<div style={{ position: "relative", textAlign: "center", marginBottom: 48 }}>
				<div
					className="fade-in"
					style={{
						fontSize: 11,
						letterSpacing: "0.25em",
						color: accent,
						fontWeight: 600,
						marginBottom: 12,
						fontFamily: "monospace",
					}}
				>
					@CRAFTER/EVENT-KIT
				</div>
				<h1
					className="fade-in fade-in-1"
					style={{
						fontSize: "clamp(32px, 6vw, 64px)",
						fontWeight: 800,
						letterSpacing: "-0.04em",
						lineHeight: 1,
						margin: 0,
					}}
				>
					Hackathon SDK
				</h1>
				<p
					className="fade-in fade-in-2"
					style={{
						color: "#777",
						fontSize: 16,
						marginTop: 12,
						maxWidth: 420,
						marginInline: "auto",
					}}
				>
					Badges, onboarding, and social assets for tech events. One SDK, every event.
				</p>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
					gap: 20,
					maxWidth: 1100,
					width: "100%",
					position: "relative",
				}}
			>
				{TEAM.map((member, i) => (
					<div key={member.name} className={`fade-in fade-in-${i + 1}`}>
						<BadgeCard
							name={member.name}
							role={roles[member.role % roles.length]?.displayName ?? "Attendee"}
							organization="Crafter Station"
							badgeNumber={String(i + 1).padStart(3, "0")}
							photoUrl={member.photo}
							particleColors={[accent, secondary]}
							style={{
								width: "100%",
								maxWidth: 280,
								margin: "0 auto",
								boxShadow: `0 0 60px ${accent}08`,
								transition: "box-shadow 0.4s ease",
							}}
						/>
					</div>
				))}
			</div>

			<div
				className="fade-in fade-in-4"
				style={{
					marginTop: 48,
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					justifyContent: "center",
				}}
			>
				<span
					style={{
						padding: "4px 12px",
						background: `${accent}15`,
						border: `1px solid ${accent}30`,
						borderRadius: 999,
						fontSize: 12,
						color: accent,
					}}
				>
					v0.0.1
				</span>
				<span
					style={{
						padding: "4px 12px",
						background: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.08)",
						borderRadius: 999,
						fontSize: 12,
						color: "#888",
					}}
				>
					4 packages
				</span>
			</div>
		</section>
	);
}
