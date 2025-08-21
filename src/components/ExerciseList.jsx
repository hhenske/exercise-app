import { useEffect, useState } from "react";
import { fetchExerciseList } from "../api/exerciseApi";

export default function ExerciseList({ selectedFilters }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function loadExercises() {
      const data = await fetchExerciseList(selectedFilters.bodyParts);
      setExercises(data);
    }
    loadExercises();
  }, [selectedFilters]);

  return (
    <div>
      <h2>Exercises</h2>
    <ul>
  {exercises.map((ex, index) => (
    <li key={ex.exerciseId || `${ex.name}-${index}`}>
      <strong>{ex.name}</strong> — {ex.exerciseType} — {ex.bodyParts.join(", ")}
    </li>
  ))}
</ul>
    </div>
  );
}

