import { useEffect, useState, useRef } from "react";
import avif from "avif.js";

import App from "@/App.tsx";
import Preloader from "@/components/Preloader.tsx";
import preload from "@/data/preload.json";
import assetMap from "@/data/assetMap";

type PreloadKey = "*" | "/" | "/about" | "/sponsor";

async function assets() {
  const loaded = await Promise.all([
    new FontFace("Montserrat", 'url("/Montserrat-Medium.woff2")', { weight: "500", style: "normal" }),
    new FontFace("Montserrat", 'url("/Montserrat-Semibold.woff2")', { weight: "600", style: "normal" }),
    new FontFace("Montserrat", 'url("/Montserrat-Bold.woff2")', { weight: "700", style: "normal" })
  ].map((f) => f.load()));
  loaded.forEach((f) => document.fonts.add(f));
  await document.fonts.ready;
  console.log("preloaded fonts");

  const srcs = [...preload["*"], ...preload[window.location.pathname as PreloadKey]];
  await Promise.all(
    srcs.map((src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = assetMap[src];
    }))
  );
  console.log(`preloaded a total of ${srcs.length} images for ${window.location.pathname}`);
}

async function polyfills() {
  await new Promise((resolve) => {
    if (
      "fetch" in window &&
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window
    ) {
      resolve(null); // no need!
      return;
    }

    console.log("IntersectionObserver not found, loading polyfill...");

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&features=IntersectionObserver%2CIntersectionObserverEntry%2Cfetch";
    script.crossOrigin = "anonymous";
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  });

  const avifSupported = await new Promise((resolve) => {
    const avif = new Image();
    avif.src = "data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEOAAEAAAAAAAAAIgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAABAA0AAIAAAAAMYXYxQ4EgAgAAAAAUaXNwZQAAAAAAAAAQAAAAEAAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEgYIDhAAAACptZGF0EgAKCDgM/9lAQ0AIMhQQAAAAFLm4wN/TRReKCcSo648oag==";
    avif.onerror = () => { resolve(false); };
    avif.onload = () => { resolve(avif.naturalWidth > 0 || avif.naturalHeight > 0); };
  });
  if (!avifSupported) {
    console.log("no AVIF support, loading polyfill...");

    avif.register("/avif-sw.js");
  }
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
