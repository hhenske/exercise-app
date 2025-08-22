import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchExerciseList } from "../api/exerciseApi";

export default function ExerciseList({ filters }) {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadExercises() {
      if (!filters.exerciseType) return; // guard against empty
      const data = await fetchExerciseList(filters.bodyParts);
      setExercises(data);
    }
    loadExercises();
  }, [filters]);

  return (
    <div>
      <button
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

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
