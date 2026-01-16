export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nickname: string | null;
          avatar_url: string | null;
          bio: string | null;
          reputation: number;
          tier: string;
          tech_stack: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nickname?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          reputation?: number;
          tier?: string;
          tech_stack?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nickname?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          reputation?: number;
          tier?: string;
          tech_stack?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          author_id: string | null;
          title: string;
          content: string;
          category: "qna" | "tech" | "codereview" | "showcase" | "daily";
          tags: string[] | null;
          views: number;
          likes: number;
          has_accepted_answer: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id?: string | null;
          title: string;
          content: string;
          category: "qna" | "tech" | "codereview" | "showcase" | "daily";
          tags?: string[] | null;
          views?: number;
          likes?: number;
          has_accepted_answer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string | null;
          title?: string;
          content?: string;
          category?: "qna" | "tech" | "codereview" | "showcase" | "daily";
          tags?: string[] | null;
          views?: number;
          likes?: number;
          has_accepted_answer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string | null;
          content: string;
          parent_id: string | null;
          is_accepted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id?: string | null;
          content: string;
          parent_id?: string | null;
          is_accepted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string | null;
          content?: string;
          parent_id?: string | null;
          is_accepted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      squads: {
        Row: {
          id: string;
          leader_id: string;
          type: "project" | "study" | "contest" | "mogakco";
          title: string;
          content: string;
          tech_stack: string[] | null;
          capacity: number;
          recruited_count: number;
          place_type: "online" | "offline" | "hybrid";
          location: string | null;
          activity_id: string | null;
          workspace_id: string | null;
          status: "recruiting" | "completed" | "finished";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          leader_id: string;
          type: "project" | "study" | "contest" | "mogakco";
          title: string;
          content: string;
          tech_stack?: string[] | null;
          capacity?: number;
          recruited_count?: number;
          place_type?: "online" | "offline" | "hybrid";
          location?: string | null;
          activity_id?: string | null;
          workspace_id?: string | null;
          status?: "recruiting" | "completed" | "finished";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          leader_id?: string;
          type?: "project" | "study" | "contest" | "mogakco";
          title?: string;
          content?: string;
          tech_stack?: string[] | null;
          capacity?: number;
          recruited_count?: number;
          place_type?: "online" | "offline" | "hybrid";
          location?: string | null;
          activity_id?: string | null;
          workspace_id?: string | null;
          status?: "recruiting" | "completed" | "finished";
          created_at?: string;
          updated_at?: string;
        };
      };
      squad_members: {
        Row: {
          id: string;
          squad_id: string;
          user_id: string;
          role: "leader" | "member";
          joined_at: string;
        };
        Insert: {
          id?: string;
          squad_id: string;
          user_id: string;
          role?: "leader" | "member";
          joined_at?: string;
        };
        Update: {
          id?: string;
          squad_id?: string;
          user_id?: string;
          role?: "leader" | "member";
          joined_at?: string;
        };
      };
      squad_applications: {
        Row: {
          id: string;
          squad_id: string;
          user_id: string;
          message: string | null;
          status: "pending" | "accepted" | "rejected";
          created_at: string;
        };
        Insert: {
          id?: string;
          squad_id: string;
          user_id: string;
          message?: string | null;
          status?: "pending" | "accepted" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          squad_id?: string;
          user_id?: string;
          message?: string | null;
          status?: "pending" | "accepted" | "rejected";
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
