import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home.jsx";
import Ratings from "../src/pages/Ratings/Ratings.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<Home />} />
        <Route path="/ratings" element={<Ratings />} />
      </Route>
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
