import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

interface Benefit {
  name: string;
  desc: string;
  span: boolean;
  color: string;
}
interface Benefits {
  Business: Benefit[];
  Individual: Benefit[];
}

interface BenefitProps { benefit: Benefit; }
interface BenefitLineProps { data: string; }

function BenefitLine({ data }: BenefitLineProps) {
  const { ref, inView } = useInView();

  return (
    <span ref={ref} className={`opacity-0 ${inView ? "a-fade-in" : ""}`}>
      {data}
      <br />
    </span>
  );
}

function Benefit({ benefit }: BenefitProps) {
  const { ref, inView } = useInView();

  return (
    <div className={`flex flex-col gap-y-s-three ${benefit.span ? "col-span-4" : ""}`}>
      <div ref={ref}><Text type="pg" animate={inView} className="font-bold!" style={{ color: benefit.color }}>{benefit.name}</Text></div>
      <Text type="pg">
        {benefit.desc.split("\n").map((line, i) => (
          <BenefitLine key={i} data={line} />
        ))}
      </Text>
    </div>
  );
}

function Benefits() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { benefits } = data(locale);

  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  const entries = Object.entries(benefits as Benefits) as [
    keyof Benefits,
    Benefit[]
  ][];

  return (
    <section className="flex flex-col gap-y-page p-page bg-bg">
      <div ref={titleRef}><Text type="title" animate={titleInView}>{t.sponsor.benefits.heading}</Text></div>
      {entries.map(([section, items], i) => (
        <div key={i} className="flex flex-col items-start gap-y-s-one">
          <Text type="title" className="font-normal! text-accent!">{section}</Text>
          <div className={`gap-x-page gap-y-page grid grid-cols-1 ${section === "Business" ? "md:grid-cols-4" : "md:grid-cols-2"}`}>
            {items.map((item, i) => (
              <Benefit key={i} benefit={item} />
            ))}
          </div>
        </div>
      ))}
      <div ref={imgRef}><img className={`w-full opacity-0 ${imgInView ? "a-fade-in" : ''}`} src={assetMap[`sponsor/2.avif`]} /></div>
    </section>
  );
}

export default Benefits;
