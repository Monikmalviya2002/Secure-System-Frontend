import { useEffect, useState } from "react";
import axios from "../api/axios";



       function AuditLogs() {
        const [logs, setLogs] = useState([]);

      async function fetchLogs() {
        const res = await axios.get("/api/audit-logs", { withCredentials: true });
         setLogs(res.data);
         }

       useEffect(() => {
       fetchLogs();
         }, []);

     return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Audit Logs</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Action</th>
            <th className="border p-2">Incident</th>
            <th className="border p-2">User</th>
            <th className="border p-2">IP</th>
            <th className="border p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td className="border p-2 capitalize">{log.action}</td>
               <td className="border p-2">{log.incidentId?.title || "-"}</td>
              <td className="border p-2">{log.userId?.username}</td>
               <td className="border p-2">{log.ipAddress}</td>
              <td className="border p-2">
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
      );
     }

export default AuditLogs;
