import { ArrowRight } from "lucide-react";

import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import Button from "@/components/Button";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function About() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: p1Ref, inView: p1InView } = useInView();
  const { ref: p2Ref, inView: p2InView } = useInView();
  const { ref: buttonRef, inView: buttonInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={titleRef}><Text animate={titleInView} type="title">{t.home.about.title}</Text></div>
      <div className="flex md:flex-row flex-col items-start gap-x-page gap-y-s-two w-full">
        <img className={`md:max-w-[60%] object-contain opacity-0 ${p1InView ? "a-fade-in" : ""}`} src={assetMap["ph.avif"]} />
        <div className="flex flex-col gap-y-s-one">
          <div ref={p1Ref}><Text animate={p1InView} type="pg">{t.home.about.p1}</Text></div>
          <div ref={p2Ref}><Text animate={p2InView} type="pg">{t.home.about.p2}</Text></div>
          <div ref={buttonRef}>
            <Button icon={<ArrowRight />} type="accent" className={`opacity-0 ${buttonInView ? "a-fade-in" : ""}`} link="/about">{t.home.about.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
