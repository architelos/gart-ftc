import { useState, useEffect } from "react";

function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mql = window.matchMedia("(hover: hover)");
    setCanHover(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setCanHover(e.matches);
    };

    mql.addEventListener("change", handler);

    return () => mql.removeEventListener("change", handler);
  }, []);

  return canHover;
}

export default useCanHover;
