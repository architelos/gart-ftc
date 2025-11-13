import { useState, useEffect } from "react";
import { GB } from "country-flag-icons/react/3x2";
import { VN } from "country-flag-icons/react/3x2";
import { Moon, Sun } from "lucide-react";

import useMenuState from "@/hooks/useMenuState";
import useLocale from "@/hooks/useLocale";
import useTheme from "@/hooks/useTheme";
import Text from "@/components/Text";

function Menu() {
  const [render, setRender] = useState(false);
  const [out, setOut] = useState(false);
  const open = useMenuState((state) => state.open);

  const locale = useLocale((state) => state.locale);
  const toggleLocale = useLocale((state) => state.toggleLocale);

  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

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
  if (!render) return null;

  return (
    <nav className={`z-99 fixed flex flex-col justify-between w-full h-screen p-page bg-bg ${out ? "a-fade-out" : "a-vert"}`}>
      <div className="mt-auto">
        <div className="flex md:flex-row flex-col-reverse justify-between gap-y-page w-full">
          <div className="flex flex-col gap-y-s-two">
            <Text type="sub" link={true} href="/privacy_policy">Privacy Policy</Text>
            <Text type="title" link={true} href="/">Home</Text>
            <Text type="title" link={true} href="/about">About</Text>
            <Text type="title" link={true} href="/robot">Our Robot</Text>
            <Text type="title" link={true} href="/sponsor">Sponsor Us</Text>
          </div>

          <div className="flex flex-row md:self-end gap-x-s-one max-sm:pb-page">
            {locale === "vn"
            ? <GB
                onClick={() => toggleLocale()}
                className="scale-on-hover cursor-pointer"
                style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
            : <VN
                onClick={() => toggleLocale()}
                className="scale-on-hover cursor-pointer"
                style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
            }

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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
