"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from "../_types/types";
import { usePostMutations } from "../_hooks/useBlog";
import { PostFormValues, postSchema } from "../_lib/schemas";

interface Props {
  mode: "create" | "edit";
  post?: Post;
}

export function PostForm({ mode, post }: Props) {
  const router = useRouter();
  const { create, update } = usePostMutations();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: mode === "edit" && post
      ? { title: post.title, content: post.content, quote: post.quote, author: post.author, tags: post.tags.join(", ") }
      : { title: "", content: "", quote: "", author: "", tags: "" },
  });

  const onSubmit = async (values: PostFormValues) => {
    setServerError(null);
    try {
      const parsed = postSchema.parse(values);
      if (mode === "create") {
        const newPost = await create(parsed);
        router.push(`/posts/${newPost.id}`);
      } else if (post) {
        await update(post.id, parsed);
        router.push(`/posts/${post.id}`);
      }
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5" noValidate>
      <div>
        <label htmlFor="title" className="label">Title <span className="text-red-500">*</span></label>
        <input id="title" type="text" className="input" placeholder="An interesting title…" {...register("title")} />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="author" className="label">Author <span className="text-red-500">*</span></label>
        <input id="author" type="text" className="input" placeholder="Your name" {...register("author")} />
        {errors.author && <p className="error-text">{errors.author.message}</p>}
      </div>

      <div>
        <label htmlFor="quote" className="label">quote <span className="text-red-500">*</span></label>
        <textarea id="quote" rows={2} className="input resize-none" placeholder="A short summary shown in the post list…" {...register("quote")} />
        {errors.quote && <p className="error-text">{errors.quote.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="label">Content <span className="text-red-500">*</span></label>
        <textarea id="content" rows={10} className="input resize-y font-mono text-sm" placeholder="Write your post here…" {...register("content")} />
        {errors.content && <p className="error-text">{errors.content.message}</p>}
      </div>

      <div>
        <label htmlFor="tags" className="label">Tags</label>
        <input id="tags" type="text" className="input" placeholder="e.g. typescript, react, nextjs  (comma-separated, max 5)" {...register("tags")} />
        {errors.tags && <p className="error-text">{typeof errors.tags.message === "string" ? errors.tags.message : "Invalid tags"}</p>}
        <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
      </div>

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{serverError}</p>
      )}

      <div className="flex gap-3 pt-1">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? (mode === "create" ? "Publishing…" : "Saving…") : (mode === "create" ? "Publish Post" : "Save Changes")}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}