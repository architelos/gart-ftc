import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import Button from "@/components/Button";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function About() {
  const navigate = useNavigate();
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: p1Ref, inView: p1InView } = useInView();
  const { ref: p2Ref, inView: p2InView } = useInView();
  const { ref: buttonRef, inView: buttonInView } = useInView();

  return (
    <section ref={titleRef} className="flex flex-col gap-y-page w-full p-page bg-bg">
      <Text animate={titleInView} type="title">{t.home.about.title}</Text>
      <div className="flex flex-row items-start gap-x-page w-full">
        <img className="max-w-[60%] object-contain" src={assetMap["ph.avif"]} />
        <div className="flex flex-col gap-y-s-one">
          <div ref={p1Ref}><Text animate={p1InView} type="pg">{t.home.about.p1}</Text></div>
          <div ref={p2Ref}><Text animate={p2InView} type="pg">{t.home.about.p2}</Text></div>
          <div ref={buttonRef}>
            <Button icon={<ArrowRight />} type="accent" className={buttonInView ? "a-fade-in" : ""} onClick={() => navigate("/about")}>{t.home.about.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
