import { useState, useEffect } from "react";

import Text from "@/components/Text";
import useMenuState from "@/hooks/useMenuState";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";

function Menu() {
  const [render, setRender] = useState(false);
  const [out, setOut] = useState(false);
  const open = useMenuState((state) => state.open);

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

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
    <nav className={`z-99 fixed top-0 right-0 flex flex-col justify-between w-fit h-fit rounded-xl p-page bg-bg md:bg-bg/80 ${out ? "a-fade-out" : "a-horizontal"}`}>
      <div className="flex flex-col gap-y-s-two text-right" style={{ marginTop: "calc(2.4 * var(--spacing-page))" }}>
        <Text type="title" link={true} href="/">{t.menu.home}</Text>
        <Text type="title" link={true} href="/about">{t.menu.about}</Text>
        {locale == "vn" ? <Text type="title" link={true} href="/bamboo">{t.menu.robot}</Text> : <></>}
        <Text type="title" link={true} href="/sponsor">{t.menu.sponsor}</Text>
      </div>
    </nav>
  );
}

export default Menu;
