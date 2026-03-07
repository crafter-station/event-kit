import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = ReturnType<typeof createDB>;

export function createDB(databaseUrl: string) {
	const sql = neon(databaseUrl);
	return drizzle(sql, { schema });
}
