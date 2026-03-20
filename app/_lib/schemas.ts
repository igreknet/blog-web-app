import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120, "Title must be under 120 characters"),
  content: z.string().min(20, "Content must be at least 20 characters").max(1000, "Content is too long"),
  quote: z.string().min(10, "quote must be at least 10 characters").max(300, "quote must be under 300 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters").max(60, "Author name is too long"),
  tags: z
  .union([z.string(), z.array(z.string())])
  .transform((val) => {
    const arr = Array.isArray(val) ? val : val.split(",");
    return arr.map((t) => t.trim().toLowerCase()).filter(Boolean);
  })
  .pipe(z.array(z.string()).max(5, "Maximum 5 tags allowed")),
});

export type PostFormValues = z.input<typeof postSchema>;
export type PostParsed = z.output<typeof postSchema>;

export const commentSchema = z.object({
  author: z.string().min(2, "Author name must be at least 2 characters").max(60, "Author name is too long"),
  content: z.string().min(3, "Comment must be at least 3 characters").max(1000, "Comment is too long"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;