import useSWR, { mutate } from "swr";
import { createComment, createPost, deleteComment, deletePost, fetchComments, fetchPost, fetchPosts, updatePost } from "../_lib/firestore";
import { CreateCommentInput, CreatePostInput, UpdatePostInput } from "../_types/types";



export const POSTS_KEY = "posts";
export const postKey = (id: string) => ["post", id] as const;
export const commentsKey = (postId: string) => ["comments", postId] as const;

export function usePosts() {
  return useSWR(POSTS_KEY, fetchPosts, { revalidateOnFocus: false });
}

export function usePost(id: string) {
  return useSWR(postKey(id), () => fetchPost(id), { revalidateOnFocus: false });
}

export function useComments(postId: string) {
  return useSWR(commentsKey(postId), () => fetchComments(postId), { revalidateOnFocus: false });
}

export function usePostMutations() {
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
    await deletePost(id);
    await mutate(POSTS_KEY);
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