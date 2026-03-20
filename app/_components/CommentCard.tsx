export function CommentCard({ comment, onDelete }: { comment: Comment; onDelete: () => void }) {
  const date = new Date(comment.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="card py-4 space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-800">{comment.author}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <button
          onClick={() => { if (confirm("Delete this comment?")) onDelete(); }}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete comment"
        >✕</button>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
    </div>
  );
}
