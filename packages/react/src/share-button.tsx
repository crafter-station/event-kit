"use client";

import { type ReactNode, useCallback } from "react";
import { useEventKit } from "./context";

export interface ShareButtonProps {
	platform: "twitter" | "linkedin" | "clipboard" | "download" | "native";
	url?: string;
	text?: string;
	hashtags?: string[];
	fileName?: string;
	blob?: Blob | null;
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

export function ShareButton({
	platform,
	url,
	text,
	hashtags,
	fileName,
	blob,
	children,
	className,
	onClick,
}: ShareButtonProps) {
	const identity = useEventKit();
	const shareText = text ?? `Check out my badge for ${identity.name}!`;
	const shareUrl = url ?? "";

	const handleClick = useCallback(async () => {
		onClick?.();

		switch (platform) {
			case "twitter": {
				const params = new URLSearchParams({
					text: shareText,
					url: shareUrl,
				});
				if (hashtags?.length) {
					params.set("hashtags", hashtags.join(","));
				}
				window.open(`https://twitter.com/intent/tweet?${params.toString()}`, "_blank");
				break;
			}
			case "linkedin": {
				const params = new URLSearchParams({
					url: shareUrl,
				});
				window.open(
					`https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`,
					"_blank",
				);
				break;
			}
			case "clipboard": {
				await navigator.clipboard.writeText(shareUrl || shareText);
				break;
			}
			case "download": {
				if (!blob) return;
				const blobUrl = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = blobUrl;
				a.download = fileName ?? `${identity.slug}-badge.png`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(blobUrl);
				break;
			}
			case "native": {
				if (!navigator.canShare) return;
				const shareData: ShareData = {
					title: identity.name,
					text: shareText,
					url: shareUrl,
				};
				if (blob) {
					const file = new File([blob], fileName ?? `${identity.slug}-badge.png`, {
						type: blob.type,
					});
					if (navigator.canShare({ files: [file] })) {
						shareData.files = [file];
					}
				}
				try {
					await navigator.share(shareData);
				} catch {}
				break;
			}
		}
	}, [platform, shareText, shareUrl, hashtags, blob, fileName, identity, onClick]);

	return (
		<button type="button" className={className} onClick={handleClick}>
			{children}
		</button>
	);
}
