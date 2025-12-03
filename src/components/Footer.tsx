import { useEffect } from "react";
import { FaYoutube, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";
import type { IconType } from "react-icons";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useMenuState from "@/hooks/useMenuState";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";
import data from "@/data/data";

interface ContactRowProps { row: string[] }

function ContactRow({ row }: ContactRowProps) {
  const { ref: rowRef, inView: rowInView } = useInView();

  const email = row[0];
  const role = row[1];
  const tel = row[2].replace(/[\s()]/g, ''); // remove spaces and parentheses

  return (
    <div ref={rowRef} className="gap-x-s-three gap-y-s-three grid grid-cols-2 md:grid-cols-3">
      <Text type="pg" className="md:place-self-start max-sm:col-span-2 font-bold!" animate={rowInView}>{role}</Text>
      <Text type="pg" clickable={true} className="place-self-start md:place-self-center" link={true} animate={rowInView} href={`mailto:${email}`}>{email}</Text>
      <Text type="pg" clickable={true} className="place-self-end" link={true} animate={rowInView} href={`tel:${tel}`}>{tel}</Text>
    </div>
  );
}

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({ once: false });
  const { ref: navRef, inView: navInView } = useInView();
  const { ref: socialsRef, inView: socialsInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { socials } = data(locale);

  const setFooterVisible = useMenuState((state) => state.setFooterVisible);

  const map: Record<string, {
    icon: IconType;
    align: "md:place-self-start" | "md:place-self-center" | "md:place-self-end"; }
  > = {
    yt: { icon: FaYoutube, align: "md:place-self-start" },
    gh: { icon: FaGithub, align: "md:place-self-center" },
    ig: { icon: FaInstagram, align: "md:place-self-end" },
    tt: { icon: FaTiktok, align: "md:place-self-start" },
  };

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
        {Object.entries(socials).map(([k, v]) => {
          const Icon = map[k].icon;
          const align = map[k].align;

          return (
            <a
              key={k}
              href={v.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-row items-center gap-x-s-four w-fit lift-on-hover opacity-0 ${socialsInView ? "a-fade-in" : ""} ${align}`}
            >
              <Icon style={{ color: "var(--color-text)", width: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)", height: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)" }} />
              <Text type="pg">{v.handle}</Text>
            </a>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-s-three mt-s-three">
        {t.contact.map((row, i) => (
          <ContactRow key={i} row={row} />
        ))}
      </div>

      <div ref={imgRef} className="flex flex-col flex-1 justify-center">
        <img className={`object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} src={assetMap["footer.png"]} />
      </div>

      <Text type="sub">{t.footer.copyright}</Text>
    </footer>
  );
}

export default Footer;
