"use client";

import { PostForm } from "@/app/_components/PostForm";
import { usePost } from "@/app/_hooks/useBlog";
import Link from "next/link";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: Props) {
  const { id } = use(params);
  const { data: post, isLoading } = usePost(id);

  return (
    <div className="space-y-6">
      <Link href={`/posts/${id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        ← Back to post
      </Link>
      <div>
        <h1>Edit Post</h1>
        <p className="text-gray-500 text-sm mt-1">Make changes and save.</p>
      </div>

      {isLoading ? (
        <div className="card animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      ) : post ? (
        <PostForm mode="edit" post={post} />
      ) : (
        <div className="card border-red-200 bg-red-50 text-red-700">Post not found.</div>
      )}
    </div>
  );
}