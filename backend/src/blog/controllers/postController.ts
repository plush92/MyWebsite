import { Request, Response } from 'express';
import * as postModel from '../models/postModel.js';
import { createRequestLogger } from '../utils/logger.js';
import {
  logDatabaseOperation,
  logApiResponse,
} from '../utils/requestLogger.js';

// Create a new post
export async function createPost(req: Request, res: Response) {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const startTime = Date.now();

  try {
    const { title, content, author, slug } = req.body;

    logger.info('Creating new post', { title, author, slug });

    const newPost = await postModel.insertPost(title, content, author, slug);
    const duration = Date.now() - startTime;

    logDatabaseOperation(req, 'INSERT', 'posts', duration, 1);
    logApiResponse(req, 201, 'Post created successfully', {
      postId: newPost.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Failed to create post', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration,
      body: req.body,
    });

    logApiResponse(req, 500, 'Failed to create post');
    res.status(500).json({
      error: 'Failed to create post',
      requestId: req.requestId,
    });
  }
}

// Get all posts
export async function getPosts(req: Request, res: Response) {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const startTime = Date.now();

  try {
    logger.debug('Fetching all posts');

    const posts = await postModel.getAllPosts();
    const duration = Date.now() - startTime;

    logDatabaseOperation(req, 'SELECT', 'posts', duration, posts.length);
    logApiResponse(req, 200, 'Posts fetched successfully', {
      count: posts.length,
    });

    res.json(posts);
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Failed to fetch posts', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration,
    });

    logApiResponse(req, 500, 'Failed to fetch posts');
    res.status(500).json({
      error: 'Failed to fetch posts',
      requestId: req.requestId,
    });
  }
}

// Get a single post by ID
export async function getPostById(req: Request, res: Response) {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const startTime = Date.now();

  try {
    const { id } = req.params;
    const postId = Number(id);

    logger.info('Fetching post by ID', { postId });

    const post = await postModel.getPostById(postId);
    const duration = Date.now() - startTime;

    logDatabaseOperation(req, 'SELECT', 'posts', duration, post ? 1 : 0);

    if (post) {
      logApiResponse(req, 200, 'Post found', { postId });
      res.json(post);
    } else {
      logApiResponse(req, 404, 'Post not found', { postId });
      res.status(404).json({
        error: 'Post not found',
        requestId: req.requestId,
      });
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Failed to fetch post by ID', {
      error: error instanceof Error ? error.message : 'Unknown error',
      postId: req.params.id,
      duration,
    });

    logApiResponse(req, 500, 'Failed to fetch post');
    res.status(500).json({
      error: 'Failed to fetch post',
      requestId: req.requestId,
    });
  }
}

// Delete a post by ID
export async function deletePost(req: Request, res: Response) {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const startTime = Date.now();

  try {
    const { id } = req.params;
    const postId = Number(id);

    logger.info('Deleting post', { postId });

    await postModel.deletePost(postId);
    const duration = Date.now() - startTime;

    logDatabaseOperation(req, 'DELETE', 'posts', duration, 1);
    logApiResponse(req, 204, 'Post deleted successfully', { postId });

    res.status(204).send();
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Failed to delete post', {
      error: error instanceof Error ? error.message : 'Unknown error',
      postId: req.params.id,
      duration,
    });

    logApiResponse(req, 500, 'Failed to delete post');
    res.status(500).json({
      error: 'Failed to delete post',
      requestId: req.requestId,
    });
  }
}

// Update a post by ID
export async function updatePost(req: Request, res: Response) {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const startTime = Date.now();

  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const postId = Number(id);

    logger.info('Updating post', { postId, title, author });

    const updatedPost = await postModel.updatePost(postId, {
      title,
      content,
      author,
    });
    const duration = Date.now() - startTime;

    logDatabaseOperation(req, 'UPDATE', 'posts', duration, updatedPost ? 1 : 0);

    if (updatedPost) {
      logApiResponse(req, 200, 'Post updated successfully', { postId });
      res.json(updatedPost);
    } else {
      logApiResponse(req, 404, 'Post not found for update', { postId });
      res.status(404).json({
        error: 'Post not found',
        requestId: req.requestId,
      });
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Failed to update post', {
      error: error instanceof Error ? error.message : 'Unknown error',
      postId: req.params.id,
      duration,
      body: req.body,
    });

    logApiResponse(req, 500, 'Failed to update post');
    res.status(500).json({
      error: 'Failed to update post',
      requestId: req.requestId,
    });
  }
}
