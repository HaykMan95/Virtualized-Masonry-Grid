import React, {
  lazy,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Image } from "Types";
import "./App.css";

const Home = lazy(() => import("Pages/Home"));
const Info = lazy(() => import("Pages/Info"));

interface AppContextType {
  page: number;
  setPage?: Dispatch<SetStateAction<number>>;
  setImages?: Dispatch<SetStateAction<Image[]>>;
  images: Image[];
}

export const AppContext = createContext<AppContextType>({
  page: 0,
  images: [],
});

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);

  return (
    <AppContext.Provider value={{ images, setImages, page, setPage }}>
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
    </AppContext.Provider>
  );
}

export default App;
