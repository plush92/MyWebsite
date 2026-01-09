// blogApi.ts
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/posts";

export async function createBlogPost({
  title,
  content,
  author,
  slug,
  date,
}: {
  title: string;
  content: string;
  author: string;
  slug: string;
  date?: string | null;
}) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, author, slug, date }),
  });
}

export async function fetchBlogPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function fetchBlogPostById(id: number | string) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function updateBlogPost(
  id: number | string,
  data: { date?: string | null; comment?: string }
) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteBlogPost(id: number | string) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
