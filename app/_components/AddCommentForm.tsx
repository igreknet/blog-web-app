import { useState } from "react";
import { useForm } from "react-hook-form";
import { CommentFormValues, commentSchema } from "../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function AddCommentForm({
  postId,
  onCreate,
}: {
  postId: string;
  onCreate: (input: { postId: string; author: string; content: string }) => Promise<Comment>;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (values: CommentFormValues) => {
    setServerError(null);
    try {
      await onCreate({ postId, ...values });
      reset();
    } catch {
      setServerError("Failed to post comment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 bg-gray-50" noValidate>
      <h3 className="text-sm font-semibold text-gray-700">Leave a comment</h3>

      <div>
        <label htmlFor="comment-author" className="label">Name <span className="text-red-500">*</span></label>
        <input id="comment-author" type="text" className="input" placeholder="Your name" {...register("author")} />
        {errors.author && <p className="error-text">{errors.author.message}</p>}
      </div>

      <div>
        <label htmlFor="comment-content" className="label">Comment <span className="text-red-500">*</span></label>
        <textarea id="comment-content" rows={3} className="input resize-none" placeholder="Write a comment…" {...register("content")} />
        {errors.content && <p className="error-text">{errors.content.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{serverError}</p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Posting…" : "Post Comment"}
      </button>
    </form>
  );
}