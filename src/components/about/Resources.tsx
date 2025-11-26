import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import data from "@/data/data";
import translations from "@/data/translations";

interface Resource {
  name: string;
  link: string;
}
interface Resources {
  Guides: Resource[];
}
interface ResSectionProps { section: keyof Resources, res: Resource[]; }

function ResSection({ section, res }: ResSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: resRef, inView: resInView } = useInView();

  return (
    <div className="flex flex-col gap-y-s-three">
      <div ref={headerRef}><Text type="pg" className="font-bold!" animate={headerInView}>{section}</Text></div>
      <div ref={resRef} className="flex flex-row flex-wrap gap-x-page gap-y-s-three">
        {res.map((item, i) => (
          <Text key={i} link={true} href={item.link} type="pg" animate={resInView}>{item.name}</Text>
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
      <div className="flex flex-col self-end gap-y-s-three max-w-[60%] md:max-w-[30%] text-right">
        <Text type="pg" animate={headerInView} className="font-bold!">{t.about.resources.heading}</Text>
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
