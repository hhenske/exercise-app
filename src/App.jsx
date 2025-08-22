import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ExerciseList from "./components/ExerciseList";

function App() {
  const [filters, setFilters] = useState({ exerciseType: null, bodyParts: [] });

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={
            <LandingPage
              filters={filters}
              setFilters={setFilters}
              onStart={(chosenFilters) => setFilters(chosenFilters)}
            />
          }
        />

        {/* Exercise list page */}
        <Route
          path="/exercises"
          element={<ExerciseList filters={filters} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
