import { create } from "zustand";
import { BlogStore } from "../_types/types";


export const useBlogStore = create<BlogStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  removePost: (id) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
  deletingId: null,
  setDeletingId: (id) => set({ deletingId: id }),
}));