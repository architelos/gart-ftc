import { useRef } from "react";
import { ArrowDown } from "lucide-react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import data from "@/data/data";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

interface Process { value: string; img: string; desc: string; }
interface PanelProps { value: Process; idx: number; step: number; scrollY: MotionValue<number>; isLast: boolean; }

function Panel({ value, idx, step, scrollY, isLast }: PanelProps) {
  const panelStart = idx * step;
  const panelEnd = (idx + 1) * step;

  // to ease out the animation
  const buffer = step * 0.05;
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
    <motion.div className="absolute inset-0 flex flex-row justify-end w-full h-dvh bg-bg" style={{ y, zIndex: idx, paddingLeft: "calc(2 * var(--spacing-page)" }}>
      <div className="flex flex-col h-full p-page">
        <div className="flex flex-col gap-y-page w-full h-dvh">
          <Text type="title">{value.value}</Text>

          <div className="w-full max-h-[60%]">
            <img src={assetMap[value.img]} className="w-full h-full object-contain object-left" />
          </div>

          <Text type="pg">{value.desc}</Text>
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
  const { values } = data(locale);

  const { ref: textRef, inView: textInView } = useInView();

  const panelsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: panelsRef,
    offset: ["start start", "end end"]
  });

  const step = 1 / values.length;

  return (
    <section className="bg-bg">
      <div ref={textRef} className="flex flex-row justify-between items-baseline p-page pb-0">
        <ArrowDown className={`opacity-0 ${textInView ? "a-fade-in" : ""}`} />
        <Text animate={textInView} type="title">{t.about.values.title}</Text>
      </div>

      <div ref={panelsRef} className="relative" style={{ height: `${values.length * 100}vh` }}>
        <div className="top-0 sticky w-full h-dvh overflow-hidden">
          {values.map((process, i) => (
            <Panel
              key={i}
              idx={i}
              value={process}
              step={step}
              scrollY={scrollYProgress}
              isLast={i === values.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values;
