import {
  collection, doc, getDocs, getDoc, addDoc,
  updateDoc, deleteDoc, query, orderBy,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { CreateCommentInput, CreatePostInput, Post, UpdatePostInput } from "../_types/types";


function toISO(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return new Date().toISOString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToPost(id: string, data: Record<string, any>): Post {
  return {
    id,
    title: data.title ?? "",
    content: data.content ?? "",
    quote: data.quote ?? "",
    author: data.author ?? "",
    tags: data.tags ?? [],
    createdAt: toISO(data.createdAt),
    updatedAt: toISO(data.updatedAt),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToComment(id: string, data: Record<string, any>): Comment {
  return {
    id,
    postId: data.postId ?? "",
    author: data.author ?? "",
    content: data.content ?? "",
    createdAt: toISO(data.createdAt),
  };
}

const postsCol = collection(db, "posts");

export async function fetchPosts(): Promise<Post[]> {
  const q = query(postsCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPost(d.id, d.data()));
}

export async function fetchPost(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(postsCol, id));
  if (!snap.exists()) return null;
  return docToPost(snap.id, snap.data());
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const ref = await addDoc(postsCol, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  return docToPost(snap.id, snap.data()!);
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<void> {
  await updateDoc(doc(postsCol, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(postsCol, id));
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const commentsCol = collection(db, "posts", postId, "comments");
  const q = query(commentsCol, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToComment(d.id, d.data()));
}

export async function createComment(input: CreateCommentInput): Promise<Comment> {
  const commentsCol = collection(db, "posts", input.postId, "comments");
  const ref = await addDoc(commentsCol, {
    ...input,
    createdAt: serverTimestamp(),
  });
  const snap = await getDoc(ref);
  return docToComment(snap.id, snap.data()!);
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  await deleteDoc(doc(db, "posts", postId, "comments", commentId));
}