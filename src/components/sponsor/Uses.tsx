import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import data from "@/data/data";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

interface Use {
  use: string;
  desc: string;
  img: string;
}
interface UseColProps { use: Use; }

function UseCol({ use }: UseColProps) {
  return (
    <div className="flex flex-col gap-y-s-two">
      <img src={assetMap[use.img]} className="w-full object-contain" />
      <Text type="pg" className="max-w-[80%] font-bold!">{use.use}</Text>
      <Text type="pg" className="max-w-[80%]">{use.desc}</Text>
    </div>
  );
}

function Uses() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState("opacity-0 a-fade-in");

  const { ref: navRef, inView: navInView } = useInView();
  const { ref: usesRef, inView: usesInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { uses } = data(locale);

  const chunked: Use[][] = (uses as Use[]).reduce<Use[][]>((acc, curr, i) => {
    if (i % 2 === 0) acc.push([curr]);
    else acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  const next = () => {
    setFade("a-fade-out");

    setTimeout(() => {
      setIdx((idx) => (idx + 1) % chunked.length);
      setFade("opacity-0 a-fade-in");
    }, 200);
  };
  const back = () => {
    setFade("a-fade-out");

    setTimeout(() => {
      setIdx((idx) => (idx - 1 + chunked.length) % chunked.length);
      setFade("opacity-0 a-fade-in");
    }, 200);
  }

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={navRef} className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-baseline gap-x-page">
          <ChevronLeft onClick={back} className={`w-s-one h-s-one scale-on-hover cursor-pointer opacity-0 ${navInView ? "a-fade-in" : ""}`} />
          <ChevronRight onClick={next} className={`w-s-one h-s-one scale-on-hover cursor-pointer opacity-0 ${navInView ? "a-fade-in" : ""}`} />
        </div>
        <Text type="pg" animate={navInView} className="self-end font-bold!">{t.sponsor.uses.heading}</Text>
      </div>
      <div ref={usesRef} className={`gap-x-s-two grid grid-cols-2 w-full ${usesInView ? fade : `opacity-0 ${usesInView ? "a-fade-in" : ""}`}`}>
        {chunked[idx].map((chunk, i) => (
          <UseCol key={i} use={chunk} />
        ))}
      </div>
    </section>
  );
}

export default Uses;
