import { useState } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import useIsMd from "@/hooks/useIsMd";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

function Missions() {
  const [idx, setIdx] = useState(0);
  const isMd = useIsMd();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { missions } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: contentRef, inView: contentInView } = useInView();
  const { ref: smRef, inView: smInView } = useInView();

  return (
    <section className="flex flex-col md:justify-between gap-y-page w-full md:h-[60vh] p-page bg-bg">
      <div ref={headingRef} className="flex flex-row items-baseline gap-x-page">
        <Text animate={headingInView} type="title">{t.sponsor.mission.heading}</Text>
        <Text animate={headingInView} type="sub">{t.sponsor.mission.cta}</Text>
      </div>

      {isMd
        ? (
          <div className="hidden md:flex flex-row justify-between items-start gap-x-s-three w-full h-full min-h-0">
            <div ref={contentRef} className="flex flex-col flex-none gap-y-s-two md:w-[20%]">
              {missions.map((mission, i) => (
                <Text
                  key={i}
                  type="pg"
                  onClick={() => setIdx(i)}
                  clickable={true}
                  animate={contentInView}
                  className={`cursor-pointer font-semibold! transition-color duration-300 ${idx !== i ? "text-text/25 font-bold!" : "text-text"}`}
                >
                  {mission.name}
                </Text>
              ))}
            </div>
            <div className="flex-1 min-w-0 h-[125%] basis-0 a-fade-in" key={`img-${idx}`}>
              <img
                src={assetMap[missions[idx].img]}
                alt={missions[idx].name}
                className="block w-full h-full object-contain object-top"
              />
            </div>
            <div className="flex-none md:w-[30%] min-w-0 a-fade-in" key={`text-${idx}`}>
              <Text type="pg" className="text-right">{missions[idx].desc}</Text>
            </div>
          </div>
      ) : (
        <div ref={smRef} className={`flex flex-col gap-y-s-two w-full opacity-0 ${smInView ? "a-fade-in" : ""}`}>
          {missions.map((mission, i) => (
            <div key={i} className="flex flex-col gap-y-s-three w-full">
              <Text type="pg" onClick={() => setIdx(i)} className={`cursor-pointer transition-colors duration-300 ${idx !== i ? "text-text/25!" : ""}`}>
                {mission.name}
              </Text>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${idx === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="flex flex-col gap-y-s-three w-full min-h-0 max-h-[60vh]">
                  <img
                    className="flex-1 w-full min-h-0 object-contain object-left"
                    src={assetMap[mission.img]}
                    alt={mission.name}
                  />
                  <Text type="pg" className="shrink-0">{mission.desc}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
        )
      }
    </section>
  );
}

export default Missions;
