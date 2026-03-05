"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@event-sdk/i18n";
import { ThemeStyleProvider } from "@/lib/themes";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			<ThemeStyleProvider>
				<I18nProvider defaultLocale="en">{children}</I18nProvider>
			</ThemeStyleProvider>
		</ThemeProvider>
	);
}
