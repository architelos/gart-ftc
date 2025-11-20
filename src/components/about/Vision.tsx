import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import vision from "@/data/strings/vision.json"

function Vision() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const [currentVision, changeCurrentVision] = useState<number>(0);

  const visions = vision[locale];

  return (
    <section className="flex flex-col gap-y-page p-page h-fit w-full bg-bg">
      <div className="flex flex-row gap-x-s-four h-fit">
        <Text type="title">{t.about.vision.heading}</Text>
        <Text type="sub" className="self-end">({t.about.vision.action})</Text>
      </div>

      <div className="flex flex-row justify-between w-full gap-x-s-four">
        <div className="flex flex-col gap-y-s-four flex-1">
          {visions.map((vis, idx) => (
            <div key={idx} className="flex flex-col gap-y-s-three">
              <Text
                type="pg"
                className={`w-fit cursor-pointer font-semibold! transition-colors duration-300 ${currentVision == idx ? "text-text font-bold!" : "text-text/20"}`}
                onClick={() => { changeCurrentVision(idx) }}
              >
                {vis.value}
              </Text>

              <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${idx == currentVision ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="flex flex-col min-h-0 gap-y-s-four"> 
                  <Text type="pg" >
                  {vis.desc}
                  </Text>
                  <img src={assetMap[vis.img]} className="md:hidden object-cover h-[40dvh]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-col gap-y-s-four max-w-[40dvw] h-[40dvh] flex-1">
          <img src={assetMap[visions.at(currentVision)?.img || "ph.avif"]} className="h-[100%] object-cover" />
        </div>
      </div>

      {/* Mobile layout */}
      {/* <div className="md:hidden flex flex-col min-h-[80%] w-fit gap-y-s-four">
        <Text type="title">
          {currentVision + 1}. {visions.at(currentVision)?.value}
        </Text>
        <Text type="pg">
          {visions.at(currentVision)?.desc}
        </Text>
        <img src={assetMap[visions.at(currentVision)?.img || "ph.avif"]} className="object-cover flex-1" />
      </div>

      <div className="md:hidden flex flex-row gap-x-s-four">
        <button className="cursor-pointer" onClick={() => {
          return currentVision <= 0 ? 0 : changeCurrentVision(currentVision - 1)
        }}>
          <ArrowLeft />
        </button>
        <button className="cursor-pointer" onClick={() => {
          return currentVision >= visionCount - 1 ? changeCurrentVision(0) : changeCurrentVision(currentVision + 1)
        }}>
          <ArrowRight />
        </button>
      </div> */}
    </section>
  )
}

export default Vision;
