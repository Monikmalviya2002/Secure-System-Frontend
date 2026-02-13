import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";



        function CreateIncident() {
             const [formData, setFormData] = useState({
                 title: "",
               description: "",
              category: "",
             priority: "low",
              date: "",
        });

          const [evidence, setEvidence] = useState(null);
            const [error, setError] = useState("");
            const [loading, setLoading] = useState(false);

             const navigate = useNavigate();

            function handleChange(e) {
                 setFormData({
             ...formData,
            [e.target.name]: e.target.value,
               });
                  }

                function handleFileChange(e) {
              const file = e.target.files[0];
              if (!file) return;

            const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
           const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG, JPG, and PDF files are allowed");
      return;
    }

             if (file.size > maxSize) {
                 setError("File size must be less than 2MB");
            return;
           }

              setError("");
              setEvidence(file);
           }

             async function handleSubmit(e) {
                 e.preventDefault();
             setError("");

           if (!formData.title || !formData.description || !formData.category || !formData.date) {
      setError("Please fill in all required fields.");
      return;
          }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      if (evidence) data.append("evidence", evidence);

         await axios.post("/api/incident", data, {
        withCredentials: true,
           headers: { "Content-Type": "multipart/form-data" },
              });

      navigate("/user");
           } catch {
      setError("Failed to create incident. Please try again.");
           } finally {
      setLoading(false);
          }
           }

          return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-1">🚨 Report New Incident</h1>
        <p className="text-gray-500 mb-6">
          Fill in the details below to report a security incident.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-sm font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Suspicious email received"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={1}
              placeholder="Describe what happened..."
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="phishing">Phishing</option>
                <option value="malware">Malware</option>
                <option value="ransomware">Ransomware</option>
                <option value="unauthorized_access">Unauthorized Access</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Priority
              </label>
              <select
                name="priority"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">
              Incident Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium mb-1">
              Evidence (optional)
            </label>
            <div className="border-dashed border-2 rounded-lg p-2 text-center hover:bg-gray-50 transition">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG or PDF (max 2MB)
              </p>
            </div>
            {evidence && (
              <p className="text-sm text-green-600 mt-1">
                📎 {evidence.name} selected
              </p>
            )}
          </div>

         
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-2 rounded">
              {error}
            </div>
          )}

          
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading && (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            )}
            {loading ? "Submitting..." : "Submit Incident"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateIncident;
