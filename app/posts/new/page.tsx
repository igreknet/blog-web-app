"use client";

import { PostForm } from "@/app/_components/PostForm";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        ← Back to posts
      </Link>
      <div>
        <h1>Create New Post</h1>
        <p className="text-gray-500 text-sm mt-1">Share your thoughts with the world.</p>
      </div>
      <PostForm mode="create" />
    </div>
  );
}
