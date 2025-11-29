import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

interface Benefit {
  name: string;
  desc: string;
}
interface Benefits {
  Business: Benefit[];
  Individual: Benefit[];
}

interface BenefitProps { pI: number; benefit: Benefit; }
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

function Benefit({ pI, benefit }: BenefitProps) {
  const { ref, inView } = useInView();

  const places = {
    0: "items-start text-left",
    1: "items-center text-center",
    2: "items-end text-right"
  } as Record<number, string>

  return (
    <div className={`flex flex-col gap-y-s-three ${places[pI]}`}>
      <div ref={ref}><Text type="pg" animate={inView} className="font-bold! text-accent!">{benefit.name}</Text></div>
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
        <div key={i} className="flex flex-col gap-y-s-one">
          <Text type="pg" className="font-bold!">{section}</Text>
          <div className="gap-x-s-two gap-y-s-two grid grid-cols-1 md:grid-cols-3">
            {items.map((item, i) => (
              <Benefit key={i} pI={i % 3} benefit={item} />
            ))}
          </div>
          {i + 1 !== items.length && (
            <div ref={imgRef}><img className={`w-full opacity-0 ${imgInView ? "a-fade-in" : ''}`} src={assetMap[`sponsor/${i + 2}.avif`]} /></div>
          )}
        </div>
      ))}
    </section>
  );
}

export default Benefits;
