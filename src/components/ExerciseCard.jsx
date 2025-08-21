// src/components/ExerciseCard.jsx
import React from "react";
import "../app.css"; // keep styles consistent

function ExerciseCard({ exercise }) {
  return (
    <div className="exercise-card">
      <h2>{exercise.name}</h2>
      <p>Type: {exercise.exerciseType}</p>
      <img
        src={exercise.imageUrl}
        alt={exercise.name}
        loading="lazy"
      />
    </div>
  );
}

export default ExerciseCard;
