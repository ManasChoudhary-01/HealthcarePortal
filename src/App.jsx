import React, { useRef, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Prescription from "./pages/Prescription/Prescription";
import Submitted from "./pages/Submitted/Submitted";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Prescription />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
  );
}

export default App;
