import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import useIsMd from "@/hooks/useIsMd";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

interface Benefit {
  name: string;
  desc: string;
  img: string;
}

function BenefitDesktop ({ benefit }: { benefit: Benefit }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="flex flex-row gap-x-s-two w-full h-fit">
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
      <div className={`w-[35%] ${inView ? "a-fade-in" : "opacity-0"}`}>
        <img src={assetMap[benefit.img]} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function BenefitMobile ({ benefit }: { benefit: Benefit }) {
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: descRef, inView: descInView } = useInView();

  return (
    <div className="flex flex-col gap-y-s-three w-full">
      <div ref={headerRef}><Text type="pg" className="font-bold!" animate={headerInView}>{benefit.name}</Text></div>
      <div ref={imgRef} className={`w-full h-[40dvh] ${headerInView ? "a-fade-in" : "opacity-0"}`}>
        <img src={assetMap[benefit.img]} className={`w-full h-full object-cover opacity-0 ${imgInView ? "a-fade-in" : ""}`} />
      </div>
      <div ref={descRef}><Text type="pg" animate={descInView}>{benefit.desc}</Text></div>
    </div>
  );
}

function Benefits() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { benefits } = data(locale);

  const isMd = useIsMd();

  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={headingRef}>
        <Text type="title" animate={headingInView}>
          {t.sponsor.benefits.heading}
        </Text>
      </div>

      <div className="flex flex-col gap-y-s-one w-full">
        {benefits.map((benefit: Benefit, i: number) => {
          if (isMd) return <BenefitDesktop key={i} benefit={benefit} />;
          return <BenefitMobile key={i} benefit={benefit} />
        })}
      </div>
    </section>
  );
}

export default Benefits;
