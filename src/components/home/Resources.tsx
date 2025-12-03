import { useState } from "react";
import { Link } from "lucide-react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import useCanHover from "@/hooks/useCanHover";
import data from "@/data/data";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";

interface Resource {
  name: string;
  link: string;
  img: string;
}
interface Resources {
  Guides: Resource[];
}
interface ResSectionProps { section: keyof Resources, res: Resource[]; }
interface ResItemProps { item: Resource; }

function ResItem({ item }: ResItemProps) {
  const [hover, setHover] = useState(false);

  const canHover = useCanHover();
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative aspect-square overflow-hidden scale-on-hover cursor-pointer max-h-[20vh] md:max-h-[40vh] opacity-0 ${inView ? "a-fade-in" : ""}`}
    >
      <img src={assetMap[item.img]} className="w-full h-full object-contain scale-[0.85]" />
      <div className={`bottom-0 absolute flex justify-between items-center w-full p-button bg-bg ${canHover ? (hover ? "a-slide-up" : "a-slide-down") : ""}`}>
        <Text type="sub" className="text-text">{item.name}</Text>
        {canHover && <Link />}
      </div>
    </div>
  );
}

function ResSection({ section, res }: ResSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView();

  return (
    <div className="flex flex-col gap-y-s-three">
      <div ref={headerRef}><Text type="pg" className="font-bold!" animate={headerInView}>{section}</Text></div>
      <div className="flex flex-row flex-wrap gap-x-page gap-y-s-three">
        {res.map((item, i) => (
          <ResItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function Resources() {
  const { ref: headerRef, inView: headerInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { resources } = data(locale);

  const entries = Object.entries(resources as Resources) as [
    keyof Resources,
    Resource[]
  ][];

  return (
    <section ref={headerRef} className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div className="flex flex-col gap-y-s-three">
        <Text type="title" animate={headerInView}>{t.about.resources.heading}</Text>
        <Text type="pg" animate={headerInView}>{t.about.resources.desc}</Text>
      </div>
      <div className="flex flex-col gap-y-s-two">
        {entries.map(([section, items], i) => (
          <ResSection key={i} section={section} res={items} />
        ))}
      </div>
    </section>
  );
}

export default Resources;
