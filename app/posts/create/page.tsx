import { PostCreateForm } from "./_components/post-create-form";

export default function CreatePostPage() {
  return (
    <div className="mt-5 space-y-2 px-6">
      <h1 className="mb-5 bg-slate-300 p-3 text-3xl font-bold">
        Create Post page
      </h1>
      <PostCreateForm />
    </div>
  );
}
