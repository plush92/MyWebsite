import pool from '../db/db';

// Insert a new user
export async function insertUser(name: string, email: string) {
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
}

// Get all users
export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
  return result.rows;
}

// (Optional) Get a single user by ID
export async function getUserById(id: number) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

// (Optional) Delete a user by ID
export async function deleteUser(id: number) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
}
