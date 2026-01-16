import PostForm from "@/components/features/community/post-form";

export default function WritePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>
      <PostForm />
    </div>
  );
}
