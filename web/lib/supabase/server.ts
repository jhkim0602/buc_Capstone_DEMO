import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
};
