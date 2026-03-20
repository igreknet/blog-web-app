import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-900 hover:text-blue-600">
          Blog
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Posts</Link>
          <Link href="/posts/new" className="btn-primary">New Post</Link>
        </nav>
      </div>
    </header>
  );
}