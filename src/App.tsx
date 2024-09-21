import React, { lazy } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("Pages/Home"));
const Info = lazy(() => import("Pages/Info"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="/info/:imageId"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Info />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
