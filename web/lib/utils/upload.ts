import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export const uploadCommunityImage = async (file: File): Promise<string> => {
  const supabase = createClientComponentClient<Database>();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()
    .toString(36)
    .substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `post-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from("community-uploads")
    .upload(filePath, file);

  if (error) {
    console.error("Image upload failed:", error);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("community-uploads").getPublicUrl(filePath);

  return publicUrl;
};
