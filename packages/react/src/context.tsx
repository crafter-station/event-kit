"use client";

import type { EventIdentity } from "@event-sdk/core";
import { type ReactNode, createContext, useContext } from "react";

const EventKitContext = createContext<EventIdentity | null>(null);

export function EventKitProvider({
	identity,
	children,
}: {
	identity: EventIdentity;
	children: ReactNode;
}) {
	return <EventKitContext.Provider value={identity}>{children}</EventKitContext.Provider>;
}

export function useEventKit(): EventIdentity {
	const ctx = useContext(EventKitContext);
	if (!ctx) {
		throw new Error("useEventKit must be used within <EventKitProvider>");
	}
	return ctx;
}
