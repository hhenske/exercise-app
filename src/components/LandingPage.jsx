import { useState } from "react";

function LandingPage({ onStart }) {
  const [exerciseType, setExerciseType] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  const bodyPartOptions = [
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Shoulders",
    "Core",
  ];

  function toggleBodyPart(part) {
    if (bodyParts.includes(part)) {
      setBodyParts(bodyParts.filter((p) => p !== part));
    } else {
      setBodyParts([...bodyParts, part]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onStart({ exerciseType, bodyParts });
  }

  return (
    <div className="landing">
      <h1>Welcome to Exercise App 🏋️</h1>
      <p>Select your preferences to get started:</p>

      <form onSubmit={handleSubmit}>
        {/* Cardio vs Strength */}
        <div>
          <label>
            <input
              type="radio"
              name="exerciseType"
              value="cardio"
              checked={exerciseType === "cardio"}
              onChange={(e) => setExerciseType(e.target.value)}
            />
            Cardio
          </label>
          <label>
            <input
              type="radio"
              name="exerciseType"
              value="strength"
              checked={exerciseType === "strength"}
              onChange={(e) => setExerciseType(e.target.value)}
            />
            Strength
          </label>
        </div>

        {/* Strength Body Part Checkboxes */}
        {exerciseType === "strength" && (
          <div>
            <h3>Select body parts:</h3>
            {bodyPartOptions.map((part) => (
              <label key={part}>
                <input
                  type="checkbox"
                  checked={bodyParts.includes(part)}
                  onChange={() => toggleBodyPart(part)}
                />
                {part}
              </label>
            ))}
          </div>
        )}

        <button type="submit">Show Exercises</button>
      </form>
    </div>
  );
}

export default LandingPage;
