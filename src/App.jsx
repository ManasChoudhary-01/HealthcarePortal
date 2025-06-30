import React, { useRef, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Prescription from "./pages/Prescription/Prescription";
import ReceptionForm from "./components/ReceptionForm/ReceptionForm";
import Submitted from "./pages/Submitted/Submitted";

import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Prescription />} />
        <Route path="/submitted" element={<Submitted />} />
        <Route path="/reception" element={<ReceptionForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
  );
}

export default App;
