import type { MouseEvent } from "react";
import { Link } from "lucide-react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import useCanHover from "@/hooks/useCanHover";
import data from "@/data/data";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";
import { event } from "@/gtag";

interface Resource {
  name: string;
  link: string;
  img: string;
}
interface Resources {
  FTC101: Resource[];
  Previously: Resource[];
  Other: Resource[];
}
interface ResSectionProps { section: keyof Resources, res: Resource[]; }
interface ResItemProps { item: Resource; }

function ResItem({ item }: ResItemProps) {
  const canHover = useCanHover();
  const { ref, inView } = useInView();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    event("click", "Resources", item.name);
    window.open(item.link, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`flex flex-col aspect-square overflow-hidden scale-on-hover cursor-pointer opacity-0 ${inView ? "a-fade-in" : ""}`}
    >
      <img src={assetMap[item.img]} className="w-full h-full object-contain" />
      <div className={`flex justify-between items-center w-full p-button bg-bg`}>
        <Text type="sub" className="text-text">{item.name}</Text>
        {canHover && <Link />}
      </div>
    </div>
  );
}

function ResSection({ section, res }: ResSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView();

  return (
    <div className="flex flex-col gap-y-s-one">
      <div ref={headerRef}><Text type="pg" className="font-bold!" animate={headerInView}>{section}</Text></div>
      <div className="gap-x-s-two gap-y-s-two grid grid-cols-2 md:grid-cols-3">
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
