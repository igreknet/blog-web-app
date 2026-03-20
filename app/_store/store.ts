import { create } from "zustand";

interface BlogStore {
  _version: number;
}

export const useBlogStore = create<BlogStore>(() => ({
  _version: 1,
}));