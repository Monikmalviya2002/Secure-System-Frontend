import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/user" element={<h1>User Dashboard</h1>} />
        <Route path="/admin" element={<h1>Admin Dashboard</h1>} />
        <Route path="/superadmin" element={<h1>Super Admin Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
