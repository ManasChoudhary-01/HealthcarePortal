import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import RoleProtectedRoute from "./utils/roleProtectedRoutes";

import Login from "./components/Authentication/Login";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Dashboard from "./pages/Dashboard/Dashboard";

import ReceptionRegister from "./components/Reception/Register/ReceptionForm";
import Appointment from "./components/Reception/Appointment/Appointment";
import Queue from "./components/Reception/Queue/Queue";

import PrescriptionForm from "./components/Prescription/Form/Form";
import PrescriptionTemplate from "./components/Prescription/Template/Template";

function App() {

  // useEffect(() => {
  //   const ejectInterceptors = setupAxiosInterceptors();
  //   return () => ejectInterceptors();
  // }, []);


  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/reception_register"
        element={
          <RoleProtectedRoute allowedRoles={['RECEPTIONIST', 'ADMIN']}>
            <ReceptionRegister />
          </RoleProtectedRoute>}
      />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/queue" element={<Queue />} />
      <Route path="/prescription/:patientId" element={<PrescriptionForm />} />
      <Route path="/prescription_template" element={<PrescriptionTemplate />} />

    </Routes>
  );
}

export default App;
