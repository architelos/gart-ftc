import { createBrowserRouter, RouterProvider } from "react-router";
import { ReactLenis } from "lenis/react";

import "./App.css";
import "lenis/dist/lenis.css";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Robot from "@/pages/Robot";
import Sponsor from "@/pages/Sponsor"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "robot", element: <Robot />},
        { path: "sponsor", element: <Sponsor />}
      ]
    }
  ]);

  return (
    <ReactLenis
      root
      options={{
        duration: 0.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      <RouterProvider router={router} />
    </ReactLenis>
  );
};

export default App;
