import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
  return (
    <>
      <h1 className="mx-6 my-5 bg-slate-200 p-2 text-2xl font-black text-black">
        Posts Page
      </h1>
      <div className="grid grid-cols-2 gap-3 space-y-2 px-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>
                <p>Author: {post.author?.name ?? "Deleted Author"}</p>
                <p>Created: {post.createdAt.toLocaleString()}</p>
                <p>Updated: {post.updatedAt.toLocaleString()}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{post.content}</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Link
                href={`/posts/${post.id}`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                View Post
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
