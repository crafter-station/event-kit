import type { ParticleConfig } from "./particle-config";

export interface FlagPreset {
	id: string;
	name: string;
	emoji: string;
	config: ParticleConfig;
}

function flagConfig(colors: string[], counts: number[]): ParticleConfig {
	return {
		groups: colors.map((color, i) => ({
			color,
			count: counts[i] ?? 800,
			size: 0.012,
			shape: "sphere" as const,
			metalness: 0.95,
			roughness: 0.9,
			emissive: "#000000",
			emissiveIntensity: 0,
			clearcoat: 0.5,
			opacity: 1,
			transmission: 0,
			fluid: false,
		})),
	};
}

export const FLAG_PRESETS: FlagPreset[] = [
	{ id: "pe", name: "Peru", emoji: "🇵🇪", config: flagConfig(["#D91023", "#FFFFFF"], [1250, 1250]) },
	{ id: "mx", name: "Mexico", emoji: "🇲🇽", config: flagConfig(["#006847", "#FFFFFF", "#CE1126"], [833, 834, 833]) },
	{ id: "co", name: "Colombia", emoji: "🇨🇴", config: flagConfig(["#FCD116", "#003893", "#CE1126"], [1250, 625, 625]) },
	{ id: "ar", name: "Argentina", emoji: "🇦🇷", config: flagConfig(["#74ACDF", "#FFFFFF", "#F6B40E"], [1000, 1000, 500]) },
	{ id: "br", name: "Brasil", emoji: "🇧🇷", config: flagConfig(["#009C3B", "#FFDF00", "#002776"], [1000, 1000, 500]) },
	{ id: "cl", name: "Chile", emoji: "🇨🇱", config: flagConfig(["#D52B1E", "#FFFFFF", "#0039A6"], [833, 834, 833]) },
	{ id: "ec", name: "Ecuador", emoji: "🇪🇨", config: flagConfig(["#FFD100", "#034EA2", "#CE1126"], [1250, 625, 625]) },
	{ id: "bo", name: "Bolivia", emoji: "🇧🇴", config: flagConfig(["#D52B1E", "#F9E300", "#007934"], [833, 834, 833]) },
	{ id: "uy", name: "Uruguay", emoji: "🇺🇾", config: flagConfig(["#001489", "#FFFFFF", "#F9A825"], [1000, 1000, 500]) },
	{ id: "py", name: "Paraguay", emoji: "🇵🇾", config: flagConfig(["#D52B1E", "#FFFFFF", "#0038A8"], [833, 834, 833]) },
	{ id: "ve", name: "Venezuela", emoji: "🇻🇪", config: flagConfig(["#CF142B", "#00247D", "#FC0"], [833, 834, 833]) },
	{ id: "cr", name: "Costa Rica", emoji: "🇨🇷", config: flagConfig(["#002B7F", "#FFFFFF", "#CE1126"], [833, 834, 833]) },
	{ id: "us", name: "USA", emoji: "🇺🇸", config: flagConfig(["#B31942", "#FFFFFF", "#0A3161"], [833, 834, 833]) },
];

export interface StylePreset {
	id: string;
	name: string;
	config: ParticleConfig;
}

export const STYLE_PRESETS: StylePreset[] = [
	{
		id: "neon",
		name: "Neon",
		config: {
			groups: [
				{ color: "#00ff88", count: 1250, size: 0.012, shape: "sphere", metalness: 0.3, roughness: 0.2, emissive: "#00ff88", emissiveIntensity: 2, clearcoat: 1, opacity: 0.9, transmission: 0.2, fluid: false },
				{ color: "#ff00ff", count: 1250, size: 0.012, shape: "sphere", metalness: 0.3, roughness: 0.2, emissive: "#ff00ff", emissiveIntensity: 2, clearcoat: 1, opacity: 0.9, transmission: 0.2, fluid: false },
			],
		},
	},
	{
		id: "fire",
		name: "Fire",
		config: {
			groups: [
				{ color: "#ff4500", count: 1000, size: 0.014, shape: "sphere", metalness: 0.1, roughness: 0.8, emissive: "#ff4500", emissiveIntensity: 1.5, clearcoat: 0, opacity: 0.85, transmission: 0, fluid: false },
				{ color: "#ffd700", count: 1000, size: 0.01, shape: "sphere", metalness: 0.1, roughness: 0.6, emissive: "#ffd700", emissiveIntensity: 1, clearcoat: 0, opacity: 0.9, transmission: 0, fluid: false },
				{ color: "#ff6347", count: 500, size: 0.016, shape: "sphere", metalness: 0, roughness: 1, emissive: "#ff6347", emissiveIntensity: 0.5, clearcoat: 0, opacity: 0.7, transmission: 0, fluid: false },
			],
		},
	},
	{
		id: "ocean",
		name: "Ocean",
		config: {
			groups: [
				{ color: "#0077be", count: 1500, size: 0.012, shape: "sphere", metalness: 0.2, roughness: 0.3, emissive: "#000000", emissiveIntensity: 0, clearcoat: 0.8, opacity: 0.6, transmission: 0.7, fluid: true },
				{ color: "#00bfff", count: 1000, size: 0.01, shape: "sphere", metalness: 0.1, roughness: 0.2, emissive: "#00bfff", emissiveIntensity: 0.3, clearcoat: 0.9, opacity: 0.5, transmission: 0.8, fluid: true },
			],
		},
	},
	{
		id: "galaxy",
		name: "Galaxy",
		config: {
			groups: [
				{ color: "#9b59b6", count: 800, size: 0.008, shape: "sphere", metalness: 0.9, roughness: 0.1, emissive: "#9b59b6", emissiveIntensity: 1, clearcoat: 1, opacity: 1, transmission: 0, fluid: false },
				{ color: "#3498db", count: 800, size: 0.008, shape: "diamond", metalness: 0.9, roughness: 0.1, emissive: "#3498db", emissiveIntensity: 0.8, clearcoat: 1, opacity: 1, transmission: 0, fluid: false },
				{ color: "#ffffff", count: 400, size: 0.008, shape: "sphere", metalness: 1, roughness: 0, emissive: "#ffffff", emissiveIntensity: 2, clearcoat: 1, opacity: 1, transmission: 0, fluid: false },
				{ color: "#e74c3c", count: 500, size: 0.01, shape: "sphere", metalness: 0.8, roughness: 0.2, emissive: "#e74c3c", emissiveIntensity: 0.5, clearcoat: 0.8, opacity: 0.9, transmission: 0, fluid: false },
			],
		},
	},
	{
		id: "gold",
		name: "Gold",
		config: {
			groups: [
				{ color: "#ffd700", count: 2500, size: 0.012, shape: "sphere", metalness: 1, roughness: 0.3, emissive: "#ffd700", emissiveIntensity: 0.3, clearcoat: 0.8, opacity: 1, transmission: 0, fluid: false },
			],
		},
	},
];
