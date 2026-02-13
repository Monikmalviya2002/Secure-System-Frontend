import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Auth from "./component/Auth";
import UserDashboard from "./user/UserDashboard";
import CreateIncident from "./user/CreateIncident";
import AdminDashboard from "./admin/AdminDashborad";
import SuperAdminUsers from "./superadmin/SuperAdminUsers";
import AuditLogs from "./superadmin/AuditLogs";
import SuperAdminDashboard from "./superadmin/SuperDashborad";

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

          <Route  path="/admin"  element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />
           

          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
               <SuperAdminDashboard/>
              </ProtectedRoute>
            }
          />
            
            <Route
          path="/superadmin/logs"
             element={
         <ProtectedRoute allowedRoles={["superadmin"]}>
              <AuditLogs />
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
