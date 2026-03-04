import type { Attendee, EventIdentity, GeneratedAsset } from "@crafter/event-kit-core";

export interface BadgeGenerateOptions {
	attendee: Attendee;
	identity: EventIdentity;
	fonts?: FontData[];
	photoBuffer?: Buffer;
	output?: {
		format?: "png" | "webp";
		quality?: number;
	};
}

export interface FontData {
	name: string;
	data: Buffer | ArrayBuffer;
	weight: number;
	style?: "normal" | "italic";
}

export interface QRCodeOptions {
	width?: number;
	margin?: number;
	errorCorrectionLevel?: "L" | "M" | "Q" | "H";
	darkColor?: string;
	lightColor?: string;
}

export interface BadgeLayout {
	width: number;
	height: number;
	photo: { x: number; y: number; width: number; height: number };
	name: { x: number; y: number };
	role: { x: number; y: number };
	number: { x: number; y: number; fontSize: number; color: string };
	qrCode: { x: number; y: number; width: number; height: number };
}

export interface BadgeStylePreset {
	id: string;
	name: string;
	description: string;
	portraitPrompt: string;
	backgroundPrompt: string;
}

export type { Attendee, EventIdentity, GeneratedAsset };
