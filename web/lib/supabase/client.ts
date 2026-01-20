import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

// function removed to enforce singleton usage

// Singleton instance for client-side usage to prevent lock contention
export const supabase = createClientComponentClient<Database>();
