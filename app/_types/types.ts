export interface Post {
  id: string;
  title: string;
  content: string;
  quote: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}
export interface BlogStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  removePost: (id: string) => void;
  deletingId: string | null;
  setDeletingId: (id: string | null) => void;
}


export type CreatePostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type UpdatePostInput = Partial<CreatePostInput>;
export type CreateCommentInput = Omit<BlogComment, "id" | "createdAt">;