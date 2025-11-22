import { useState } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

function Missions() {
  const [idx, setIdx] = useState(0);
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { missions } = data(locale);

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
      <div className="hidden md:flex flex-row justify-between items-start gap-x-s-four w-full">
        <div
          ref={contentRef}
          className="flex flex-col gap-y-s-three md:w-[20%]"
        >
          {missions.map((mission, i) => (
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
          className="flex justify-center items-center w-[40%] h-[40dvh] fade-in"
          key={`img-${idx}`}
        >
          <img
            src={assetMap[missions[idx].img]}
            className="w-full h-full object-cover"
          />
        </div>


        <div className="md:w-[40%] fade-in" key={`text-${idx}`}>
          <div className="min-h-0">
            <Text type="pg" className="text-right">
              {missions[idx].desc}
            </Text>
          </div>
        </div>

      </div>

      {/* mobile */}
      <div className="md:hidden flex flex-row gap-x-s-four w-full max-h-[90dvh]">
        <div ref={contentRef} className={`flex flex-col gap-y-s-three md:w-[60%] opacity-0 ${contentInView ? "a-fade-in" : ""}`}>
          {missions.map((mission, i) => (
            <div key={i} className="flex flex-col gap-y-s-three">
              <Text type="pg" onClick={() => setIdx(i)} className={`cursor-pointer transition-colors duration-300 font-bold! ${idx !== i ? "text-text/20!" : ""}`}>
                {mission.name}
              </Text>
              <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${idx === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="flex flex-col gap-y-s-four min-h-0">
                  <Text type="pg">
                    {mission.desc}
                  </Text>
                  <img src={assetMap[mission.img]} className="w-full h-[40dvh] object-cover"></img>
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
