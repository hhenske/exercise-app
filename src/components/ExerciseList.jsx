import { useEffect, useState } from "react";
import { fetchExercises } from "../api/exerciseApi";
import "../app.css";

function ExerciseList({ filters, onBack }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log("Filters received in ExerciseList:", filters);
  //   fetchExercises(filters).then(setExercises);
  // }, [filters]);


  useEffect(() => {
    async function load() {
      try {
        const json = await fetchExercises(40);
        let data = json.data;

        // Apply filters
        if (filters.exerciseType) {
          data = data.filter((ex) => ex.exerciseType === filters.exerciseType);
        }
        if (filters.bodyParts.length > 0) {
          data = data.filter((ex) =>
            filters.bodyParts.includes(ex.bodyPart)
          );
        }

        setExercises(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  if (loading) return <p>Loading exercises...</p>;

  return (
    <div>
      <button className="back-button" onClick={onBack}>
        ⬅ Back
      </button>

      <div className="exercise-list">
        {exercises.map((exercise) => (
          <div key={exercise.exerciseId} className="exercise-card">
            <h2>{exercise.name}</h2>
            <p>Type: {exercise.exerciseType}</p>
            {exercise.bodyPart && <p>Body Part: {exercise.bodyPart}</p>}
            {exercise.imageUrl && (
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                width="200"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList;


