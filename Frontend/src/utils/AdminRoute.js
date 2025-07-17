import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, userRole } = useContext(AuthContext);
  if (!token || userRole !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
