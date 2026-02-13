import { useNavigate } from "react-router-dom";
import axios from "../api/axios";



        function Navbar() {
     const navigate = useNavigate();

         async function handleLogout() {
              try {
          await axios.post("/api/auth/logout", {}, { withCredentials: true });
         navigate("/"); 
          } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
     
      <h1 className="text-lg font-bold">
        SECURE INCIDENT REPORTING SYSTEM
      </h1>

     
      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}


  export default Navbar;
