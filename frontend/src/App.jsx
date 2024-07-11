import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/Home.jsx";
import Ratings from "../src/pages/Ratings/Ratings.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminPlayers from "./pages/AdminPlayers/AdminPlayers.jsx";
import AdminTournaments from "./pages/AdminTournaments/AdminTournaments.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<Home />} />
        <Route path="ratings" element={<Ratings />} />
        {/* <Route path="contactus" element={<ContactUs />} /> */}
      </Route>
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="players" />} />
        {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
        <Route path="players" element={<AdminPlayers />} />
        {/* <Route path="tournaments" element={<AdminTournaments />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
