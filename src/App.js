import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, AddReview, Whoops404 } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="addreview" element={<AddReview />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}



export default App;
