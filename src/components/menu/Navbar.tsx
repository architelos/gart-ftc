import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import useMenuState from "@/hooks/useMenuState";
import assetMap from "@/data/assetMap";

function Navbar() {
  const [show, setShow] = useState(true);
  const [anim, setAnim] = useState("a-slide-up");
  const [logoAnim, setLogoAnim] = useState("a-fade-in");

  const open = useMenuState((state) => state.open);
  const setOpen = useMenuState((state) => state.setOpen);
  const footerVisible = useMenuState((state) => state.footerVisible);

  useEffect(() => {
    let timeout;

    if (footerVisible) {
      setAnim("a-slide-down");
      setLogoAnim("a-fade-out");

      timeout = setTimeout(() => setShow(false), 650);
    } else {
      setShow(true);
      setAnim("a-slide-up");
      setLogoAnim("a-fade-in");

      timeout = setTimeout(() => setAnim(""), 650); // technically not needed but it makes ts happy
    }

    // cleanup
    // this prevents memory leaks and perf issues
    return () => clearTimeout(timeout);
  }, [footerVisible]);

  if (!show) return null;
  return (
    <header className="z-100 fixed flex justify-between w-full p-page">
      <img className={`max-w-page max-h-page object-contain ${logoAnim}`} src={assetMap["logo.png"]} />

      <button className="overflow-hidden scale-on-hover cursor-pointer" onClick={() => setOpen(!open)}>
        {
          !open ? <Menu className={anim} style={{ color: "var(--color-text)", width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)", height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)" }} />
          : <X style={{ color: "var(--color-text)", width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)", height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)"  }} />
        }
      </button>
    </header>
  );
}

export default Navbar;
