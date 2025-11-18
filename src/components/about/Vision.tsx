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
  const visionCount = visions.length;

  return (
    <section className="flex flex-col gap-y-page p-page h-dvh w-full md:h-fit bg-bg">
      <div className="flex flex-row gap-x-s-four h-fit">
        <Text type="title" className="font-bold!">{t.about.vision.heading}</Text>
        <Text type="sub" className="self-end">({t.about.vision.action})</Text>
      </div>
    
      <div className="hidden md:flex flex-row justify-between w-full gap-x-s-four">
          <div className="flex flex-col gap-y-s-four">
            {visions.map((vis, idx) => (
              <div className="flex flex-col gap-y-s-four">
                <Text type="pg" className={`w-fit cursor-pointer font-bold! ${currentVision == idx ? "text-text" : "text-text/20"}`} onClick={() => {changeCurrentVision(idx)}}>{vis.value}</Text>
                
                { idx == currentVision ? (
                    <div className="flex flex-col gap-y-s-four">
                      <Text type="pg">
                        {vis.desc}
                      </Text>
                    </div>
                  ) : (<></>)}

              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-s-four max-w-[40%]">
            <img src={assetMap[visions.at(currentVision)?.img || "ph.avif"]} className=""/>
          </div>
      </div>

      <div className="md:hidden flex flex-col min-h-[80%] w-fit gap-y-s-four">
        <Text type="title">
          {currentVision + 1}. {visions.at(currentVision)?.value}
        </Text>
        <Text type="pg">
          {visions.at(currentVision)?.desc}
        </Text>
        <img src={assetMap[visions.at(currentVision)?.img || "ph.avif"]} className="object-cover flex-1"/>
      </div>

      <div className="md:hidden flex flex-row gap-x-s-four">
        <button className="cursor-pointer" onClick={() => {
          return currentVision <= 0 ? 0 : changeCurrentVision(currentVision - 1)
        }}>
          <ArrowLeft/>
        </button>
        <button className="cursor-pointer" onClick={() => {
          return currentVision >= visionCount - 1 ? changeCurrentVision(0) : changeCurrentVision(currentVision + 1)
        }}>
          <ArrowRight/>
        </button>
      </div>
    </section>
  )
}

export default Vision;
