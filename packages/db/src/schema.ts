import {
	boolean,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const events = pgTable("events", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	tagline: text("tagline"),
	description: text("description"),
	startDate: timestamp("start_date"),
	endDate: timestamp("end_date"),
	venue: text("venue"),
	city: text("city"),
	country: text("country"),
	format: text("format").$type<"virtual" | "in-person" | "hybrid">(),
	brandConfig: jsonb("brand_config"),
	websiteUrl: text("website_url"),
	maxAttendees: integer("max_attendees"),
	isPublished: boolean("is_published").default(false),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const sponsorTiers = pgTable("sponsor_tiers", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	price: integer("price"),
	color: text("color"),
	sortOrder: integer("sort_order").default(0),
	benefits: jsonb("benefits"),
	maxSponsors: integer("max_sponsors"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const sponsors = pgTable("sponsors", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	tierId: text("tier_id")
		.notNull()
		.references(() => sponsorTiers.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	logoUrl: text("logo_url"),
	websiteUrl: text("website_url"),
	contactEmail: text("contact_email"),
	callToAction: text("call_to_action"),
	callToActionLink: text("call_to_action_link"),
	youtubeSlug: text("youtube_slug"),
	discord: text("discord"),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const speakers = pgTable("speakers", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	title: text("title"),
	company: text("company"),
	bio: text("bio"),
	photoUrl: text("photo_url"),
	talkTitle: text("talk_title"),
	talkDescription: text("talk_description"),
	talkType: text("talk_type").$type<
		"keynote" | "workshop" | "panel" | "lightning"
	>(),
	twitter: text("twitter"),
	github: text("github"),
	linkedin: text("linkedin"),
	websiteUrl: text("website_url"),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const scheduleSessions = pgTable("schedule_sessions", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	speakerId: text("speaker_id").references(() => speakers.id, {
		onDelete: "set null",
	}),
	title: text("title").notNull(),
	description: text("description"),
	startTime: timestamp("start_time"),
	endTime: timestamp("end_time"),
	location: text("location"),
	type: text("type").$type<
		"talk" | "workshop" | "panel" | "break" | "networking"
	>(),
	streamUrl: text("stream_url"),
	isLive: boolean("is_live").default(false),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const judges = pgTable("judges", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	title: text("title"),
	company: text("company"),
	bio: text("bio"),
	photoUrl: text("photo_url"),
	expertise: text("expertise").array(),
	twitter: text("twitter"),
	linkedin: text("linkedin"),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const attendees = pgTable("attendees", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	clerkUserId: text("clerk_user_id").unique(),
	email: text("email").notNull(),
	fullName: text("full_name"),
	organization: text("organization"),
	role: text("role").default("attendee"),
	bio: text("bio"),
	photoUrl: text("photo_url"),
	badgeNumber: integer("badge_number"),
	registrationStatus: text("registration_status").default("pending"),
	currentStep: integer("current_step").default(1),
	socialLinks: jsonb("social_links"),
	metadata: jsonb("metadata"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
	completedAt: timestamp("completed_at"),
});

export const jobs = pgTable("jobs", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	sponsorId: text("sponsor_id").references(() => sponsors.id, {
		onDelete: "set null",
	}),
	title: text("title").notNull(),
	company: text("company").notNull(),
	description: text("description"),
	applyUrl: text("apply_url"),
	location: text("location"),
	type: text("type").$type<
		"full-time" | "part-time" | "contract" | "internship"
	>(),
	isFeatured: boolean("is_featured").default(false),
	isActive: boolean("is_active").default(true),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const badges = pgTable("badges", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	attendeeId: text("attendee_id")
		.notNull()
		.references(() => attendees.id, { onDelete: "cascade" }),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	number: integer("number"),
	particleConfig: jsonb("particle_config"),
	imageUrl: text("image_url"),
	generatedAt: timestamp("generated_at"),
	createdAt: timestamp("created_at").defaultNow(),
});

export const hackathonTracks = pgTable("hackathon_tracks", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	sponsorId: text("sponsor_id").references(() => sponsors.id, {
		onDelete: "set null",
	}),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	prizes: jsonb("prizes"),
	color: text("color"),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const hackathonTeams = pgTable("hackathon_teams", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	trackId: text("track_id").references(() => hackathonTracks.id, {
		onDelete: "set null",
	}),
	name: text("name").notNull(),
	description: text("description"),
	projectUrl: text("project_url"),
	repoUrl: text("repo_url"),
	members: jsonb("members"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const hackathonSubmissions = pgTable("hackathon_submissions", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	eventId: text("event_id")
		.notNull()
		.references(() => events.id, { onDelete: "cascade" }),
	teamId: text("team_id")
		.notNull()
		.references(() => hackathonTeams.id, { onDelete: "cascade" }),
	trackId: text("track_id")
		.notNull()
		.references(() => hackathonTracks.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	description: text("description"),
	demoUrl: text("demo_url"),
	repoUrl: text("repo_url"),
	videoUrl: text("video_url"),
	screenshotUrls: jsonb("screenshot_urls"),
	score: integer("score"),
	submittedAt: timestamp("submitted_at"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type SponsorTier = typeof sponsorTiers.$inferSelect;
export type NewSponsorTier = typeof sponsorTiers.$inferInsert;

export type Sponsor = typeof sponsors.$inferSelect;
export type NewSponsor = typeof sponsors.$inferInsert;

export type Speaker = typeof speakers.$inferSelect;
export type NewSpeaker = typeof speakers.$inferInsert;

export type ScheduleSession = typeof scheduleSessions.$inferSelect;
export type NewScheduleSession = typeof scheduleSessions.$inferInsert;

export type Judge = typeof judges.$inferSelect;
export type NewJudge = typeof judges.$inferInsert;

export type Attendee = typeof attendees.$inferSelect;
export type NewAttendee = typeof attendees.$inferInsert;

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;

export type Badge = typeof badges.$inferSelect;
export type NewBadge = typeof badges.$inferInsert;

export type HackathonTrack = typeof hackathonTracks.$inferSelect;
export type NewHackathonTrack = typeof hackathonTracks.$inferInsert;

export type HackathonTeam = typeof hackathonTeams.$inferSelect;
export type NewHackathonTeam = typeof hackathonTeams.$inferInsert;

export type HackathonSubmission = typeof hackathonSubmissions.$inferSelect;
export type NewHackathonSubmission = typeof hackathonSubmissions.$inferInsert;
