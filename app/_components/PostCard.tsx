import Link from "next/link";
import { Post } from "../_types/types";

export function PostCard({ post }: { post: Post }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <Link href={`/posts/${post.id}`} className="block group">
      <article className="card hover:border-blue-300 hover:shadow-md transition-all duration-150">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <h2 className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">{post.author}</span>
              <span>·</span>
              <span>{date}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{post.quote}</p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            )}
          </div>
          <span className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0 text-lg">→</span>
        </div>
      </article>
    </Link>
  );
}