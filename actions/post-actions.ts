"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

// ------Create Post Action--------
const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be at most 5000 characters."),
});

// z.infer, z.input, z.output
export async function createPost(input: z.input<typeof createPostSchema>) {
  let postId: number;

  try {
    const data = createPostSchema.parse(input);
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
    postId = post.id;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return false;
    }
    return false;
  }

  revalidatePath("/posts");
  redirect(`/posts/${postId}`);
}

// ------------Delete Post Action--------------
export async function deletePost(postId: number, redirectTo?: string) {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/posts");
  redirect(redirectTo ?? "/posts");
}

// -----------Update Post Action--------------

const updatePostSchema = z.object({
  id: z.number().min(1, "Please provide a valid id"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be at most 5000 characters."),
});

export async function updatePost(input: z.input<typeof updatePostSchema>) {
  try {
    const data = updatePostSchema.parse(input);
    const updatedPost = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    revalidatePath("/posts");
    redirect(`/posts/${data.id}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return false;
    }
    throw error;
  }
}
