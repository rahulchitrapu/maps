import React, { Suspense, lazy } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

const LazyMap1 = lazy(() => import("./maps/Map1"));
const LazyMap2 = lazy(() => import("./maps/Map2"));

const LazyDummy = lazy(() => import("./Dummy"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyMap1 />
            </Suspense>
          }
        ></Route>
        <Route
          path="/map"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyMap2 />
            </Suspense>
          }
        ></Route>

        <Route
          path="/dummy"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyDummy />
            </Suspense>
          }
        ></Route>

        <Route
          path="/dummy1"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <h1>helloo</h1>
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
