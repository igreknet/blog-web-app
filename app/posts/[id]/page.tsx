"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { usePost, usePostMutations } from "@/app/_hooks/useBlog";
import { CommentSection } from "@/app/_components/CommentSection";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PostPage({ params }: Props) {
  const { id } = use(params);
  const { data: post, isLoading, error } = usePost(id);
  const { remove } = usePostMutations();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await remove(id);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="card animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="space-y-2 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="card border-red-200 bg-red-50 text-red-700 space-y-4">
        <p>Post not found or failed to load.</p>
        <Link href="/" className="btn-secondary inline-flex">← Back to posts</Link>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="space-y-6">
      <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        ← Back to posts
      </Link>

      <article className="card space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="flex-1 text-2xl">{post.title}</h1>
          <div className="flex gap-2 shrink-0">
            <Link href={`/posts/${id}/edit`} className="btn-secondary text-xs px-3 py-1.5">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn-danger text-xs px-3 py-1.5">
              Delete
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>By <strong className="text-gray-700">{post.author}</strong></span>
          <span>{formattedDate}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        )}

        <hr className="border-gray-100" />

        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
          {post.content}
        </div>
      </article>

      <CommentSection postId={id} />
    </div>
  );
}