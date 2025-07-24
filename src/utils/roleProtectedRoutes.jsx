import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../context/AuthContext";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { role } = useAuthStore();

  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default RoleProtectedRoute;
