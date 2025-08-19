const BASE_URL = "https://v2.exercisedb.dev/api/v1/exercises";

export async function fetchExercises(limit = 20, cursor = null, filters = {}) {
  const params = new URLSearchParams({ limit, ...filters });
  if (cursor) params.append("cursor", cursor);

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();

}