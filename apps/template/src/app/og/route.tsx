import { event } from "@/lib/event";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const title = searchParams.get("title") ?? event.name;
	const subtitle = searchParams.get("subtitle") ?? event.tagline;

	const { primary, secondary, background } = event.brand.colors;

	return new ImageResponse(
		<div
			style={{
				width: "1200px",
				height: "630px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: background,
				padding: "60px",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "4px",
					background: `linear-gradient(90deg, ${primary}, ${secondary})`,
				}}
			/>
			<div
				style={{
					position: "absolute",
					bottom: "-200px",
					right: "-200px",
					width: "500px",
					height: "500px",
					borderRadius: "50%",
					background: `radial-gradient(circle, ${primary}22 0%, transparent 70%)`,
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: "-150px",
					left: "-150px",
					width: "400px",
					height: "400px",
					borderRadius: "50%",
					background: `radial-gradient(circle, ${secondary}18 0%, transparent 70%)`,
				}}
			/>

			<span
				style={{
					fontSize: "18px",
					fontWeight: 600,
					color: primary,
					letterSpacing: "0.1em",
					textTransform: "uppercase",
				}}
			>
				{event.name}
			</span>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",
				}}
			>
				<span
					style={{
						fontSize: "72px",
						fontWeight: 800,
						color: "#FFFFFF",
						lineHeight: 1.1,
						letterSpacing: "-0.02em",
					}}
				>
					{title}
				</span>
				<span
					style={{
						fontSize: "28px",
						fontWeight: 400,
						color: "#AAAAAA",
						lineHeight: 1.4,
					}}
				>
					{subtitle}
				</span>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<span
					style={{
						fontSize: "14px",
						color: "#555555",
						letterSpacing: "0.05em",
					}}
				>
					Powered by event-sdk
				</span>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
