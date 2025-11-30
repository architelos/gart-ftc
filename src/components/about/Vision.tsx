import { useState } from "react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import data from "@/data/data";

function Vision() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { visions } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: contentRef, inView: contentInView } = useInView();

  const [currentVision, changeCurrentVision] = useState<number>(0);

  return (
    <section className="flex flex-col gap-y-page w-full h-fit p-page bg-bg">
      <div ref={headingRef} className="flex flex-row items-baseline gap-x-page h-fit">
        <Text animate={headingInView} type="title">{t.about.vision.heading}</Text>
        <Text animate={headingInView} type="sub">{t.about.vision.action}</Text>
      </div>

      <div ref={contentRef} className={`flex flex-row justify-between gap-x-page w-full opacity-0 ${contentInView ? "a-fade-in" : ""}`}>
        <div className="flex flex-col flex-1 gap-y-s-four">
          {visions.map((vis, idx) => (
            <div key={idx} className="flex flex-col gap-y-s-three">
              <Text
                type="pg"
                clickable={true}
                className={`w-fit cursor-pointer font-semibold! transition-colors duration-300 ${currentVision == idx ? "text-text font-bold!" : "text-text/25"}`}
                onClick={() => { changeCurrentVision(idx) }}
              >
                {vis.value}
              </Text>

              <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${idx == currentVision ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="flex flex-col gap-y-s-three min-h-0 pb-s-four">
                  <Text type="pg">
                    {vis.desc}
                  </Text>
                  <img src={assetMap[vis.img]} className="md:hidden h-[40dvh] object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-col flex-1 gap-y-s-four max-w-[60dvw]">
          <img src={assetMap[visions.at(currentVision)?.img || "ph.avif"]} className="h-full object-contain" />
        </div>
      </div>
    </section>
  )
}

export default Vision;
