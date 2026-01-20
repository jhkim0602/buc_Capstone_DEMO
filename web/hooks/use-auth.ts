import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase/client";

import { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const supabase = createClientComponentClient(); // Use singleton instead

  useEffect(() => {
    let mounted = true;

    // checkUser removed to rely solely on onAuthStateChange for initial load
    // This prevents race conditions where getUser() and onAuthStateChange lock the client

    // Explicitly check session on mount to ensure loading is set to false
    // even if onAuthStateChange doesn't fire immediately (or mismatched timing)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && mounted) {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      const currentUser = session?.user || null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);

      if (currentUser) {
        try {
          console.log("[useAuth] AuthStateChange: Fetching profile...");
          const userProfile = await getUserProfile(currentUser.id, currentUser);
          console.log("[useAuth] AuthStateChange: Profile fetched.");
          if (mounted) setProfile(userProfile);
        } catch (err) {
          console.error("[useAuth] AuthStateChange: Profile fetch failed", err);
        }
      } else {
        if (mounted) setProfile(null);
      }

      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, profile, isAuthenticated, loading };
}
