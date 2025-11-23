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

function TierComponent({ tier, i }: { tier: Tier; i: number }) {
  const { ref: contentRef, inView: contentInView } = useInView();

  return (
    <div
      ref={contentRef}
      className={`
        relative flex flex-col items-center gap-y-4 p-6 w-full
        bg-bg rounded-xl shadow-sm
        transition-all duration-500 ease-out
      `}
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      <Text type="pg" className="font-bold! text-accent! whitespace-nowrap" animate={contentInView}>
        {tier.name}
      </Text>

      <Text type="title" className="font-bold! whitespace-nowrap" animate={contentInView}>
        {tier.price}
      </Text>

      <ol className="flex flex-col gap-y-2 w-full">
        {tier.features.map((feature: string, j: number) => (
          <li key={j} className="flex items-center gap-x-2 justify-center whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-text" />
            <Text type="pg" animate={contentInView}>{feature}</Text>
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
    <section className="flex flex-col gap-y-12 w-full max-w-7xl mx-auto p-6 bg-bg h-fit">
      <div ref={headingRef} className="text-center">
        <Text type="title" animate={headingInView}>
          {t.sponsor.tiers.heading}
        </Text>
        <p className="text-gray-500 mt-2">{t.sponsor.tiers.subheading}</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:gap-s-four w-full">
        {tiers.map((tier: Tier, i: number) => (
          <div
            key={i}
            style={{ "--i": i } as React.CSSProperties}
            className={`
              flex w-full md:w-1/3 
              ${i % 2 == 0 ? "justify-start" : "justify-end"}
              ${i > 0 ? "-mt-16" : ""}
              md:justify-center 
              md:mt-[calc(var(--i)*4rem)]
            `}
          >
            <div className="w-[50%] md:w-full">
              <TierComponent tier={tier} i={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tiers;
