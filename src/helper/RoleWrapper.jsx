import useAuthStore from "../context/useAuthStore";

const RoleWrapper = ({ allowedRoles, children }) => {
  const { role } = useAuthStore();

  if (allowedRoles.includes(role)) {
    return children;
  }

  return null;
};

export default RoleWrapper;
