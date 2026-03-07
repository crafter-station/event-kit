import type { RegistrationProvider, RegistrationCheckResult } from "../types";

export interface LumaProviderOptions {
	apiKey: string;
	eventId: string;
}

interface LumaGuestResponse {
	guest: {
		approval_status: string;
		user_name: string;
		user_email: string;
	};
}

export function createLumaProvider(options: LumaProviderOptions): RegistrationProvider {
	return {
		name: "luma",
		async checkRegistration(email: string): Promise<RegistrationCheckResult> {
			const url = new URL("https://public-api.luma.com/v1/event/get-guest");
			url.searchParams.set("event_id", options.eventId);
			url.searchParams.set("id", email);

			const res = await fetch(url.toString(), {
				headers: {
					accept: "application/json",
					"x-luma-api-key": options.apiKey,
				},
			});

			if (!res.ok) {
				return { registered: false, error: "not_found" };
			}

			const data = (await res.json()) as LumaGuestResponse;

			if (!data.guest || data.guest.approval_status !== "approved") {
				return { registered: false, error: "not_approved" };
			}

			return { registered: true, name: data.guest.user_name };
		},
	};
}
