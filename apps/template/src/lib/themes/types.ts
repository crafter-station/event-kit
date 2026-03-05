import type { EventStyle } from "@event-sdk/core";

export interface ThemeDefinition {
	id: EventStyle;
	name: string;
	tokens: {
		dark: Record<string, string>;
		light: Record<string, string>;
	};
	fontDisplayVar: string;
	iconWeight: "regular" | "bold" | "fill";
	borderRadius: string;
	effects: {
		grain?: boolean;
		scanlines?: boolean;
		gridOverlay?: boolean;
	};
}
