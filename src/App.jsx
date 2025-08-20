import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ExerciseList from "./components/ExerciseList";

function App() {
  const [view, setView] = useState("landing"); // "landing" or "exercises"
  const [filters, setFilters] = useState({ exerciseType: null, bodyParts: [] });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Exercise App 🏋️</h1>

      {view === "landing" ? (
        <LandingPage
          onStart={(chosenFilters) => {
            setFilters(chosenFilters);
            setView("exercises");
          }}
        />
      ) : (
        <ExerciseList filters={filters} onBack={() => setView("landing")} />
      )}
    </div>
  );
}

export default App;
