"use client";

import { WatermarkBanner } from "@crafter/event-kit-react";
import { useCallback, useState } from "react";

interface InstallSectionProps {
	accent: string;
}

export function InstallSection({ accent }: InstallSectionProps) {
	const [copied, setCopied] = useState(false);
	const command = "bun add @crafter/event-kit-core @crafter/event-kit-react";

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText("bun add @crafter/event-kit-core @crafter/event-kit-react");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, []);

	return (
		<section
			style={{
				padding: "80px 24px 40px",
				maxWidth: 700,
				margin: "0 auto",
			}}
		>
			<div style={{ marginBottom: 40, textAlign: "center" }}>
				<h2
					style={{
						fontSize: "clamp(24px, 4vw, 40px)",
						fontWeight: 800,
						letterSpacing: "-0.03em",
						margin: 0,
					}}
				>
					Get started
				</h2>
				<p style={{ color: "#777", fontSize: 14, marginTop: 8 }}>
					Install the SDK and build your event in minutes.
				</p>
			</div>

			<button
				type="button"
				onClick={handleCopy}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					padding: "16px 20px",
					background: "rgba(255,255,255,0.03)",
					border: `1px solid ${copied ? accent : "rgba(255,255,255,0.08)"}`,
					borderRadius: 12,
					cursor: "pointer",
					transition: "border-color 0.3s ease",
				}}
			>
				<code
					style={{
						fontSize: 14,
						color: "#ccc",
						fontFamily: "monospace",
					}}
				>
					<span style={{ color: accent }}>$</span> {command}
				</code>
				<span
					style={{
						fontSize: 12,
						color: copied ? accent : "#666",
						fontFamily: "monospace",
						transition: "color 0.3s ease",
					}}
				>
					{copied ? "copied!" : "copy"}
				</span>
			</button>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 24,
					marginTop: 32,
				}}
			>
				<a
					href="https://github.com/crafter-station/event-kit"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						fontSize: 13,
						color: "#666",
						textDecoration: "none",
						fontFamily: "monospace",
					}}
				>
					GitHub
				</a>
				<a
					href="https://www.npmjs.com/org/crafter"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						fontSize: 13,
						color: "#666",
						textDecoration: "none",
						fontFamily: "monospace",
					}}
				>
					npm
				</a>
			</div>

			<div
				style={{
					marginTop: 64,
					paddingTop: 24,
					borderTop: "1px solid rgba(255,255,255,0.06)",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<WatermarkBanner />
			</div>
		</section>
	);
}
