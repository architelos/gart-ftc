import { useEffect } from "react";
import { FaYoutube, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useMenuState from "@/hooks/useMenuState";
import useLocale from "@/hooks/useLocale";
import useTheme from "@/hooks/useTheme";
import useIsMd from "@/hooks/useIsMd";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";
import data from "@/data/data";

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({ once: false });
  const { ref: navRef, inView: navInView } = useInView();
  const { ref: socialsRef, inView: socialsInView } = useInView();
  const { ref: contactRef, inView: contactInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const isMd = useIsMd();
  const { socials } = data(locale);

  const theme = useTheme((state) => state.theme);
  const setFooterVisible = useMenuState((state) => state.setFooterVisible);

  useEffect(() => {
    setFooterVisible(footerInView);
  }, [footerInView, setFooterVisible]);

  return (
    <footer ref={footerRef} className="flex flex-col gap-y-s-two p-page border-t border-t-text/20 bg-bg">
      <div ref={navRef} className="flex flex-row flex-wrap flex-0 justify-between gap-x-s-one gap-y-s-three mb-s-three">
        <Text type="pg" link={true} animate={navInView} href="/">{t.menu.home}</Text>
        <Text type="pg" link={true} animate={navInView} href="/about">{t.menu.about}</Text>
        {/* <Text type="pg" link={true} animate={navInView} href="/robot">{t.menu.robot}</Text> */}
        <Text type="pg" link={true} animate={navInView} href="/sponsor">{t.menu.sponsor}</Text>
      </div>

      <div ref={socialsRef} className="gap-y-s-three grid grid-cols-1 md:grid-cols-3">
        <a href={socials.yt.link} className={`flex flex-row items-center gap-x-s-four w-fit scale-on-hover opacity-0 ${isMd ? "place-self-start" : ""} ${socialsInView ? "a-fade-in" : ""}`}>
          <FaYoutube style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
          <Text type="pg">{socials.yt.handle}</Text>
        </a>
        <a href={socials.gh.link} className={`flex flex-row items-center gap-x-s-four w-fit scale-on-hover opacity-0 ${isMd ? "place-self-center" : ""} ${socialsInView ? "a-fade-in" : ""}`}>
          <FaGithub style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
          <Text type="pg">{socials.gh.handle}</Text>
        </a>
        <a href={socials.ig.link} className={`flex flex-row items-center gap-x-s-four w-fit scale-on-hover opacity-0 ${isMd ? "place-self-end" : ""} ${socialsInView ? "a-fade-in" : ""}`}>
          <FaInstagram style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
          <Text type="pg">{socials.ig.handle}</Text>
        </a>
        <a href={socials.tt.link} className={`flex flex-row items-center gap-x-s-four w-fit scale-on-hover opacity-0 ${isMd ? "place-self-start" : ""} ${socialsInView ? "a-fade-in" : ""}`}>
          <FaTiktok style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
          <Text type="pg">{socials.tt.handle}</Text>
        </a>
      </div>

      <div ref={contactRef} className="flex flex-row justify-between mt-s-three">
        <Text type="pg" className="font-bold!" link={true} animate={contactInView} href={t.email}>{t.email}</Text>
        <Text type="pg" className="font-bold!" link={true} animate={contactInView} href={t.tel}>{t.tel}</Text>
      </div>

      <div ref={imgRef} className="flex flex-col flex-1 justify-center">
        <img className={`object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} src={assetMap[theme === "dark" ? "footer.png" : "lfooter.png"]} />
      </div>

      <Text type="sub">{t.footer.copyright}</Text>
    </footer>
  );
}

export default Footer;
