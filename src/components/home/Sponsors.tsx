import { useState } from "react";
import { useNavigate } from "react-router";
import { Link, Heart } from "lucide-react";

import Text from "@/components/Text";
import Button from "@/components/Button";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import useCanHover from "@/hooks/useCanHover";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

const sponsors = [
  { name: "Sponsor 1", img: "ph.avif", link: "/sponsor/sponsor1" },
  { name: "Sponsor 2", img: "pv.avif", link: "/sponsor/sponsor2" },
  { name: "Sponsor 3", img: "ph.avif", link: "/sponsor/sponsor3" },
  { name: "Sponsor 4", img: "pv.avif", link: "/sponsor/sponsor4" },
  { name: "Sponsor 5", img: "ph.avif", link: "/sponsor/sponsor5" },
  { name: "Sponsor 6", img: "pv.avif", link: "/sponsor/sponsor6" }
]

type SponsorType = {
  img: string,
  name: string,
  link: string
}

function Card({ img, name, link }: SponsorType) {
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  const canHover = useCanHover();
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      onClick={() => navigate(link)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative aspect-square overflow-hidden scale-on-hover cursor-pointer opacity-0 ${inView ? "a-fade-in" : ""}`}
    >
      <img src={assetMap[img]} className="w-full h-full object-cover" />
      <div className={`bottom-0 absolute flex justify-between items-center w-full p-button bg-black/50 ${canHover ? (hover ? "a-slide-up" : "a-slide-down") : ""}`}>
        <Text type="sub" className="text-text">{name}</Text>
        {canHover && <Link />}
      </div>
    </div>
  );
}

function Sponsors() {
  const navigate = useNavigate();
  const { ref: textRef, inView: textInView } = useInView();
  const { ref: btnRef, inView: btnInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  return (
    <section className="flex flex-col gap-y-s-one w-full p-page bg-bg">
      <div className="flex md:flex-row flex-col-reverse justify-between gap-y-s-one w-full">
        <div ref={btnRef} className="md:self-end">
          <Button type="accent" icon={<Heart />} className={`opacity-0 ${btnInView ? "a-fade-in" : ""}`} onClick={() => navigate("/sponsor")}>{t.home.sponsors.cta}</Button>
        </div>
        <div ref={textRef} className="flex flex-col gap-y-s-three md:max-w-[40%] md:text-right">
          <Text type="pg" animate={textInView} className="font-bold!">{t.home.sponsors.title}</Text>
          <Text type="pg" animate={textInView}>{t.home.sponsors.desc}</Text>
        </div>
      </div>
      <div className="gap-s-three grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full">
        {sponsors.map((sponsor, i) => (
          <Card key={i} img={sponsor.img} name={sponsor.name} link={sponsor.link} />
        ))}
      </div>
    </section>
  );
}

export default Sponsors;
