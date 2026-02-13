import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Auth from "./component/Auth";
import UserDashboard from "./user/UserDashboard";
import CreateIncident from "./user/CreateIncident";

function App() {
  return (
          <AuthProvider>
              <BrowserRouter>
          <Routes>
          <Route path="/" element={<Auth />} />

          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/create"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <CreateIncident />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <h1>Admin Dashboard</h1>
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <h1>Super Admin Dashboard</h1>
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<h1>Not allowed</h1>} />
        </Routes>
         </BrowserRouter>
            </AuthProvider>
  );
}

export default App;
