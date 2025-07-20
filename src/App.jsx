import React, { useRef, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./utils/roleProtectedRoutes";

import Login from "./components/Authentication/Login";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Dashboard from "./pages/Dashboard/Dashboard";
import Prescription from "./pages/Prescription/Prescription";
import ReceptionForm from "./components/ReceptionForm/ReceptionForm";
import Submitted from "./pages/Submitted/Submitted";
import Registration from "./pages/Registration/Registration";


function App() {

  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* <Route path="/prescription" element={<Prescription />} />
        <Route path="/prescriptionsubmitted" element={<Submitted />} /> */}
        {/* <Route path="/register" element={<Registration />} /> */}

        <Route path="/reception" element={<ReceptionForm />} />
        
        <Route
          path="/reception"
          element={
            <RoleProtectedRoute allowedRoles={['RECEPTIONIST', 'ADMIN']}>
              <ReceptionForm />
            </RoleProtectedRoute>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
