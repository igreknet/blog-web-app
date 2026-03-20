import { Post } from "../_types/types";
import { PostCard } from "./PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="card text-center py-16 text-gray-500">
        <p className="font-medium">No posts yet</p>
        <p className="text-sm mt-1">Create your first post to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

