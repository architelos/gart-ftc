import { useState, useEffect } from "react";

import useMenuState from "@/hooks/useMenuState";

function Menu() {
  const [render, setRender] = useState(false);
  const [out, setOut] = useState(false);
  const open = useMenuState((state) => state.open);

  useEffect(() => {
    if (open) {
      setRender(true);
      setOut(false);
    } else if (render) {
      setOut(true);

      const timeout = setTimeout(() => {
        setRender(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open, render]);
  if (!render) return;

  return (
    <nav className={`z-99 fixed w-full h-screen p-page bg-bg ${out ? "a-fade-in" : "a-vert"}`}>

    </nav>
  );
}

export default Menu;
