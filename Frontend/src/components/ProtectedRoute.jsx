import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  
  if (!token) {
    // If there's no token, redirect to the Admin Portal Login
    return <Navigate to="/admin" replace />;
  }

  // If token exists, allow access to the protected route
  return children;
}
