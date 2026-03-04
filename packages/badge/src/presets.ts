import type { BadgeStylePreset } from "./types";

export const BADGE_STYLE_PRESETS: BadgeStylePreset[] = [
	{
		id: "pixel_art",
		name: "Pixel Art",
		description: "Retro gaming avatar style",
		portraitPrompt:
			"8-bit pixel-art portrait. Keep the person's likeness and features recognizable. Use a simple solid color background. Style should be cartoonish, anime inspired, cute and tender soft.",
		backgroundPrompt:
			"Dark pixel art tech background. Deep purple and navy gradient. Pixel grid pattern. Retro terminal/computer aesthetic with scanlines. Tech hacker vibe. No characters.",
	},
	{
		id: "cyberpunk",
		name: "Cyberpunk",
		description: "Futuristic neon style",
		portraitPrompt:
			"Flat illustration cyberpunk portrait. Stylized cartoon with neon cyan and magenta colors. Simple cel-shaded style. Bold graphic design aesthetic. Neon glow effects on flat colors. Keep the person's likeness recognizable. Not photorealistic, illustrated look.",
		backgroundPrompt:
			"Flat illustrated cyberpunk background. Simple geometric neon shapes. Cyan and magenta color blocks. Minimalist sci-fi aesthetic. Clean graphic design style. No photorealism. No characters.",
	},
	{
		id: "anime",
		name: "Anime",
		description: "Japanese manga style",
		portraitPrompt:
			"Anime style portrait. Clean cel-shaded illustration. Big expressive eyes. Smooth skin with soft shading. Keep the person's likeness and features recognizable. Use a simple solid color background. Style should be like modern anime, beautiful and polished.",
		backgroundPrompt:
			"Anime style background. Soft pastel gradient sky with subtle clouds. Cherry blossom petals floating. Dreamy and ethereal atmosphere. Warm golden hour lighting. No characters.",
	},
	{
		id: "sticker",
		name: "Sticker",
		description: "Kawaii sticker style",
		portraitPrompt:
			"Cute sticker illustration style portrait, chest-up view. Keep the person's likeness recognizable. Thick black outlines around everything. Bright cheerful colors. Slightly chibi proportions with bigger head. Kawaii cute aesthetic. Simple cel-shaded with minimal shading. Like a vinyl sticker or emoji. White background.",
		backgroundPrompt:
			"Colorful pastel gradient background. Soft pink to light blue gradient. Cute and playful aesthetic. Maybe small sparkles or stars. No characters.",
	},
	{
		id: "ghibli",
		name: "Ghibli",
		description: "Studio Ghibli style",
		portraitPrompt:
			"Studio Ghibli style portrait. Hand-drawn animation look. Soft warm colors. Gentle watercolor-like shading. Miyazaki anime aesthetic. Dreamy and whimsical. Simple but expressive features. Keep the person's likeness recognizable. Cozy and nostalgic feel.",
		backgroundPrompt:
			"Studio Ghibli style background. Soft hand-painted clouds and sky. Warm golden hour lighting. Dreamy pastoral landscape. Watercolor texture. Peaceful and magical atmosphere. No characters.",
	},
];

export function getStylePrompts(styleId: string): {
	portraitPrompt: string;
	backgroundPrompt: string;
} {
	const preset = BADGE_STYLE_PRESETS.find((p) => p.id === styleId);
	if (preset) {
		return {
			portraitPrompt: preset.portraitPrompt,
			backgroundPrompt: preset.backgroundPrompt,
		};
	}
	return {
		portraitPrompt: BADGE_STYLE_PRESETS[0].portraitPrompt,
		backgroundPrompt: BADGE_STYLE_PRESETS[0].backgroundPrompt,
	};
}

export const ROLE_BADGE_COLORS: Record<string, { primary: string; secondary: string }> = {
	owner: { primary: "#FFD700", secondary: "#FFA500" },
	admin: { primary: "#9B59B6", secondary: "#8E44AD" },
	member: { primary: "#3498DB", secondary: "#2980B9" },
	speaker: { primary: "#E74C3C", secondary: "#C0392B" },
	sponsor: { primary: "#2ECC71", secondary: "#27AE60" },
	mentor: { primary: "#F39C12", secondary: "#D68910" },
	judge: { primary: "#1ABC9C", secondary: "#16A085" },
	staff: { primary: "#34495E", secondary: "#2C3E50" },
	follower: { primary: "#95A5A6", secondary: "#7F8C8D" },
};
