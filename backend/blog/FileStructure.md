# Blog Backend File Structure

## What does each part do?

### `controllers/`

- **Purpose:** Handle the business logic for each route (e.g., what happens when someone creates a post or user).
- **Example:** `postController.ts` might have functions like `createPost`, `getPosts`, etc.

### `models/`

- **Purpose:** Define how you interact with the database (queries, table structure, etc.).
- **Example:** `postModel.ts` might have functions to fetch, insert, or update posts in the database.

### `routes/`

- **Purpose:** Define the API endpoints and connect them to controllers.
- **Example:** `postRoutes.ts` might define `/api/posts` and connect it to the controller functions.

### `db/`

- **Purpose:** Database connection logic and migration scripts.
- **Example:** `index.ts` sets up the connection pool (like your `db.js`), and `migrations/` holds SQL files for creating/updating tables.

### `utils/`

- **Purpose:** Helper functions, validation, logging, etc.
- **Example:** `validators.ts` for input validation, `logger.ts` for logging.

### `app.ts`

- **Purpose:** Sets up your Express app, middleware, and routes.

### `server.ts`

- **Purpose:** Starts the server (listens on a port).

### `config.ts`

- **Purpose:** Central place for configuration (like reading from `.env`).

### `package.json`, `tsconfig.json`, `.env`, `README.md`

- **Purpose:** Standard project files for dependencies, TypeScript config, environment variables, and documentation.

---

## Why is this structure recommended?

- **Separation of concerns:** Each folder/file has a clear responsibility.
- **Scalability:** Easy to add new features (like more controllers, models, or routes).
- **Maintainability:** Easier to find and update code.
- **Reusability:** Utilities and models can be reused across controllers/routes.

---

## Summary

This structure is modeled after best practices for Node.js/Express backends and is widely used in real-world projects. It keeps your code organized, scalable, and easy to maintain as your app grows or as you add
