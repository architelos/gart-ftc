import { useEffect } from "react";
import { useLocation, Outlet } from "react-router";

import { pageView } from "@/gtag";
import Footer from "@/components/Footer";
import Navbar from "@/components/menu/Navbar";
import Menu from "@/components/menu/Menu";
import useMenuState from "@/hooks/useMenuState";

function Layout() {
  const { pathname, search } = useLocation();
  const reset = useMenuState((state) => state.reset);

  useEffect(() => {
    reset();
    pageView(pathname + search); // technically location.search isnt needed
  }, [pathname, search, reset]);

  return (
    <div className="bg-bg">
      <Navbar />
      <Menu />

      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
