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

interface BenefitsRowProps { pI: number; isLast: boolean, section: keyof Benefits; benefits: Benefit[]; }
interface ContentRowProps { benefit: Benefit; }

function ContentRow({ benefit }: ContentRowProps) {
  const { ref: rowRef, inView: rowInView } = useInView();

  return (
    <div ref={rowRef} className={`flex flex-col max-sm:gap-y-s-two md:flex-row items-baseline w-full opacity-0 ${rowInView ? "a-fade-in" : ""}`}>
      <div className={`md:w-[40%]`}>
        <Text type="pg" className="font-bold!">{benefit.name}</Text>
      </div>
      <div className="md:w-[60%]">
        <Text type="pg">
          {benefit.desc.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </Text>
      </div>
    </div>
  );
}

function BenefitsRow({ pI, isLast, section, benefits }: BenefitsRowProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  return (
    <div className="flex flex-col gap-y-s-one w-full">
      <div ref={sectionRef}><Text type="pg" animate={sectionInView} className="font-bold! text-accent!">{section}</Text></div>
      <div className="flex flex-col gap-y-s-two">
        {benefits.map((benefit, i) => (
          <ContentRow key={i} benefit={benefit} />
        ))}
      </div>
      {!isLast && (
        <div ref={imgRef} className={`opacity-0 ${imgInView ? "a-fade-in" : ""}`}>
          <img className="object-contain" src={assetMap[`sponsor/${pI + 1}.avif`]} />
        </div>
      )}
    </div>
  );
}

function Benefits() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { benefits } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();

  const entries = Object.entries(benefits as Benefits) as [
    keyof Benefits,
    Benefit[]
  ][];

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={headingRef}>
        <Text type="title" animate={headingInView}>
          {t.sponsor.benefits.heading}
        </Text>
      </div>

      <div className="flex flex-col gap-y-page w-full">
        {entries.map(([section, items], i) => (
          <BenefitsRow key={i} pI={i} isLast={i === entries.length - 1} section={section} benefits={items} />
        ))}
      </div>
    </section>
  );
}

export default Benefits;
