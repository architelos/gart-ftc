import { useEffect, useState, useRef } from "react";
// import avif from "avif.js";

import App from "@/App.tsx";
import Preloader from "@/components/Preloader.tsx";

async function assets() {
  // TODO
  await document.fonts.ready;

  await new Promise((resolve) => { setTimeout(resolve, 500); });
}

async function polyfills() {
  // TODO
  await new Promise((resolve) => { setTimeout(resolve, 500); });
}

// -----

const AppRoot = () => {
  const [ready, setReady] = useState(false);
  const [fade, setFade] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async() => {
      // finish anis
      await new Promise((resolve) => { setTimeout(resolve, 300); });

      // ;)
      console.log("%cbuilt %cwith %c<3 %cby %cKhanh %cand %cDung %c:)", " ", " ", "color: #ff0000; ", " ", "font-weight: bold; ", " ", "font-weight: bold; ", "color: #d0021b; ");
      await assets();
      await polyfills();

      setFade(true);
      timeout.current = setTimeout(() => {
        setReady(true);
      }, 300);
    })();

    // cleanup
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return (ready ? <App /> : <Preloader fade={fade} />);
}

export default AppRoot;
