import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { GB, VN } from "country-flag-icons/react/3x2";

import useMenuState from "@/hooks/useMenuState";
import assetMap from "@/data/assetMap";
import useTheme from "@/hooks/useTheme";
import useLocale from "@/hooks/useLocale";

function Navbar() {
  const [show, setShow] = useState(true);
  const [anim, setAnim] = useState("a-fade-in");

  const open = useMenuState((state) => state.open);
  const setOpen = useMenuState((state) => state.setOpen);
  const footerVisible = useMenuState((state) => state.footerVisible);

  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const locale = useLocale((state) => state.locale);
  const toggleLocale = useLocale((state) => state.toggleLocale);

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
    <header className="z-100 fixed flex justify-between items-start w-full overflow-hidden p-page">
      <img className={`object-contain overflow-hidden ${anim}`} src={assetMap["logo.png"]} style={{ width: "calc(1.5 * var(--spacing-page))", height: "calc(1.5 * var(--spacing-page))" }} />
      <div className="flex flex-row justify-center items-center gap-x-s-one">
        {open ? locale === "en"
          ? <GB
              onClick={() => toggleLocale()}
              className="scale-on-hover cursor-pointer a-fade-in"
              style={{ width: "var(--spacing-page)", height: "var(--spacing-page)" }}
            />
          : <VN
              onClick={() => toggleLocale()}
              className="scale-on-hover cursor-pointer a-fade-in"
              style={{ width: "var(--spacing-page)", height: "var(--spacing-page)" }}
            />
          : <></>
        }
        {open ? theme === "dark"
          ? <Moon
              onClick={() => toggleTheme()}
              className="scale-on-hover cursor-pointer a-fade-in"
              style={{ color: "var(--color-accent)", width: "var(--spacing-page)", height: "var(--spacing-page)" }}
            />
          : <Sun
              onClick={() => toggleTheme()}
              className="scale-on-hover cursor-pointer a-fade-in"
              style={{ color: "var(--color-accent)", width: "var(--spacing-page)", height: "var(--spacing-page)" }}
            />
          : <></>
        }
        <button className={`flex justify-center items-center self-start overflow-hidden p-button rounded-md bg-accent cursor-pointer ${anim}`} onClick={() => setOpen(!open)}>
          {
          !open ? <Menu className="scale-on-hover" style={{ color: "var(--color-button)", width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)", height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)" }} />
          : <X className="scale-on-hover" style={{ color: "var(--color-button)", width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)", height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)"  }} />
        }
      </button>
      </div>
    </header>
  );
}

export default Navbar;
