import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostUpdatePage(
  props: PageProps<"/posts/[postId]/update">
) {
  const params = await props.params;
  const postId = parseInt(params.postId);

  if (Number.isNaN(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="mt-5 space-y-2 px-6">
      <h1 className="mb-5 bg-slate-300 p-3 text-3xl font-bold">
        Update Post
        {/* PostUpdateForm here */}
      </h1>
    </div>
  );
}
