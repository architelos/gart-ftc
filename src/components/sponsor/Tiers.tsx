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
    className={`flex flex-col gap-y-s-three md:w-full w-fit
      bg-bg transition-all duration-500 ease-out
      md:items-center
      ${!isMd && (i % 2 == 0
        ? "self-start items-center"
        : "self-end items-center")
      }
      ${isMd
        ? `pt-[${i * 100}px] w-full`
        : `${i == 0 ? "" : "-mt-s-one"}`
      } w-fit
      `}
      style={ isMd ? { paddingTop: `${i * 100}px`, animationDelay: `${i * 0.1}s` } : {animationDelay: `${i * 0.1}s`} }
    >
      <Text type="pg" className="w-fit font-bold! text-accent! md:text-center whitespace-nowrap" animate={contentInView}>
        {tier.name}
      </Text>

      <Text type="title" className="w-fit font-bold! md:text-center whitespace-nowrap" animate={contentInView}>
        {tier.price}
      </Text>

      <ol className="flex flex-col md:items-center gap-y-2 w-fit">
        {tier.features.map((feature: string, j: number) => (
          <li key={j} className="flex items-center gap-x-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <Text type="pg" animate={contentInView} className="text-text!">{feature}</Text>
          </li>
        ))}
      </ol>
    </div>
  );
}

const Tiers = () => {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { tiers } = data(locale);
  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full h-fit p-page bg-bg">
      <div ref={headingRef} className="text-center">
        <Text type="title" animate={headingInView}>
          {t.sponsor.tiers.heading}
        </Text>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-y-s-one w-full">
        {tiers.map((tier: Tier, i: number) => (
          <TierComponent key={i} tier={tier} i={i}/>
        ))}
      </div>
    </section>
  );
};

export default Tiers;
