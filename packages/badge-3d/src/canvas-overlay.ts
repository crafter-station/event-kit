import type { EventIdentity } from "@crafter/event-kit-core";

export interface BadgeOverlayInfo {
	name: string;
	role: string;
	organization: string | null;
	badgeNumber: string;
	accentColor: string;
}

export interface OverlayOptions {
	identity: EventIdentity;
	info: BadgeOverlayInfo;
	backgroundColor?: string;
}

export function drawOverlay(
	ctx: CanvasRenderingContext2D,
	options: OverlayOptions,
	width: number,
	height: number,
) {
	const { identity, info } = options;
	const left = Math.round(width * 0.08);
	const regionW = Math.round(width * 0.4);
	const centerY = height / 2;

	const grad = ctx.createLinearGradient(0, 0, regionW + 80, 0);
	grad.addColorStop(0, "rgba(0,0,0,0.7)");
	grad.addColorStop(0.7, "rgba(0,0,0,0.4)");
	grad.addColorStop(1, "rgba(0,0,0,0)");
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, regionW + 80, height);

	let y = centerY - 160;

	ctx.fillStyle = info.accentColor;
	ctx.font = "bold 14px sans-serif";
	ctx.letterSpacing = "3px";
	ctx.textAlign = "left";
	ctx.fillText(identity.name.toUpperCase(), left, y);
	ctx.letterSpacing = "0px";

	y += 50;
	ctx.fillStyle = "#ffffff";
	ctx.font = "bold 42px sans-serif";
	const headline = identity.tagline ?? `I'M AT ${identity.name.toUpperCase()}`;
	const headlineLines = headline.length > 20 ? [headline.slice(0, 20), headline.slice(20)] : [headline];
	for (const line of headlineLines) {
		ctx.fillText(line, left, y);
		y += 48;
	}

	if (identity.dates) {
		y += 12;
		ctx.fillStyle = "rgba(255,255,255,0.6)";
		ctx.font = "14px sans-serif";
		const start = identity.dates.start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		const end = identity.dates.end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
		ctx.fillText(`${start} - ${end}`, left, y);
	}

	y += 28;
	ctx.strokeStyle = `${info.accentColor}33`;
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(left, y);
	ctx.lineTo(left + regionW - 40, y);
	ctx.stroke();

	y += 36;
	ctx.fillStyle = info.accentColor;
	ctx.font = "bold 28px sans-serif";
	ctx.fillText(info.name.toUpperCase(), left, y);

	y += 28;
	ctx.fillStyle = "rgba(255,255,255,0.8)";
	ctx.font = "bold 14px sans-serif";
	ctx.letterSpacing = "2px";
	ctx.fillText(info.role.toUpperCase(), left, y);
	ctx.letterSpacing = "0px";

	if (info.organization) {
		y += 22;
		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.font = "14px sans-serif";
		ctx.fillText(info.organization, left, y);
	}

	y += 36;
	ctx.fillStyle = "rgba(255,255,255,0.2)";
	ctx.font = "12px monospace";
	ctx.letterSpacing = "3px";
	ctx.fillText(`#${info.badgeNumber}`, left, y);
	ctx.letterSpacing = "0px";

	if (identity.watermark?.enabled) {
		y += 28;
		ctx.fillStyle = "rgba(255,255,255,0.3)";
		ctx.font = "12px sans-serif";
		ctx.letterSpacing = "2px";
		ctx.fillText(identity.watermark.text, left, y);
		ctx.letterSpacing = "0px";
	}
}

export function takeScreenshot(options: OverlayOptions): boolean {
	const threeCanvas = document.querySelector("canvas");
	if (!threeCanvas) return false;

	const bgColor = options.backgroundColor ?? options.identity.brand.colors.background;
	const w = threeCanvas.width;
	const h = threeCanvas.height;
	const composite = document.createElement("canvas");
	composite.width = w;
	composite.height = h;
	const ctx = composite.getContext("2d")!;

	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, w, h);
	ctx.drawImage(threeCanvas, 0, 0, w, h);
	drawOverlay(ctx, options, w, h);

	const fileName = `${options.identity.slug}-badge.png`;

	composite.toBlob(async (blob) => {
		if (!blob) return;

		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if (isMobile && navigator.canShare) {
			const file = new File([blob], fileName, { type: "image/png" });
			if (navigator.canShare({ files: [file] })) {
				try {
					await navigator.share({ files: [file] });
					return;
				} catch {
					// fall through to download
				}
			}
		}

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, "image/png");

	return true;
}
