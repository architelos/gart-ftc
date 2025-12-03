import { useEffect, useState } from "react";

function useFFOrSafari() {
  const [engine, setEngine] = useState({
    isFirefox: false,
    isSafari: false,
    isWebkit: false
  });

  useEffect(() => {
    const ua = navigator.userAgent;

    const isFirefox = /firefox/i.test(ua);
    const isSafari =
      /^((?!chrome|crios|fxios|opr|edg).)*safari/i.test(ua);

    const isWebkit = !/chrome|crios|opr|edg/i.test(ua) && /applewebkit/i.test(ua);

    setEngine({ isFirefox, isSafari, isWebkit });
  }, []);

  return engine.isFirefox || engine.isSafari || engine.isWebkit;
}

export default useFFOrSafari;
