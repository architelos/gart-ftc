import { Outlet } from "react-router";

import Footer from "@/components/Footer";
import Navbar from "@/components/menu/Navbar";

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
