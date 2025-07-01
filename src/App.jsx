import React, { useRef, useState } from "react";
import { Routes, Route } from 'react-router-dom';

import Dashboard from "./pages/Dashboard/Dashboard";
import Prescription from "./pages/Prescription/Prescription";
import ReceptionForm from "./components/ReceptionForm/ReceptionForm";
import Submitted from "./pages/Submitted/Submitted";
import Registration from "./pages/Registration/Registration";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/prescriptionsubmitted" element={<Submitted />} />
        <Route path="/reception" element={<ReceptionForm />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
  );
}

export default App;
