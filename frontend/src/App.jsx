import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Profile,
  Register,
  AdminDashboard,
  AdminLogin,
  AddUser
} from "./pages";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <div className="container">
        <Routes>
            <Route path='/admin' element={null} />
            <Route path="*" element={<Header />} />
          </Routes>
          <Routes>
            {/* user routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            {/* admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/adduser" element={<AddUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
