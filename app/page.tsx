"use client";

import { usePosts } from "./_hooks/useBlog";
import { useBlogStore } from "./_store/store";
import { PostList } from "./_components/PostList";

export default function HomePage() {
  const { isLoading, error } = usePosts();
  const posts = useBlogStore((s) => s.posts);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Blog Posts</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {!isLoading
              ? `${posts.length} post${posts.length !== 1 ? "s" : ""}`
              : "\u00a0"}
          </p>
        </div>
      </div>

      {error && (
        <div className="card border-red-200 bg-red-50 text-red-700 text-sm">
          Failed to load posts. Check your Firestore configuration.
        </div>
      )}

      {isLoading ? <PostListSkeleton /> : <PostList posts={posts} />}
    </div>
  );
}

function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card animate-pulse space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}