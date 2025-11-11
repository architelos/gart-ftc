import { Outlet } from "react-router";

import Footer from "@/components/Footer";

function Layout() {
  return (
    <div className="app">
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
