import { useState, useEffect } from "react";
import { GB } from "country-flag-icons/react/3x2";
import { VN } from "country-flag-icons/react/3x2";
import { Moon, Sun } from "lucide-react";

import Text from "@/components/Text";
import useMenuState from "@/hooks/useMenuState";
import useLocale from "@/hooks/useLocale";
import useTheme from "@/hooks/useTheme";
import translations from "@/data/translations";

function Menu() {
  const [render, setRender] = useState(false);
  const [out, setOut] = useState(false);
  const open = useMenuState((state) => state.open);

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
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
    <nav className={`z-99 fixed md:top-0 md:right-0 flex flex-col justify-between w-full md:w-fit h-dvh p-page bg-bg md:bg-bg/80 ${out ? "a-fade-out" : "a-vert"}`}>
      <div 
      className="mt-16"
      style={{ marginTop: "calc(1.5 * var(--spacing-page))" }}
      >
          <div className="flex flex-col text-left gap-y-s-two w-full">
            <Text type="title" link={true} href="/">{t.menu.home}</Text>
            <Text type="title" link={true} href="/about">{t.menu.about}</Text>
            {/* <Text type="title" link={true} href="/robot">{t.menu.robot}</Text> */}
            <Text type="title" link={true} href="/sponsor">{t.menu.sponsor}</Text>
          </div>
      </div>
    </nav>
  );
}

export default Menu;
