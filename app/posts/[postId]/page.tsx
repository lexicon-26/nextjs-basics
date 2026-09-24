import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostDetailsPage(
  props: PageProps<"/posts/[postId]">
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
    <div className="p-5">
      <div className="space-y-1 bg-slate-300 p-3">
        <h1 className="text-3xl font-black">{post.title}</h1>
        <p className="text-sm">
          Author: {post.author?.name ?? "Deleted Author"}
        </p>
        <p className="text-sm">Created: {post.createdAt.toLocaleString()}</p>
        <p className="text-sm">Updated: {post.updatedAt.toLocaleString()}</p>
      </div>
      <p className="p-4">{post.content}</p>
    </div>
  );
}
