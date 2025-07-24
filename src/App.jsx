import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./utils/roleProtectedRoutes";

import Login from "./components/Authentication/Login";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrescriptionForm from "./components/Prescription/Form/Form";
// import Prescription from "./pages/Prescription/Prescription";
import ReceptionRegister from "./components/Reception/Register/ReceptionForm";
import Submitted from "./pages/Submitted/Submitted";
import Registration from "./pages/Registration/Registration";
import Appointment from "./components/Reception/Appointment/Appointment";
import Queue from "./components/Reception/Queue/Queue";


function App() {

  // useEffect(() => {
  //   const ejectInterceptors = setupAxiosInterceptors();
  //   return () => ejectInterceptors();
  // }, []);


  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/prescription/:patientId" element={<PrescriptionForm />} />
      {/* <Route path="/prescriptionsubmitted" element={<Submitted />} /> */}
      {/* <Route path="/register" element={<Registration />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/appointment" element={<Appointment />} />
      <Route path="/queue" element={<Queue />} />

      <Route
        path="/reception_register"
        element={
          <RoleProtectedRoute allowedRoles={['RECEPTIONIST', 'ADMIN']}>
            <ReceptionRegister />
          </RoleProtectedRoute>} />

    </Routes>
  );
}

export default App;
