import useSWR, { mutate } from "swr";
import {
  fetchPosts, fetchPost, fetchComments,
  createPost, updatePost, deletePost,
  createComment, deleteComment,
} from "../_lib/firestore";
import { useBlogStore } from "../_store/store";
import type { CreatePostInput, UpdatePostInput, CreateCommentInput } from "../_types/types";

export const POSTS_KEY = "posts";
export const postKey = (id: string) => ["post", id] as const;
export const commentsKey = (postId: string) => ["comments", postId] as const;

export function usePosts() {
  const { setPosts } = useBlogStore();

  return useSWR(POSTS_KEY, fetchPosts, {
    revalidateOnFocus: false,
    onSuccess: (data) => setPosts(data),
  });
}

export function usePost(id: string) {
  return useSWR(postKey(id), () => fetchPost(id), { revalidateOnFocus: false });
}

export function useComments(postId: string) {
  return useSWR(commentsKey(postId), () => fetchComments(postId), {
    revalidateOnFocus: false,
  });
}

export function usePostMutations() {
  const { removePost, setDeletingId } = useBlogStore();
  const create = async (input: CreatePostInput) => {
    const post = await createPost(input);
    await mutate(POSTS_KEY);
    return post;
  };

  const update = async (id: string, input: UpdatePostInput) => {
    await updatePost(id, input);
    await mutate(postKey(id));
    await mutate(POSTS_KEY);
  };

  const remove = async (id: string) => {
    setDeletingId(id);
    removePost(id);
    try {
      await deletePost(id);
      await mutate(POSTS_KEY);
    } finally {
      setDeletingId(null);
    }
  };

  return { create, update, remove };
}

export function useCommentMutations(postId: string) {
  const create = async (input: CreateCommentInput) => {
    const comment = await createComment(input);
    await mutate(commentsKey(postId));
    return comment;
  };

  const remove = async (commentId: string) => {
    await deleteComment(postId, commentId);
    await mutate(commentsKey(postId));
  };

  return { create, remove };
}