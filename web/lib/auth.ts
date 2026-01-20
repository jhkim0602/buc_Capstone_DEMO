import { supabase } from "@/lib/supabase/client";
import {
  User,
  Session,
  AuthError,
  PostgrestError,
} from "@supabase/supabase-js";

// Client-side singleton for auth operations
// imported from @/lib/supabase/client

export type UserPreferences = Record<string, string | number | boolean | null>;

// 사용자 프로필 타입
export interface UserProfile {
  id: string;
  nickname: string | null;
  avatar_url: string | null;
  bio: string | null;
  reputation: number;
  tier: string;
  tech_stack: string[] | null;
  created_at: string;
  updated_at: string;
  // Additional fields useful for frontend but not in profiles table
  email?: string;
}

// 로그인 함수
export async function signIn(
  email: string,
  password: string,
): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
}

// 회원가입 함수
export async function signUp(
  email: string,
  password: string,
): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
}

// 로그아웃 함수
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// 현재 사용자 가져오기
export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error: any) {
    if (error.name === "AbortError" || error.message === "AbortError") {
      return null;
    }
    console.error("getCurrentUser Error:", error);
    return null;
  }
}

// 현재 세션 가져오기
export async function getCurrentSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// 사용자 프로필 가져오기
export async function getUserProfile(
  userId: string,
  userObject?: User | null,
): Promise<UserProfile | null> {
  try {
    console.log("[getUserProfile] Querying profiles table for:", userId);

    // Safety timeout: Abort query if it hangs for more than 2 seconds
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 2000);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .abortSignal(abortController.signal)
      .single();

    clearTimeout(timeoutId);

    console.log("[getUserProfile] Query result:", {
      found: !!data,
      error: error?.code,
    });

    if (error) {
      // P2002 or PGRST116: Profile missing
      // if (error.code === "PGRST116" || error.code === "P2002") {
      //   console.log("사용자 프로필이 없습니다. 자동 생성 시도...");
      //   const user = userObject || (await getCurrentUser());
      //   if (user) {
      //     console.log("[getUserProfile] Attempting to upsert new profile...");
      //     const { profile: newProfile, error: createError } =
      //       await upsertUserProfile({
      //         id: userId,
      //         nickname:
      //           user.user_metadata?.full_name ||
      //           user.user_metadata?.username ||
      //           user.email?.split("@")[0] ||
      //           "User",
      //         avatar_url: user.user_metadata?.avatar_url,
      //       });

      //     if (createError) {
      //       console.error("프로필 생성 실패:", createError);
      //       return null;
      //     }
      //     console.log("[getUserProfile] New profile created.");
      //     return newProfile;
      //   }
      // }
      console.error("사용자 프로필 조회 실패:", error);
      return null;
    }

    // Check if profile needs sync (e.g. it is the default "User" fallback)
    const profile = data as UserProfile;
    // if (profile && (profile.nickname === "User" || !profile.avatar_url)) {
    //   const user = userObject || (await getCurrentUser());
    //   if (
    //     user &&
    //     (user.user_metadata?.full_name || user.user_metadata?.avatar_url)
    //   ) {
    //     console.log("프로필 동기화 시도...");
    //     const { profile: updatedProfile } = await upsertUserProfile({
    //       id: userId,
    //       nickname:
    //         user.user_metadata.full_name ||
    //         user.user_metadata.username ||
    //         profile.nickname,
    //       avatar_url: user.user_metadata.avatar_url || profile.avatar_url,
    //       bio: profile.bio, // Keep existing fields
    //       reputation: profile.reputation,
    //       tier: profile.tier,
    //       tech_stack: profile.tech_stack,
    //     });
    //     return updatedProfile || profile;
    //   }
    // }

    return profile;
  } catch (error) {
    console.error("사용자 프로필 조회 중 예외 발생:", error);
    return null;
  }
}

// 사용자 프로필 생성/업데이트
export async function upsertUserProfile(
  profile: Partial<UserProfile>,
): Promise<{
  profile: UserProfile | null;
  error: PostgrestError | null;
}> {
  // profiles 테이블에 있는 필드만 추출
  const dbProfile = {
    id: profile.id,
    nickname: profile.nickname,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    reputation: profile.reputation,
    tier: profile.tier,
    tech_stack: profile.tech_stack,
    updated_at: new Date().toISOString(),
  };

  console.log("[upsertUserProfile] Upserting profile data:", dbProfile.id);
  const { data, error } = await supabase
    .from("profiles")
    .upsert(dbProfile as any) // any casting to avoid excessive type mismatch with Partial
    .select()
    .single();
  console.log("[upsertUserProfile] Upsert finished:", {
    success: !!data,
    error,
  });

  return {
    profile: data as UserProfile | null,
    error,
  };
}

// 소셜 로그인 (Google)
export async function signInWithGoogle(): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return {
    user: null, // OAuth는 리다이렉트 방식이므로 즉시 사용자 정보를 얻을 수 없음
    session: null,
    error,
  };
}

// 소셜 로그인 (GitHub)
export async function signInWithGithub(): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return {
    user: null, // OAuth는 리다이렉트 방식이므로 즉시 사용자 정보를 얻을 수 없음
    session: null,
    error,
  };
}

// 비밀번호 재설정
export async function resetPassword(
  email: string,
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  return { error };
}

// 인증 상태 변경 리스너
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}
