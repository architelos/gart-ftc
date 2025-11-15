import { useRef } from "react";
import { ArrowDown } from "lucide-react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import useInView from "@/hooks/useInView";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

interface Process { value_name: string; img: string; description: string; }
interface PanelProps { process: Process; idx: number; step: number; scrollY: MotionValue<number>; isLast: boolean; }

function Panel({ process, idx, step, scrollY, isLast }: PanelProps) {
  const panelStart = idx * step;
  const panelEnd = (idx + 1) * step;

  // to ease out the animation
  const buffer = step * 0.15;
  // stay inside the animation range
  const from = Math.max(0, panelStart - buffer);
  const to = Math.min(1, panelEnd + buffer);

  const y = useTransform(
    scrollY,
    [from, panelStart, panelEnd, to],
    isLast ? ["100vh", "0vh", "0vh", "0vh"] : ["100vh", "0vh", "0vh", "-100vh"]
    // dont slide away if last + offset for navbar
  );
  const overlayOpacity = useTransform(
    scrollY,
    [panelStart, panelEnd],
    [0, 1]
  );

  return (
    <motion.div className="absolute inset-0 w-full h-dvh bg-bg" style={{ y, zIndex: idx }}>
      <div className="flex flex-col items-center h-full mt-page">
        <div className="flex flex-col items-center gap-y-page gap-y-text w-full md:max-w-[80%] h-dvh min-h-0 p-page">
          <div className="flex">
            <Text type="title">{process.value_name}</Text>
          </div>

          <div className="flex-1 min-h-0 max-h-[75%] md:max-h-[70%]">
            <img src={assetMap[process.img]} className="self-start w-full h-full object-cover" />
          </div>

          <Text type="pg">{process.description}</Text>
        </div>
      </div>

      {!isLast && (
        <motion.div
          className="absolute inset-0 bg-bg pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </motion.div>
  );
}

function Values() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: textRef, inView: textInView } = useInView();

  const panelsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: panelsRef,
    offset: ["start start", "end end"]
  });

  const processes = t.about.values.data;
  const step = 1 / processes.length;

  return (
    <section className="bg-bg">
      <div ref={textRef} className="flex flex-row justify-between items-baseline p-page pb-0">
        <Text animate={textInView} type="title">{t.about.values.title}</Text>
        <ArrowDown />
      </div>

      <div ref={panelsRef} className="relative" style={{ height: `${processes.length * 100}vh` }}>
        <div className="top-0 sticky w-full h-dvh overflow-hidden">
          {processes.map((process, i) => (
            <Panel
            key={i}
            idx={i}
            process={process}
            step={step}
            scrollY={scrollYProgress}
            isLast={i === processes.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values;
