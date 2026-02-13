import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";


        function Auth() {
        const [isLogin, setIsLogin] = useState(true);
      const [formData, setFormData] = useState({
                 username: "",
              emailId: "",
               password: "",
                });
          const [loading, setLoading] = useState(false);
               const [error, setError] = useState("");

            const navigate = useNavigate();
               const { setUser } = useAuth(); 

             function handleChange(e) {
      setFormData({
      ...formData,
      [e.target.name]: e.target.value,
          });
      }

            async function handleSubmit(e) {
                e.preventDefault();
              setError("");
              setLoading(true);

             try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
            const res = await axios.post(url, formData, {
        withCredentials: true,
           });

      const userData = res.data.data || res.data;
         setUser(userData); 
      const role = userData.role;

       if (role === "superadmin") {
           navigate("/superadmin");
      } else if (role === "admin") {
        navigate("/admin");
        } else {
        navigate("/user");
      }
           } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      } finally {
      setLoading(false);
    }
           }

             return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"> 
              <h2 className="text-4xl font-semibold text-center  mb-12">Secure Incident Reporting System</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          
           <h2 className="text-2xl font-semibold text-center mb-4">
                
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
             type="text"
              name="username"
            placeholder="Username"
            className="w-full border p-2 rounded"
              value={formData.username}
            onChange={handleChange}
              required
          />

          {!isLogin && (
            <input
                type="email"
              name="emailId"
              placeholder="Email"
                className="w-full border p-2 rounded"
              value={formData.emailId}
                onChange={handleChange}
              required
            />
          )}

          <input
            type="password"
              name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
               value={formData.password}
            onChange={handleChange}
               required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
              >
                Signup
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

       export default Auth;
