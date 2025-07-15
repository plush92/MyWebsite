import pool from '../db/db';

// Insert a new post
export async function insertPost(title: string, content: string, author: string) {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
    [title, content, author]
  );
  return result.rows[0];
}

// Get all posts
export async function getAllPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
}

// (Optional) Get a single post by ID
export async function getPostById(id: number) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
}

// (Optional) Delete a post by ID
export async function deletePost(id: number) {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
}