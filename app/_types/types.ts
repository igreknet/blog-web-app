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

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type CreatePostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type UpdatePostInput = Partial<CreatePostInput>;
export type CreateCommentInput = Omit<Comment, "id" | "createdAt">;