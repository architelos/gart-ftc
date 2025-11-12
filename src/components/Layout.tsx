import { useEffect } from "react";
import { useLocation, Outlet } from "react-router";

import Footer from "@/components/Footer";
import Navbar from "@/components/menu/Navbar";
import Menu from "@/components/menu/Menu";
import useMenuState from "@/hooks/useMenuState";

function Layout() {
  const location = useLocation();
  const reset = useMenuState((state) => state.reset);

  useEffect(() => {
    reset();
  }, [location.pathname, reset]);

  return (
    <div className="app">
      <Navbar />
      <Menu />

      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
