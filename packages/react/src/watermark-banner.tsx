"use client";

import { useEventKit } from "./context";

export interface WatermarkBannerProps {
	className?: string;
	style?: React.CSSProperties;
}

export function WatermarkBanner({ className, style }: WatermarkBannerProps) {
	const identity = useEventKit();
	const watermark = identity.watermark;

	if (!watermark?.enabled) return null;

	return (
		<a
			href={watermark.url}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 4,
				fontSize: 12,
				opacity: 0.5,
				textDecoration: "none",
				color: "inherit",
				letterSpacing: "0.05em",
				...style,
			}}
		>
			{watermark.text}
		</a>
	);
}
