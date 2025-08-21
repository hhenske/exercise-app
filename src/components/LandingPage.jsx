import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExercises } from "../api/exerciseApi";

export default function LandingPage({ onStart }) {
  const navigate = useNavigate();

  const [exerciseType, setExerciseType] = useState(""); // "strength" or "cardio"
  const [bodyParts, setBodyParts] = useState([]); // selected body parts
  const [availableBodyParts, setAvailableBodyParts] = useState([]); // for checkboxes
  const [loadingBodyParts, setLoadingBodyParts] = useState(false);

  // When exerciseType changes, fetch body parts if strength
  useEffect(() => {
    if (exerciseType === "strength") {
      setLoadingBodyParts(true);
      fetchExercises("strength")
        .then(data => {
          // collect unique body parts
          const parts = Array.from(
            new Set(data.flatMap(ex => ex.bodyParts))
          );
          setAvailableBodyParts(parts);
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingBodyParts(false));
    } else {
      setAvailableBodyParts([]);
      setBodyParts([]);
    }
  }, [exerciseType]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!exerciseType) return alert("Please select an exercise type");

    // pass selected filters to App
    onStart({ exerciseType, bodyParts });
    navigate("/exercises");
  };

  return (
    <div>
      <h1>Select Your Workout</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Exercise Type:
          <select
            value={exerciseType}
            onChange={e => setExerciseType(e.target.value)}
          >
            <option value="">--Choose--</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </select>
        </label>

        {exerciseType === "strength" && (
          <div>
            <h3>Choose Body Part(s)</h3>
            {loadingBodyParts ? (
              <p>Loading...</p>
            ) : (
              availableBodyParts.map(bp => (
                <label key={bp} style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    value={bp}
                    checked={bodyParts.includes(bp)}
                    onChange={e => {
                      const checked = e.target.checked;
                      setBodyParts(prev =>
                        checked
                          ? [...prev, bp]
                          : prev.filter(p => p !== bp)
                      );
                    }}
                  />
                  {bp}
                </label>
              ))
            )}
          </div>
        )}

        <button type="submit">Start Workout</button>
      </form>
    </div>
  );
}
