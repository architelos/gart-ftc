import { useState } from "react";
import type { MouseEvent } from "react";
import { Link, Heart } from "lucide-react";

import { event } from "@/gtag";
import Text from "@/components/Text";
import Button from "@/components/Button";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import useCanHover from "@/hooks/useCanHover";
import useFFOrSafari from "@/hooks/useFFOrSafari";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import data from "@/data/data";

type SponsorType = {
  img: string;
  name: string;
  link: string;
}

type CardProps = {
  sponsor: SponsorType;
  type: "gold" | "diamond";
}

type CardListProps = {
  sponsors: SponsorType[];
  title: string;
  type: "gold" | "diamond";
}

type CarouselProps = {
  type: "silver" | "bronze";
  title: string;
  sponsors: SponsorType[];
}

function Card({ type, sponsor }: CardProps) {
  const [hover, setHover] = useState(false);

  const canHover = useCanHover();
  const { ref, inView } = useInView();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    event("click", "Sponsors", sponsor.name);
    window.open(sponsor.link, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative aspect-square overflow-hidden scale-on-hover cursor-pointer opacity-0 ${type === "diamond" ? "max-h-[45vh]" : "max-h-[30vh]"} ${inView ? "a-fade-in" : ""}`}
    >
      <img src={assetMap[sponsor.img]} className="w-full h-full object-contain scale-[0.9]" />
      <div className={`bottom-0 absolute flex justify-between items-center w-full p-button bg-bg ${canHover ? (hover ? "a-slide-up" : "a-slide-down") : ""}`}>
        <Text type="sub" className="text-text">{sponsor.name}</Text>
        {canHover && <Link />}
      </div>
    </div>
  );
}

function CardList({ type, title, sponsors }: CardListProps) {
  const { ref, inView } = useInView();

  const colors = {
    gold: "#d5a019",
    diamond: "#90d5ff"
  }

  return (
    <div className="flex flex-col gap-y-page">
      <div ref={ref}><Text type="title" animate={inView} className="font-normal! text-center" style={{ color: colors[type] }}>{title}</Text></div>
      <div className="place-items-center gap-s-three grid grid-cols-2 md:grid-cols-3 w-full">
        {sponsors.map((sponsor, i) => (
          <div
            key={i}
            className={
              sponsors.length === 1
                ? "md:col-start-2"
                : ""
            }
          >
            <Card type={type} sponsor={sponsor} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Carousel({ type, title, sponsors }: CarouselProps) {
  const ffOrSafari = useFFOrSafari();

  const { ref: textRef, inView: textInView } = useInView();
  const { ref: carouselRef, inView: carouselInView } = useInView();

  const onClick = (e: MouseEvent<HTMLDivElement>, sponsor: SponsorType) => {
    e.preventDefault();

    event("click", "Sponsors", sponsor.name);
    window.open(sponsor.link, "_blank", "noopener,noreferrer");
  }

  const colors = {
    bronze: "#c3785c",
    silver: "#9aa3a5"
  }

  return (
    <div className="flex flex-col gap-y-page">
      <div ref={textRef}><Text type="title" animate={textInView} className="font-normal! text-accent! text-center" style={{ color: colors[type] }}>{title}</Text></div>
      <div ref={carouselRef}>
        {!ffOrSafari
          ? <div className={`flex flex-row overflow-x-hidden scroll-hide opacity-0 ${carouselInView ? "a-fade-in" : ""}`}>
            {(type === "silver" ? [0, 1] : [0, 1, 2, 3]).map((i) => (
              <div
                key={i}
                aria-hidden={i === 1}
                className={`flex justify-start w-max items-center ${type === "silver" ? "a-scroll-silver" : "a-scroll-bronze"}`}
                style={type === "silver"
                  ? { columnGap: "calc(3 * var(--spacing-page))", paddingRight: "calc(3 * var(--spacing-page))" }
                  : { columnGap: "calc(2 * var(--spacing-page))", paddingRight: "calc(2 * var(--spacing-page))" }}
              >
                {sponsors.map((sponsor, j) => (
                  <div key={j} className={`flex shrink-0 grow-0 cursor-pointer ${type === "silver" ? "basis-[15vh] md:basis-[20vh]" : "basis-[7.5vh] md:basis-[10vh]"}`} onClick={(e) => onClick(e, sponsor)}>
                    <img
                      className={`w-full h-full object-contain`}
                      src={assetMap[sponsor.img]}
                      alt={sponsor.name}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          : <div style={{ columnGap: "calc(2 * var(--spacing-page))" }} className={`grid ${type === "silver" ? "grid-cols-3" : "grid-cols-4"} opacity-0 ${carouselInView ? "a-fade-in" : ""}`}>
            {sponsors.map((sponsor, i) => (
              <div key={i} className={`place-self-center cursor-pointer aspect-square ${type === "silver" ? "h-[15vh] md:h-[20vh]" : "h-[7.5vh] md:h-[10vh]"}`} onClick={(e) => onClick(e, sponsor)}>
                <img
                  className={`w-full h-full object-contain`}
                  src={assetMap[sponsor.img]}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>}
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
      <div ref={textRef} className="flex flex-col gap-y-s-two md:max-w-[60%]">
        <Text type="title" animate={textInView}>{t.home.sponsors.title}</Text>
        <Text type="pg" animate={textInView}>{t.home.sponsors.desc}</Text>
        <div ref={btnRef} className="mt-s-four">
          <Button type="accent" icon={<Heart style={{ color: `var(--color-button)` }} />} className={`opacity-0 ${btnInView ? "a-fade-in" : ""}`} link="/sponsor">{t.home.sponsors.cta}</Button>
        </div>
      </div>
      {(["diamond", "gold"] as const).map((tier, i) => (
        <CardList key={i} type={tier} title={t.home.sponsors.tiers[tier]} sponsors={sponsors[tier]} />
      ))}
      <Carousel type="silver" title={t.home.sponsors.tiers["silver"]} sponsors={sponsors.silver} />
      <Carousel type="bronze" title={t.home.sponsors.tiers["bronze"]} sponsors={sponsors.bronze} />
    </section>
  );
}

export default Sponsors;
