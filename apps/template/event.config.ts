import { defineEvent } from "@event-sdk/core";

const event = defineEvent({
	name: "Peru AI Hackathon",
	slug: "peru-ai-hackathon",
	tagline: "El hackathon de IA mas grande del Peru",
	type: "hackathon",
	dates: {
		start: new Date("2026-06-15T09:00:00-05:00"),
		end: new Date("2026-06-17T18:00:00-05:00"),
	},
	location: {
		venue: "UNMSM - Facultad de Ingenieria",
		city: "Lima",
		country: "PE",
		format: "hybrid",
	},
	brand: {
		colors: {
			primary: "#00FF87",
			secondary: "#00D1FF",
			background: "#0A0A0B",
			surface: "#111113",
			text: "#FFFFFF",
			textMuted: "#888888",
		},
		fonts: {
			display: { family: "Space Grotesk", weights: [700, 800], source: "google" as const },
			body: { family: "Inter", weights: [400, 500, 600], source: "google" as const },
			mono: { family: "JetBrains Mono", weights: [400, 500], source: "google" as const },
		},
		logos: {
			primary: "/logo.svg",
		},
		badge: {
			template: "card" as const,
			dimensions: { width: 1080, height: 1440 },
			qrCode: { enabled: true, position: "bottom-left" as const },
			numberFormat: "###",
		},
	},
	style: "retro",
	features: {
		speakers: { enabled: true },
		sponsors: {
			tiers: [
				{
					id: "diamond",
					name: "Diamond",
					slug: "diamond",
					price: 500000,
					color: "#B9F2FF",
					benefits: ["Logo on stage", "5 min pitch", "Booth", "10 tickets", "Hiring booth"],
				},
				{
					id: "gold",
					name: "Gold",
					slug: "gold",
					price: 250000,
					color: "#FFD700",
					benefits: ["Logo on site", "Booth", "5 tickets", "Hiring booth"],
				},
				{
					id: "silver",
					name: "Silver",
					slug: "silver",
					price: 100000,
					color: "#C0C0C0",
					benefits: ["Logo on site", "3 tickets"],
				},
				{
					id: "bronze",
					name: "Bronze",
					slug: "bronze",
					price: 50000,
					color: "#CD7F32",
					benefits: ["Logo on site", "1 ticket"],
				},
			],
			ctaUrl: "/deck",
			ctaLabel: "Become a Sponsor",
			deckSlides: [
				{ variant: "cover" as const, title: "Peru AI Hackathon 2026" },
				{
					variant: "opportunity" as const,
					title: "Why Sponsor?",
					content:
						"Connect with 500+ developers and AI enthusiasts building the future of Peru's tech ecosystem.",
				},
				{ variant: "audience" as const, title: "Our Audience" },
				{ variant: "tiers" as const, title: "Sponsor Tiers" },
				{ variant: "benefits" as const, title: "What You Get" },
				{ variant: "past-sponsors" as const, title: "Past Partners" },
				{
					variant: "contact" as const,
					title: "Get In Touch",
					content: "sponsors@peru-ai-hackathon.co",
				},
			],
		},
		schedule: { enabled: true, timezone: "America/Lima" },
		judges: { enabled: true },
		jobs: { enabled: true },
		hackathon: {
			enabled: true,
			tracks: [
				{
					name: "AI for Education",
					slug: "ai-education",
					description: "Build tools that make education more accessible.",
					color: "#00FF87",
				},
				{
					name: "AI for Health",
					slug: "ai-health",
					description: "Healthcare solutions powered by AI.",
					color: "#FF6B6B",
				},
				{
					name: "AI for Climate",
					slug: "ai-climate",
					description: "Sustainability and environmental AI.",
					color: "#4ECDC4",
				},
				{
					name: "Open Track",
					slug: "open",
					description: "Build anything with AI.",
					color: "#FFE66D",
				},
			],
			submissionDeadline: "2026-06-17T15:00:00-05:00",
			judgingCriteria: [
				{ name: "Innovation", weight: 30, description: "How novel is the solution?" },
				{ name: "Technical Execution", weight: 25, description: "Quality of implementation." },
				{ name: "Impact", weight: 25, description: "Potential real-world impact." },
				{ name: "Presentation", weight: 20, description: "Quality of demo and pitch." },
			],
		},
		faq: {
			items: [
				{
					question: "Who can participate?",
					answer: "Anyone! Students, professionals, hobbyists — all skill levels welcome.",
				},
				{ question: "Is it free?", answer: "Yes, completely free to participate." },
				{
					question: "Do I need a team?",
					answer: "You can participate solo or in teams of up to 4.",
				},
				{
					question: "What should I bring?",
					answer: "Your laptop, charger, and enthusiasm. We provide food and drinks.",
				},
				{
					question: "Are there prizes?",
					answer: "Yes! Each track has prizes. Total prize pool announced closer to the event.",
				},
			],
			contactUrl: "mailto:hello@peru-ai-hackathon.co",
		},
		community: {
			whatsappUrl: "https://chat.whatsapp.com/example",
			discordUrl: "https://discord.gg/example",
		},
		badges: true,
		i18n: true,
		deck: true,
	},
});

export default event;
