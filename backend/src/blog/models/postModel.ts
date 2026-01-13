import pool from '../db/db.js';

// Insert a new post
export async function insertPost(
  title: string,
  content: string,
  author: string,
  slug: string
) {
  const result = await pool.query(
    'INSERT INTO blog_posts (title, content, author, slug) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, author, slug]
  );
  return result.rows[0];
}

// Get all posts
export async function getAllPosts() {
  const result = await pool.query(
    'SELECT * FROM blog_posts ORDER BY created_at DESC'
  );
  return result.rows;
}

// (Optional) Get a single post by ID
export async function getPostById(id: number) {
  const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [
    id,
  ]);
  return result.rows[0];
}

// (Optional) Delete a post by ID
export async function deletePost(id: number) {
  await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
}

// Update a post by ID
export async function updatePost(
  id: number,
  data: { title: string; content: string; author: string }
) {
  const result = await pool.query(
    'UPDATE blog_posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
    [data.title, data.content, data.author, id]
  );
  return result.rows[0];
}
