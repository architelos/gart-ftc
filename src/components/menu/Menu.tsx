import { useState, useEffect } from "react";
import { GB } from "country-flag-icons/react/3x2";
import { VN } from "country-flag-icons/react/3x2";
import { Moon, Sun } from "lucide-react";

import useMenuState from "@/hooks/useMenuState";
import Text from "@/components/Text";

function Menu() {
  const [render, setRender] = useState(false);
  const [out, setOut] = useState(false);
  const open = useMenuState((state) => state.open);

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
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-y-s-two">
            <Text type="sub" link={true} href="/privacy_policy">Privacy Policy</Text>
            <Text type="title" link={true} href="/">Home</Text>
            <Text type="title" link={true} href="/about">About</Text>
            <Text type="title" link={true} href="/robot">Our Robot</Text>
            <Text type="title" link={true} href="/sponsor">Sponsor Us</Text>
          </div>

          <div className="flex flex-row self-end gap-x-s-one">
            <GB style={{ width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
            <Moon style={{ width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
