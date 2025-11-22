import { useState } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import benefits from "@/data/strings/benefits.json";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";

function Benefits() {
  const [idx, setIdx] = useState(0);
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const _benefits = benefits[locale];

  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col md:justify-between gap-y-s-four max-sm:gap-y-page w-full p-page bg-bg">
      <Text ref={headingRef} type="title" animate={headingInView}>
        {t.sponsor.benefits.heading}
      </Text>

      <div className="hidden md:flex flex-col flex-wrap gap-s-one w-full">
        {_benefits.map((benefit, i) => {
          const { ref, inView } = useInView();

          return (
            <div ref={ref} key={i} className="flex flex-row w-full h-fit">
              <div className={`w-[30%] ${inView ? "a-fade-in" : "opacity-0"}`}>
                <Text type="pg" className="font-bold!">
                  {benefit.name}
                </Text>
              </div>

              <div className={`w-[35%] pr-s-three ${inView ? "a-fade-in" : "opacity-0"}`}>
                <Text type="pg" className="text-right">
                  {benefit.desc}
                </Text>
              </div>

              <div className={`w-[35%] h-[50dvh] ${inView ? "a-fade-in" : "opacity-0"}`}>
                <img src={assetMap[benefit.img]} className="object-cover h-full w-full" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Benefits;
