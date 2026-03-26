import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card text-center py-16 space-y-3">
      <h2>Post not found</h2>
      <p className="text-gray-500 text-sm">
        This post may have been deleted or never existed.
      </p>
      <Link href="/" className="btn-secondary inline-flex mx-auto">
        ← Back to posts
      </Link>
    </div>
  );
}