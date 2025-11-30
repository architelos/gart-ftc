import { useEffect, useState, useRef } from "react";
import { register } from "avif.js";

import App from "@/App.tsx";
import Preloader from "@/components/Preloader.tsx";
import preload from "@/data/preload.json";
import assetMap from "@/data/assetMap";

type PreloadKey = "*" | "/" | "/about" | "/sponsor";

const FONT_TIMEOUT = 2000;
const ASSET_TIMEOUT = 5000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(null as T), ms))
  ]);
}

async function assets() {
  const loaded = await Promise.allSettled([
    new FontFace("Montserrat", 'url("/Montserrat-Medium.woff2")', { weight: "500", style: "normal" }),
    new FontFace("Montserrat", 'url("/Montserrat-Semibold.woff2")', { weight: "600", style: "normal" }),
    new FontFace("Montserrat", 'url("/Montserrat-Bold.woff2")', { weight: "700", style: "normal" })
  ].map((f) => withTimeout(f.load(), FONT_TIMEOUT)));
  loaded.forEach((f) => {
    if (f.status === "fulfilled") document.fonts.add(f.value);
  });
  await document.fonts.ready;
  console.info("--- assets: preloaded fonts");

  const srcs = [...preload["*"], ...preload[window.location.pathname as PreloadKey]];
  await Promise.allSettled(
    srcs.map((src) => withTimeout(new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = () => {
        console.warn(`--- assets: couldn't preload ${src}`);
        reject();
      };
      img.src = assetMap[src];
    }), ASSET_TIMEOUT))
  );
  console.info(`--- assets: preloaded a total of ${srcs.length} images for ${window.location.pathname}`);
}

async function polyfills() {
  if (!("IntersectionObserver" in window) || !("IntersectionObserverEntry" in window)) {
    console.info("--- polyfill: IntersectionObserver not found");
  }

  const avifSupported = await new Promise((resolve) => {
    const avif = new Image();
    avif.src = "data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEOAAEAAAAAAAAAIgAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAABAA0AAIAAAAAMYXYxQ4EgAgAAAAAUaXNwZQAAAAAAAAAQAAAAEAAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEgYIDhAAAACptZGF0EgAKCDgM/9lAQ0AIMhQQAAAAFLm4wN/TRReKCcSo648oag==";
    avif.onerror = () => { resolve(false); };
    avif.onload = () => { resolve(avif.naturalWidth > 0 || avif.naturalHeight > 0); };
  });
  if (!avifSupported) {
    console.info("--- polyfill: no AVIF support");

    register("/avif-sw.js");
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
      await polyfills();
      await assets();

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
