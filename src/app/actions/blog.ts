"use server";

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import { BlogPost, markdownToBlocks } from "@/lib/blogUtils";

const dataFilePath = path.join(process.cwd(), "src", "data", "blogPosts.json");

// ===== Zod Validation Schema =====
const blogPostSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(150, "Title is too long"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(150, "Slug is too long")
    .regex(/^[a-z0-9-_]+$/, "Slug can only contain lowercase letters, numbers, hyphens, and underscores"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(400, "Excerpt is too long"),
  category: z.string().min(2, "Category must be at least 2 characters").max(50, "Category is too long"),
  readTime: z.string().min(2, "Read time is required (e.g. '5 min read')"),
  date: z.string().min(2, "Date is required (e.g. 'May 31, 2026')"),
  contentMarkdown: z.string().min(10, "Content must be at least 10 characters"),
});

// ===== Helper: Read / Write JSON =====
async function readPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), "utf-8");
}

// ===== Helper: Generate Session Hash =====
function getSessionHash(): string {
  const secret = process.env.SESSION_SECRET || "saral-fallback-secret-2026-auth";
  return crypto.createHmac("sha256", secret).update("saral-admin-logged-in-session").digest("hex");
}

// ===== Action: Check Authentication =====
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;
    if (!sessionToken) return false;

    const expectedToken = getSessionHash();
    return sessionToken === expectedToken;
  } catch (error) {
    return false;
  }
}

// ===== Action: Admin Login =====
export async function loginAdmin(password: string): Promise<{ success: boolean; message: string }> {
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin";

  if (password === expectedPassword) {
    const sessionToken = getSessionHash();
    const cookieStore = await cookies();
    
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, message: "Authentication successful." };
  }

  return { success: false, message: "Invalid administrator credentials." };
}

// ===== Action: Admin Logout =====
export async function logoutAdmin(): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true, message: "Logged out successfully." };
}

// ===== Action: Get All Posts =====
export async function getBlogPosts(): Promise<BlogPost[]> {
  return await readPosts();
}

// ===== Action: Save Post (Create / Update) =====
export async function saveBlogPost(
  id: string | null,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    contentMarkdown: string;
  }
): Promise<{ success: boolean; message: string; errors?: Record<string, string[]> }> {
  // 1. Auth check
  const isAuthenticated = await checkIsAdmin();
  if (!isAuthenticated) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  // 2. Validation
  const result = blogPostSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Validation failed. Please correct the errors.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const validatedData = result.data;
  const posts = await readPosts();

  // Check slug uniqueness (excluding current post if editing)
  const duplicateSlug = posts.find((p) => p.slug === validatedData.slug && p.id !== id);
  if (duplicateSlug) {
    return {
      success: false,
      message: "Slug already in use. Please select a unique slug.",
      errors: { slug: ["This slug is already used by another post."] },
    };
  }

  // Parse markdown content to json content blocks
  const contentBlocks = markdownToBlocks(validatedData.contentMarkdown);

  const postData: BlogPost = {
    id: id || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: validatedData.title,
    slug: validatedData.slug,
    excerpt: validatedData.excerpt,
    category: validatedData.category,
    readTime: validatedData.readTime,
    date: validatedData.date,
    link: `/blog/${validatedData.slug}`,
    content: contentBlocks,
  };

  if (id) {
    // Update existing
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return { success: false, message: "Post not found." };
    }
    posts[index] = postData;
  } else {
    // Create new (add to top of the list)
    posts.unshift(postData);
  }

  await writePosts(posts);

  return {
    success: true,
    message: id ? "Blog post updated successfully." : "Blog post created successfully.",
  };
}

// ===== Action: Delete Post =====
export async function deleteBlogPost(id: string): Promise<{ success: boolean; message: string }> {
  // 1. Auth check
  const isAuthenticated = await checkIsAdmin();
  if (!isAuthenticated) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  const posts = await readPosts();
  const filtered = posts.filter((p) => p.id !== id);

  if (filtered.length === posts.length) {
    return { success: false, message: "Blog post not found." };
  }

  await writePosts(filtered);
  return { success: true, message: "Blog post deleted successfully." };
}
