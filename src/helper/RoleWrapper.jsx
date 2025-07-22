import { useAuth } from "../context/AuthContext";

const RoleWrapper = ({ allowedRoles, children }) => {
  const { role } = useAuth();

  if (allowedRoles.includes(role)) {
    return children;
  }

  return null;
};

export default RoleWrapper;
