import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

interface BenefitInterface {
  name: string;
  desc: string;
  img: string;
}

function BenefitDesktop ({ benefit }: { benefit: BenefitInterface }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="flex flex-row w-full h-fit gap-s-four">
      <div className={`w-[30%] ${inView ? "a-fade-in" : "opacity-0"}`}>
        <Text type="pg" className="font-bold!">
          {benefit.name}
        </Text>
      </div>
      <div className={`w-[35%] ${inView ? "a-fade-in" : "opacity-0"}`}>
        <Text type="pg" className="text-right">
          {benefit.desc}
        </Text>
      </div>
      <div className={`w-[35%] h-[50dvh] ${inView ? "a-fade-in" : "opacity-0"}`}>
        <img src={assetMap[benefit.img]} className="object-cover h-full w-full" />
      </div>
    </div>
  );
}

function BenefitMobile ({ benefit }: { benefit: BenefitInterface }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="flex flex-col w-full h-fit gap-s-four">
      <div className={`w-full ${inView ? "a-fade-in" : "opacity-0"}`}>
        <Text type="pg" className="font-bold!">
          {benefit.name}
        </Text>
      </div>
      <div className={`w-full h-[40dvh] ${inView ? "a-fade-in" : "opacity-0"}`}>
        <img src={assetMap[benefit.img]} className="object-cover h-full w-full" />
      </div>
      <div className={`w-full pr-s-three ${inView ? "a-fade-in" : "opacity-0"}`}>
        <Text type="pg" className="">
          {benefit.desc}
        </Text>
      </div>
    </div>
  );
}

function Benefits() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { benefits } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col md:justify-between gap-y-s-four max-sm:gap-y-page w-full p-page bg-bg">
      <div ref={headingRef}>
        <Text type="title" animate={headingInView}>
          {t.sponsor.benefits.heading}
        </Text>
      </div>
      
      <div className="hidden md:flex flex-col flex-wrap gap-s-one w-full">
        {_benefits.map((benefit: BenefitInterface, i: number) => (
          <BenefitDesktop key={i} benefit={benefit} />
        ))}
      </div>
      <div className="md:hidden flex flex-col flex-wrap gap-s-one w-full">
        {_benefits.map((benefit: BenefitInterface, i: number) => (
          <BenefitMobile key={i} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}

export default Benefits;
