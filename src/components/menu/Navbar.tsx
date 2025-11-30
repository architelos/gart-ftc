import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

import useMenuState from "@/hooks/useMenuState";
import assetMap from "@/data/assetMap";
import useTheme from "@/hooks/useTheme";

function Navbar() {
  const [show, setShow] = useState(true);
  const [anim, setAnim] = useState("a-fade-in");

  const open = useMenuState((state) => state.open);
  const setOpen = useMenuState((state) => state.setOpen);
  const footerVisible = useMenuState((state) => state.footerVisible);

  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  useEffect(() => {
    let timeout;

    if (footerVisible) {
      setAnim("a-fade-out");
      timeout = setTimeout(() => setShow(false), 650);
    } else {
      setShow(true);
      setAnim("a-fade-in");
      timeout = setTimeout(() => setAnim(""), 650); // technically not needed but it makes ts happy
    }

    // cleanup
    // this prevents memory leaks and perf issues
    return () => clearTimeout(timeout);
  }, [footerVisible]);

  if (!show) return null;
  return (
    <header className="z-100 fixed flex justify-between w-full overflow-hidden p-page">
      <img className={`object-contain overflow-hidden ${anim}`} src={assetMap["logo.png"]} style={{ width: "calc(1.5 * var(--spacing-page))", height: "calc(1.5 * var(--spacing-page))" }} />
      <div className="flex flex-row justify-center items-center gap-x-page">
        {theme === "light"
          ? <Moon
              onClick={() => toggleTheme()}
              className="scale-on-hover cursor-pointer"
              style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }}
            />
          : <Sun
              onClick={() => toggleTheme()}
              className="scale-on-hover cursor-pointer"
              style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }}
            />
        }
        <button className={`flex justify-center items-center self-start overflow-hidden p-button rounded-md bg-accent cursor-pointer ${anim}`} onClick={() => setOpen(!open)}>
        {
          !open ? <Menu className="scale-on-hover" style={{ color: "var(--color-text)", width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)", height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)" }} />
          : <X className="scale-on-hover" style={{ color: "var(--color-text)", width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)", height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)"  }} />
        }
      </button>

      </div>
    </header>
  );
}

export default Navbar;
