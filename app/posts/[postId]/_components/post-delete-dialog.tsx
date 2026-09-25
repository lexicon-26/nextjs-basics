"use client";

import { deletePost } from "@/actions/post-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { startTransition, useActionState } from "react";

interface PostDeleteDialogProps {
  postId: number;
  redirectTo?: string;
}

export function PostDeleteDialog({
  postId,
  redirectTo = "/posts",
}: PostDeleteDialogProps) {
  const [, action, pending] = useActionState(
    deletePost.bind(null, postId, redirectTo),
    undefined
  );

  function handleClick() {
    startTransition(action);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Delete Post
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure, you want to delete this post? Can't be undone.
            </AlertDialogDescription>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>No, cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            variant={"destructive"}
            onClick={handleClick}
          >
            Yes, delete post
            {pending && <Spinner />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
