import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogPosts.json');

async function readPosts() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function writePosts(posts: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function GET() {
  const posts = await readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const newPost = await request.json();
  if (!newPost.title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }
  const posts = await readPosts();
  // simple uuid generation using timestamp+random
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const postWithId = { id, ...newPost, date: new Date().toISOString() };
  posts.unshift(postWithId);
  await writePosts(posts);
  return NextResponse.json(postWithId, { status: 201 });
}
