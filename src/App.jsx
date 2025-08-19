import { useEffect, useState } from "react";
import { fetchExercises } from "./api/exerciseApi";
import './app.css'

function App() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const json = await fetchExercises(40); // fetch 40 exercises
        setExercises(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading exercises...</p>;

  function ExerciseCard({ exercise }) {
    return (
      <div className="exercise-card">
        <h2>{exercise.name}</h2>
        <p>Type: {exercise.exerciseType}</p>

        {/* Display image */}
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Exercise App 🏋️</h1>

      {/* Loop through all exercises */}
      <div className="exercise-list">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.exerciseId} exercise={exercise} />
      ))}
      </div>
    </div>
  );
}

export default App;
