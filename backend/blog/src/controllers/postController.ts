import { Request, Response } from 'express';
import * as postModel from '../models/postModel';

// Create a new post
export async function createPost(req: Request, res: Response) {
  try {
    const { title, content, author } = req.body;
    const newPost = await postModel.insertPost(title, content, author);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
}

// Get all posts
export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

// (Optional) Get a single post by ID
export async function getPostById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const post = await postModel.getPostById(Number(id));
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}

// (Optional) Delete a post by ID
export async function deletePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await postModel.deletePost(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
}