import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



            function ProtectedRoute({ children, allowedRoles }) {
               const { user, loading } = useAuth();

           if (loading) return <p className="p-4">Loading...</p>;

                  if (!user) {
              return <Navigate to="/" replace />;
                      }

              if (allowedRoles && !allowedRoles.includes(user.role)) {
               return <Navigate to="/unauthorized" replace />;
                   }

           return children;
          }

  export default ProtectedRoute;
