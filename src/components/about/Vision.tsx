import { useState } from "react";

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
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div className="flex flex-row gap-x-s-four h-fit">
        <Text type="title" className="font-bold!">{t.about.vision.heading}</Text>
        <Text type="sub" className="self-end">({t.about.vision.action})</Text>
      </div>
      

      <div className="hidden md:flex flex-row ">
        <div className="flex flex-col gap-y-s-four md:min-w-[30%]">
          {visions.map((vis, idx) => (
            <Text type="pg" link={true} className={`font-bold! w-fit cursor-pointer ${currentVision == idx ? "text-text" : "text-text/20"}`} onClick={() => {changeCurrentVision(idx)}}>{vis.value}</Text>
          ))}
        </div>
        <div className="flex flex-col gap-y-s-four">
          <Text type="pg" className="font-bold!">
            {visions.at(currentVision)?.value} 
          </Text>
          <Text type="pg">
            {visions.at(currentVision)?.desc} 
          </Text>
          <img src={assetMap[visions.at(currentVision)?.img]}/>
        </div>
      </div>

      <div className="md:hidden flex flex-col ">
        <div className="flex flex-col gap-y-s-four">
          {visions.map((vis, idx) => (
            <div className="flex flex-col gap-y-s-four">
              <Text type="title" link={true} className={`w-fit cursor-pointer ${currentVision == idx ? "text-text" : "text-text/20"}`} onClick={() => {changeCurrentVision(idx)}}>{vis.value}</Text>
              
             { idx == currentVision ? (
                <div className="flex flex-col gap-y-s-four">
                  <Text type="pg">
                    {vis.desc}
                  </Text>
                  <img src={assetMap[vis.img]}/>
                </div>
              ) : (<></>)}


            </div>

          ))}
        </div>
        
      </div>

    </section>
  )
}

export default Vision;
