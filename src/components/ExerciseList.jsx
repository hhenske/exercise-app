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

      <h2>Exercise List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li
            key={exercise.exerciseId}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{exercise.name}</h3>
            <p><strong>Type:</strong> {exercise.exerciseType}</p>
            <p><strong>Body Parts:</strong> {exercise.bodyParts.join(", ")}</p>
            <p><strong>Equipments:</strong> {exercise.equipments.join(", ")}</p>
            {/* Image */}
            {exercise.imageUrl && (
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
