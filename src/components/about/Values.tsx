import { useRef } from 'react';

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import useInView from "@/hooks/useInView";

import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

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
    isLast ? ["100vh", "0vh", "0vh", "0vh"] : ["100vh", "0vh", "0vh", "-100vh"] // dont slide away if last
  );
  const overlayOpacity = useTransform(
    scrollY,
    [panelStart, panelEnd],
    [0, 1]
  );

  return (
    <motion.div className="absolute inset-0 w-full h-full" style={{ y, zIndex: idx }}>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-[20%] p-page">
          <Text type="title">{String(idx + 1).padStart(2, '0')}</Text>
        </div>

        {/* add min-h-0 to allow sizing below intrinsic size */}
        <div className="flex flex-col md:w-[80%] h-full gap-y-text p-page min-h-0 gap-y-page">
          <Text type="title">{process.value_name}</Text>
          <div className="flex-1 min-h-0 max-h-[80%]">
            <img src={assetMap[process.img]} className="h-full w-full object-cover self-start" />
          </div>
          <Text type="pg">{process.description}</Text>
        </div>
      </div>

      {!isLast && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
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
      <div ref={textRef} className="flex flex-row justify-between p-page items-baseline">
        <Text animate={textInView} type="title" className="max-w-[90%]">{t.about.values.title}</Text>
      </div>

      <div ref={panelsRef} className="relative" style={{ height: `${processes.length * 100}vh` }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {processes.map((process, i) => (
            <Panel key={i} idx={i} process={process} step={step} scrollY={scrollYProgress} isLast={i === processes.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values;
