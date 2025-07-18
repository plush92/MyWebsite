// blogApi.ts
const API_URL = (import.meta as any).env.REACT_APP_API_URL || "http://localhost:3001";

export async function createBlogPost({ date, comment }: { date: string | null, comment: string }) {
  return fetch(`${API_URL}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, comment }),
  });
}

export async function fetchBlogPosts() {
  const res = await fetch(`${API_URL}/blog`);
  return res.json();
}

export async function fetchBlogPostById(id: number | string) {
  const res = await fetch(`${API_URL}/blog/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function updateBlogPost(id: number | string, data: { date?: string | null; comment?: string }) {
  return fetch(`${API_URL}/blog/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteBlogPost(id: number | string) {
    return fetch(`${API_URL}/blog/${id}`, {
        method: "DELETE",
    });
}

