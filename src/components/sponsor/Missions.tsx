import { useState } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import missions from "@/data/strings/missions.json";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";

function Missions() {
  const [idx, setIdx] = useState(0);
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: contentRef, inView: contentInView } = useInView();

  return (
    <section className="flex flex-col md:justify-between gap-y-s-four max-sm:gap-y-page w-full p-page bg-bg">
      <div
        ref={headingRef}
        className={`md:w-[40%]`}
      >
        <Text type="title" animate={headingInView}>{t.sponsor.mission.heading}</Text>
      </div>

      {/* desktop */}
      <div className="hidden md:flex flex-row w-full gap-x-s-four items-start justify-between">
        <div
          ref={contentRef}
          className="flex flex-col gap-y-s-three md:w-[20%]"
        >
          {missions[locale].map((mission, i) => (
            <Text
              key={i}
              type="pg"
              onClick={() => setIdx(i)}
              className={`cursor-pointer font-semibold!
                ${idx !== i ? "text-text/20! font-bold!" : "text-text"}`}
            >
              {mission.name}
            </Text>
          ))}
        </div>

        <div
          className="flex justify-center items-center fade-in w-[40%] h-[40dvh]"
          key={`img-${idx}`}
        >
          <img
            src={assetMap[missions[locale][idx].img]}
            className="object-cover w-full h-full"
          />
        </div>


        <div className="fade-in md:w-[40%]" key={`text-${idx}`}>
          <div className="min-h-0">
            <Text type="pg" className="text-right">
              {missions[locale][idx].desc}
            </Text>
          </div>
        </div>

      </div>

      {/* mobile */}
      <div className="md:hidden flex flex-row w-full gap-x-s-four max-h-[90dvh]">
        <div ref={contentRef} className={`flex flex-col gap-y-s-three md:w-[60%] opacity-0 ${contentInView ? "a-fade-in" : ""}`}>
          {missions[locale].map((mission, i) => (
            <div key={i} className="flex flex-col gap-y-s-three">
              <Text type="pg" onClick={() => setIdx(i)} className={`cursor-pointer transition-colors duration-300 font-bold! ${idx !== i ? "text-text/20!" : ""}`}>
                {mission.name}
              </Text>
              <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${idx === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="flex flex-col min-h-0 gap-y-s-four">
                  <Text type="pg">
                    {mission.desc}
                  </Text>
                  <img src={assetMap[mission.img]} className="h-[40dvh] w-full object-cover"></img>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Missions;
