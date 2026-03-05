"use client";

import { event } from "@/lib/event";
import { useTranslation } from "@event-sdk/i18n";
import { useState } from "react";

const STEPS = ["Personal", "Professional", "Preferences", "Confirm"];

export function RegistrationForm() {
	const { t } = useTranslation();
	const [step, setStep] = useState(0);
	const [data, setData] = useState({
		fullName: "",
		email: "",
		organization: "",
		role: "attendee",
		bio: "",
		techStack: [] as string[],
		dietaryRestrictions: "",
		tshirtSize: "M",
	});
	const [submitted, setSubmitted] = useState(false);

	const update = (field: string, value: string | string[]) =>
		setData((prev) => ({ ...prev, [field]: value }));

	if (submitted) {
		return (
			<div className="rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-8 text-center">
				<p className="text-2xl font-bold mb-2">You're in!</p>
				<p className="text-sm text-[var(--muted)]">Check your email for confirmation details.</p>
				<a href="/badge" className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline">
					Generate your badge →
				</a>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex gap-1">
				{STEPS.map((s, i) => (
					<div key={s} className="flex-1 flex flex-col items-center gap-1">
						<div
							className={`h-1 w-full rounded-full transition-colors ${i <= step ? "bg-[var(--accent)]" : "bg-white/5"}`}
						/>
						<span
							className={`text-[10px] font-mono ${i <= step ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
						>
							{s}
						</span>
					</div>
				))}
			</div>

			{step === 0 && (
				<div className="space-y-4">
					<div>
						<label
							htmlFor="reg-name"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							{t.registration.fields.fullName}
						</label>
						<input
							id="reg-name"
							type="text"
							value={data.fullName}
							onChange={(e) => update("fullName", e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
							placeholder="Jane Doe"
						/>
					</div>
					<div>
						<label
							htmlFor="reg-email"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							{t.registration.fields.email}
						</label>
						<input
							id="reg-email"
							type="email"
							value={data.email}
							onChange={(e) => update("email", e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
							placeholder="jane@company.com"
						/>
					</div>
				</div>
			)}

			{step === 1 && (
				<div className="space-y-4">
					<div>
						<label htmlFor="reg-org" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
							{t.registration.fields.organization}
						</label>
						<input
							id="reg-org"
							type="text"
							value={data.organization}
							onChange={(e) => update("organization", e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
							placeholder="Company or University"
						/>
					</div>
					<div>
						<label
							htmlFor="reg-role"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							{t.registration.fields.role}
						</label>
						<select
							id="reg-role"
							value={data.role}
							onChange={(e) => update("role", e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm focus:border-[var(--accent)]/50 focus:outline-none"
						>
							{event.roles.map((r: { id: string; displayName: string }) => (
								<option key={r.id} value={r.id}>
									{r.displayName}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="reg-bio" className="block text-xs font-mono text-[var(--muted)] mb-1.5">
							{t.registration.fields.bio}
						</label>
						<textarea
							id="reg-bio"
							rows={3}
							value={data.bio}
							onChange={(e) => update("bio", e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none resize-none"
							placeholder="Tell us about yourself"
						/>
					</div>
				</div>
			)}

			{step === 2 && (
				<div className="space-y-4">
					<div>
						<label
							htmlFor="reg-tshirt"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							T-Shirt Size
						</label>
						<div className="flex gap-2">
							{["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
								<button
									key={size}
									type="button"
									onClick={() => update("tshirtSize", size)}
									className={`flex-1 rounded-lg border py-2 text-xs font-mono transition-colors ${
										data.tshirtSize === size
											? "border-[var(--accent)]/50 bg-[var(--accent)]/5 text-[var(--accent)]"
											: "border-white/5 bg-[var(--surface)] text-[var(--muted)] hover:border-white/10"
									}`}
								>
									{size}
								</button>
							))}
						</div>
					</div>
					<div>
						<label
							htmlFor="reg-dietary"
							className="block text-xs font-mono text-[var(--muted)] mb-1.5"
						>
							Dietary Restrictions
						</label>
						<input
							id="reg-dietary"
							type="text"
							value={data.dietaryRestrictions}
							onChange={(e) => update("dietaryRestrictions", e.target.value)}
							className="w-full rounded-lg border border-white/10 bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-white/20 focus:border-[var(--accent)]/50 focus:outline-none"
							placeholder="None, Vegetarian, Vegan, etc."
						/>
					</div>
				</div>
			)}

			{step === 3 && (
				<div className="rounded-xl border border-white/5 bg-[var(--surface)] p-6 space-y-3">
					<p className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">Review</p>
					{[
						["Name", data.fullName],
						["Email", data.email],
						["Organization", data.organization],
						["Role", event.roles.find((r: { id: string; displayName: string }) => r.id === data.role)?.displayName ?? data.role],
						["T-Shirt", data.tshirtSize],
					].map(([label, value]) => (
						<div key={label} className="flex justify-between text-sm">
							<span className="text-[var(--muted)]">{label}</span>
							<span>{value || "—"}</span>
						</div>
					))}
				</div>
			)}

			<div className="flex gap-3">
				{step > 0 && (
					<button
						type="button"
						onClick={() => setStep(step - 1)}
						className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-white transition-colors"
					>
						Back
					</button>
				)}
				{step < STEPS.length - 1 ? (
					<button
						type="button"
						onClick={() => setStep(step + 1)}
						className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
					>
						Continue
					</button>
				) : (
					<button
						type="button"
						onClick={() => setSubmitted(true)}
						className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
					>
						{t.registration.submit}
					</button>
				)}
			</div>
		</div>
	);
}
