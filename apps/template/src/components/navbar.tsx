"use client";

import { event } from "@/lib/event";
import { useThemeStyle } from "@/lib/themes";
import { useTranslation } from "@event-sdk/i18n";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";

const NAV_LINKS = (t: ReturnType<typeof useTranslation>["t"]) => [
	{ href: "/speakers", label: t.nav.speakers },
	{ href: "/schedule", label: t.nav.schedule },
	{ href: "/sponsors", label: t.nav.sponsors },
];

export function Navbar() {
	const { t, locale, toggleLocale } = useTranslation();
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { styleId, setStyleId, iconWeight } = useThemeStyle();

	const links = NAV_LINKS(t);

	const linkClass = (href: string) =>
		`text-xs transition-colors ${
			pathname === href
				? "text-[var(--foreground)]"
				: "text-[var(--muted)] hover:text-[var(--foreground)]"
		}`;

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
				<Link href="/" className="font-mono text-sm font-medium tracking-tight">
					{event.name}
				</Link>

				<div className="hidden md:flex items-center gap-6">
					{links.map((l) => (
						<Link key={l.href} href={l.href} className={linkClass(l.href)}>
							{l.label}
						</Link>
					))}
					{event.features.jobs?.enabled && (
						<Link href="/jobs" className={linkClass("/jobs")}>
							{t.nav.jobs}
						</Link>
					)}
					{event.features.deck && (
						<Link href="/deck" className={`text-xs text-[var(--accent)] hover:underline transition-colors ${pathname === "/deck" ? "underline" : ""}`}>
							{t.nav.deck}
						</Link>
					)}
					{event.features.badges && (
						<Link href="/badge" className={linkClass("/badge")}>
							{t.nav.myBadge}
						</Link>
					)}
					<div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-0.5">
						{(["analog", "retro", "brutal"] as const).map((s) => (
							<button
								key={s}
								type="button"
								onClick={() => setStyleId(s)}
								className={`px-2 py-0.5 text-[10px] font-mono transition-colors ${
									styleId === s
										? "bg-[var(--accent)] text-[var(--accent-foreground)]"
										: "text-[var(--muted)] hover:text-[var(--foreground)]"
								}`}
								style={{ borderRadius: `var(--radius)` }}
							>
								{s[0].toUpperCase() + s.slice(1)}
							</button>
						))}
					</div>
					<button
						type="button"
						onClick={toggleLocale}
						className="border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
						style={{ borderRadius: "var(--radius)" }}
					>
						{locale === "en" ? "ES" : "EN"}
					</button>
					<button
						type="button"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="border border-[var(--border)] p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
						style={{ borderRadius: "var(--radius)" }}
						aria-label="Toggle theme"
					>
						{theme === "dark" ? <Sun size={14} weight={iconWeight} /> : <Moon size={14} weight={iconWeight} />}
					</button>
					<Link
						href="/register"
						className="bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-[var(--accent-foreground)] transition-all hover:opacity-90 active:scale-95"
						style={{ borderRadius: "var(--radius)" }}
					>
						{t.nav.register}
					</Link>
				</div>

				<div className="flex md:hidden items-center gap-3">
					<button
						type="button"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="border border-[var(--border)] p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
						style={{ borderRadius: "var(--radius)" }}
						aria-label="Toggle theme"
					>
						{theme === "dark" ? <Sun size={14} weight={iconWeight} /> : <Moon size={14} weight={iconWeight} />}
					</button>
					<button
						type="button"
						onClick={() => setMobileOpen((v) => !v)}
						className="border border-[var(--border)] p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
						style={{ borderRadius: "var(--radius)" }}
						aria-label="Toggle menu"
					>
						{mobileOpen ? <X size={16} weight={iconWeight} /> : <List size={16} weight={iconWeight} />}
					</button>
				</div>
			</div>

			{mobileOpen && (
				<div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 flex flex-col gap-4">
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							className={linkClass(l.href)}
							onClick={() => setMobileOpen(false)}
						>
							{l.label}
						</Link>
					))}
					{event.features.jobs?.enabled && (
						<Link href="/jobs" className={linkClass("/jobs")} onClick={() => setMobileOpen(false)}>
							{t.nav.jobs}
						</Link>
					)}
					{event.features.deck && (
						<Link href="/deck" className="text-xs text-[var(--accent)]" onClick={() => setMobileOpen(false)}>
							{t.nav.deck}
						</Link>
					)}
					{event.features.badges && (
						<Link href="/badge" className={linkClass("/badge")} onClick={() => setMobileOpen(false)}>
							{t.nav.myBadge}
						</Link>
					)}
					<div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
						<button
							type="button"
							onClick={toggleLocale}
							className="border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
							style={{ borderRadius: "var(--radius)" }}
						>
							{locale === "en" ? "ES" : "EN"}
						</button>
						<Link
							href="/register"
							className="bg-[var(--accent)] px-4 py-1.5 text-xs font-medium text-[var(--accent-foreground)] transition-all hover:opacity-90 active:scale-95"
							style={{ borderRadius: "var(--radius)" }}
							onClick={() => setMobileOpen(false)}
						>
							{t.nav.register}
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
