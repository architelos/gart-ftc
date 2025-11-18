import { useEffect, useState } from "react";

// we use a hook to handle resize cleanly
function useIsMd() {
  const [isMd, setIsMd] = useState(() => window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMd(e.matches);

    query.addEventListener("change", onChange);
    // cleanup
    return () => query.removeEventListener("change", onChange);
  }, []);

  return isMd;
}

export default useIsMd;
