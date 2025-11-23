import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import useIsMd from "@/hooks/useIsMd";
import data from "@/data/data";
import translations from "@/data/translations";

type Tier = {
  name: string;
  price: string;
  features: string[];
};

function TierComponent({ tier, i}: { tier: Tier; i: number }) {
  const { ref: contentRef, inView: contentInView } = useInView();
  const isMd = useIsMd();

  return (
    <div 
    ref={contentRef} 
    className={`flex flex-col gap-y-4 md:w-full w-fit
      bg-bg transition-all duration-500 ease-out 
      md:items-center
      ${!isMd && (i % 2 == 0 
        ? "self-start pl-[10dvw] items-center" 
        : "self-end pr-[10dvw] items-center")
      } 
      ${isMd 
        ? `pt-[${i * 100}px] w-full`
        : `${i == 0 ? "" : "-mt-s-one"}`
      } w-fit
      `}
      style={ isMd ? { paddingTop: `${i * 100}px`, animationDelay: `${i * 0.1}s` } : {animationDelay: `${i * 0.1}s`} }
    >
      <Text type="pg" className="font-bold! text-accent! whitespace-nowrap md:text-center w-fit" animate={contentInView}>
        {tier.name}
      </Text>

      <Text type="title" className="font-bold! whitespace-nowrap md:text-center w-fit" animate={contentInView}>
        {tier.price}
      </Text>

      <ol className="flex flex-col gap-y-2 md:items-center w-fit">
        {tier.features.map((feature: string, j: number) => (
          <li key={j} className="flex items-center gap-x-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-sub" />
            <Text type="sub" animate={contentInView}>{feature}</Text>
          </li>
        ))}
      </ol>
    </div>
  );
}

const Tiers = () => {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const isMd = useIsMd();
  const { tiers } = data(locale);
  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col gap-y-s-one w-full p-page bg-bg h-fit">

      <div ref={headingRef} className="text-center">
        <Text type="title" animate={headingInView}>
          {t.sponsor.tiers.heading}
        </Text>
        <p className="text-gray-500 mt-2">{t.sponsor.tiers.subheading}</p>
      </div>

      <div className="flex md:flex-row flex-col justify-around w-full">
        {tiers.map((tier: Tier, i: number) => (
          <TierComponent tier={tier} i={i}/>
        ))}
      </div>

    </section>
  );
};

export default Tiers;
