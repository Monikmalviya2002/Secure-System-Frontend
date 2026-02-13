import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../component/Navbar";



       function UserDashboard() {
       const [incidents, setIncidents] = useState([]);
        const [loading, setLoading] = useState(true);

       const [statusFilter, setStatusFilter] = useState("");
      const [categoryFilter, setCategoryFilter] = useState("");
            const [search, setSearch] = useState("");

            async function fetchIncidents() {
             try {
          setLoading(true);
         const res = await axios.get("/api/incident", {
            withCredentials: true,
             });
          setIncidents(res.data);
             } catch (err) {
           console.log("Error fetching incidents");
              } finally {
                setLoading(false);
                  }
              }

               useEffect(() => {
                fetchIncidents();
                  }, []);

             const filteredIncidents = incidents.filter((item) => {
               const matchStatus = statusFilter ? item.status === statusFilter : true;
          const matchCategory = categoryFilter ? item.category === categoryFilter : true;
                   const matchSearch = search
                 ? item.title.toLowerCase().includes(search.toLowerCase())
                : true;

             return matchStatus && matchCategory && matchSearch;
                   });

            return (
                  <div>
                     <Navbar/>
                  
                 <div className="p-6">
                  
            <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">My Incidents</h1>

            <Link
          to="/user/create"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          + Report Incident
        </Link>
           </div>

                 <div className="flex flex-wrap gap-2 mb-4">
                    <input
              type="text"
             placeholder="Search by title"
              className="border p-2 rounded"
          value={search}
             onChange={(e) => setSearch(e.target.value)}
                  />

               <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
           <option value="">All Status</option>
          <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            </select>

        <select
          className="border p-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Category</option>
            <option value="phishing">Phishing</option>
          <option value="malware">Malware</option>
            <option value="ransomware">Ransomware</option>
          <option value="unauthorized_access">Unauthorized Access</option>
        </select>

        
      </div>

      {loading ? (
        <p>Loading...</p>
            ) : filteredIncidents.length === 0 ? (
        <p>No incidents found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2 capitalize">
                    {item.category || "-"}
                  </td>
                  <td className="border p-2 capitalize">{item.status}</td>
                  <td className="border p-2 capitalize">{item.priority}</td>
                  <td className="border p-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
                </table>
              </div>
            )}
            </div>
             </div>
           );
             }

       export default UserDashboard;
