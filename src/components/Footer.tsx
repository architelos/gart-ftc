import { useEffect } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useMenuState from "@/hooks/useMenuState";
import useLocale from "@/hooks/useLocale";
import useTheme from "@/hooks/useTheme";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({ once: false });
  const { ref: navRef, inView: navInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const theme = useTheme((state) => state.theme);
  const setFooterVisible = useMenuState((state) => state.setFooterVisible);

  useEffect(() => {
    setFooterVisible(footerInView);
  }, [footerInView, setFooterVisible]);

  return (
    <footer ref={footerRef} className="flex flex-col gap-y-s-three p-page bg-bg">
      <div ref={navRef} className="flex flex-row flex-wrap flex-0 gap-x-s-one gap-y-s-four mb-s-three">
        <Text type="pg" link={true} animate={navInView} href="/">{t.menu.home}</Text>
        <Text type="pg" link={true} animate={navInView} href="/about">{t.menu.about}</Text>
        <Text type="pg" link={true} animate={navInView} href="/robot">{t.menu.robot}</Text>
        <Text type="pg" link={true} animate={navInView} href="/sponsor">{t.menu.sponsor}</Text>
      </div>

      <div className="flex flex-row flex-wrap flex-0 justify-between mb-l">
        <Text type="pg" className="font-bold!" link={true} animate={navInView} href={t.email}>{t.email}</Text>
        <Text type="pg" className="font-bold!" link={true} animate={navInView} href={t.tel}>{t.tel}</Text>
      </div>

      <div ref={imgRef} className="flex flex-col flex-1 justify-center">
        <img className={`object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} src={assetMap[theme === "dark" ? "footer.png" : "lfooter.png"]} />
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-y-s-four">
        <Text type="sub" link={true} href="/privacy_policy">{t.menu.privacy_policy}</Text>
        <Text type="sub">{t.footer.copyright}</Text>
      </div>
    </footer>
  );
}

export default Footer;
