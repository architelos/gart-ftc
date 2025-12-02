import { useState } from "react";
import type { MouseEvent } from "react";
import { Link, Heart } from "lucide-react";

import { event } from "@/gtag";
import Text from "@/components/Text";
import Button from "@/components/Button";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import useCanHover from "@/hooks/useCanHover";
import useTheme from "@/hooks/useTheme";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import data from "@/data/data";

type SponsorType = {
  img: string;
  name: string;
  link: string;
}

type CarouselProps = {
  type: "silver" | "bronze";
  title: string;
  sponsors: SponsorType[];
}

function Gold({ img, name, link }: SponsorType) {
  const [hover, setHover] = useState(false);

  const canHover = useCanHover();
  const { ref, inView } = useInView();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    event("click", "Sponsors", name);
    window.open(link, "_blank");
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative aspect-square overflow-hidden scale-on-hover cursor-pointer opacity-0 ${inView ? "a-fade-in" : ""}`}
    >
      <img src={assetMap[img]} className="w-full h-full object-contain scale-[0.85]" />
      <div className={`bottom-0 absolute flex justify-between items-center w-full p-button bg-black/50 ${canHover ? (hover ? "a-slide-up" : "a-slide-down") : ""}`}>
        <Text type="sub" className="text-text">{name}</Text>
        {canHover && <Link />}
      </div>
    </div>
  );
}

function Carousel({ type, title, sponsors }: CarouselProps) {
  const theme = useTheme((state) => state.theme);

  const { ref: textRef, inView: textInView } = useInView();
  const { ref: carouselRef, inView: carouselInView } = useInView();

  return (
    <div className="flex flex-col gap-y-s-one">
      <div ref={textRef}><Text type="pg" animate={textInView} className="font-bold!">{title}</Text></div>
      <div ref={carouselRef} className={`flex flex-row overflow-x-auto scroll-hide opacity-0 ${carouselInView ? "a-fade-in" : ""}`}>
        {[0, 1].map((i) => (
          <div
            key={i}
            aria-hidden={i === 1}
            className="flex justify-start items-center a-scroll"
            style={{ columnGap: "calc(4 * var(--spacing-page))", paddingRight: "calc(4 * var(--spacing-page))" }}
          >
            {sponsors.map((sponsor, j) => (
              <div key={j} className={`flex shrink-0 grow-0 cursor-pointer ${type === "silver" ? "basis-[15vh] md:basis-[25vh]" : "basis-[6vh] md:basis-[10vh]"}`} onClick={() => window.open(sponsor.link, "_blank")}>
                <img
                  className={`w-full h-full object-contain brightness-0 ${theme === "dark" ? "invert" : ""}`}
                  src={assetMap[sponsor.img]}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Sponsors() {
  const { ref: textRef, inView: textInView } = useInView();
  const { ref: btnRef, inView: btnInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { sponsors } = data(locale);

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg page">
      <div className="flex md:flex-row flex-col-reverse justify-between gap-y-s-one w-full">
        <div ref={btnRef} className="md:self-end">
          <Button type="accent" icon={<Heart style={{ color: `var(--color-text)` }} />} className={`opacity-0 ${btnInView ? "a-fade-in" : ""}`} link="/sponsor">{t.home.sponsors.cta}</Button>
        </div>
        <div ref={textRef} className="flex flex-col gap-y-s-three md:max-w-[40%] md:text-right">
          <Text type="title" animate={textInView}>{t.home.sponsors.title}</Text>
          <Text type="pg" animate={textInView}>{t.home.sponsors.desc}</Text>
        </div>
      </div>
      <div className="flex flex-col gap-y-s-two">
        <Text type="pg" className="font-bold!">{t.home.sponsors.tiers.gold}</Text>
        <div className="gap-s-three grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full">
          {sponsors.gold.map((sponsor, i) => (
            <Gold key={i} img={sponsor.img} name={sponsor.name} link={sponsor.link} />
          ))}
        </div>
      </div>
      <Carousel type="silver" title={t.home.sponsors.tiers["silver"]} sponsors={sponsors.silver} />
      <Carousel type="bronze" title={t.home.sponsors.tiers["bronze"]} sponsors={sponsors.bronze} />
    </section>
  );
}

export default Sponsors;
