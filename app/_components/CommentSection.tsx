"use client";

import { useCommentMutations, useComments } from "../_hooks/useBlog";
import { CommentCard } from "./CommentCard";
import { AddCommentForm } from "./AddCommentForm";

export function CommentSection({ postId }: { postId: string }) {
  const { data: comments, isLoading } = useComments(postId);
  const { create, remove } = useCommentMutations(postId);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Comments{" "}
        {comments && <span className="text-gray-400 font-normal text-sm">({comments.length})</span>}
      </h2>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="card animate-pulse space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} onDelete={() => remove(comment.id)} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No comments yet. Be the first!</p>
      )}

      <AddCommentForm postId={postId} onCreate={create} />
    </section>
  );
}


