import { useState } from "react";
import SuperAdminUsers from "./SuperAdminUsers";
import AuditLogs from "./AuditLogs";
import Navbar from "../component/Navbar";

function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("users"); 

  return (
       <div>
         <Navbar/>
    <div className="p-6 space-y-6">

      
      <h1 className="text-2xl font-semibold mb-4">Super Admin Panel</h1>

      <div className="flex gap-4 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "users"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>

        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "logs"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("logs")}
        >
          Audit Logs
        </button>
      </div>

     
      <div>
        {activeTab === "users" && <SuperAdminUsers />}
        {activeTab === "logs" && <AuditLogs />}
      </div>
    </div>
      </div>
  );
}

export default SuperAdminDashboard;
