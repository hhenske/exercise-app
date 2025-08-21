// src/api/exerciseApi.js
const API_BASE = "https://v2.exercisedb.dev/api/v1";

// Fetch exercises by type and optional body parts
export async function fetchExercises(exerciseType, bodyParts = []) {
  try {
    let url = `${API_BASE}/exercises?exerciseType=${exerciseType}`;

    // If strength, allow filtering by body parts
    if (exerciseType === "strength" && bodyParts.length > 0) {
      bodyParts.forEach(bp => {
        url += `&bodyPart=${encodeURIComponent(bp)}`;
      });
    }

    console.log("Fetching from:", url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${exerciseType} exercises`);

    const json = await res.json();
    return json.data; // API returns { data: [...] }
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fetch a combined list: strength + cardio
export async function fetchExerciseList(selectedBodyParts = []) {
  try {
    // Strength: up to 10
    const strengthExercises = await fetchExercises("strength", selectedBodyParts);
    const limitedStrength = strengthExercises.slice(0, 10);

    // Cardio: up to 2
    const cardioExercises = await fetchExercises("cardio");
    const limitedCardio = cardioExercises.slice(0, 2);

    // Merge
    return [...limitedStrength, ...limitedCardio];
  } catch (err) {
    console.error("Error fetching combined list:", err);
    return [];
  }
}
