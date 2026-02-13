import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#f97316", "#22c55e"];

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchStats() {
    try {
      const res = await axios.get("/api/admin/stats", { withCredentials: true });
      setStats(res.data);
    } catch (err) {
      setError("Failed to load analytics");
    }
  }

  async function fetchIncidents() {
    try {
      setLoading(true);
      const res = await axios.get("/api/incident", {
        params: { status, category, sortBy },
        withCredentials: true,
      });

      // 🔒 Crash-proofing
      setIncidents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [status, category, sortBy]);

  if (!stats) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const pieData = [
    { name: "Open", value: stats.openVsResolved?.open || 0 },
    { name: "Resolved", value: stats.openVsResolved?.resolved || 0 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Analytics Dashboard</h1>

      {/* 📊 Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="border p-4 rounded">
          <h2>Total Incidents</h2>
          <p className="text-3xl font-bold">{stats.totalIncidents}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Avg Resolution Time (hrs)</h2>
          <p className="text-3xl font-bold">
            {stats.avgResolutionTime ?? "N/A"}
          </p>
        </div>

        <div className="border p-4 rounded h-[260px]">
          <h2>Open vs Resolved</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={70} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="border p-4 rounded h-[260px]">
          <h2>Most Common Categories</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={stats.categories || []}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔎 Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Phishing">Phishing</option>
          <option value="Malware">Malware</option>
          <option value="Ransomware">Ransomware</option>
          <option value="Unauthorized Access">Unauthorized Access</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="severity">Sort by Severity</option>
          <option value="reports">Sort by User Reports</option>
        </select>
      </div>

      {/* 📋 Incident List */}
      <div className="border rounded overflow-x-auto">
        {loading ? (
          <p className="p-4">Loading incidents...</p>
        ) : incidents.length === 0 ? (
          <p className="p-4 text-gray-500">No incidents found.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Category</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{i.title}</td>
                  <td className="p-2 capitalize">{i.status}</td>
                  <td className="p-2">{i.category}</td>
                  <td className="p-2">{i.priority}</td>
                  <td className="p-2">
                    {new Date(i.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
