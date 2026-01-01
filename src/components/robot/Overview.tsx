import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Overview() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: d1Ref, inView: d1InView } = useInView();
  // const { ref: d2Ref, inView: d2InView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={titleRef}><Text animate={titleInView} type="title">{t.robot.overview.heading}</Text></div>
      <div className="flex justify-center align-middle">
        <div className="flex flex-col items-center gap-x-page gap-y-s-two w-fit md:max-w-[60%]">
        <div ref={imgRef} className="flex justify-center"><img className={`object-contain opacity-0 max-w-[50%] ${imgInView ? "a-fade-in" : ""}`} src={assetMap["robot/bamboo_bot_logo.avif"]} /></div>
        <div className="flex flex-col self-start gap-y-s-two md:max-w-full">
          <div ref={d1Ref}><Text animate={d1InView} type="pg">{t.robot.overview.d1}</Text></div>
          {/* <div ref={d2Ref}><Text animate={d2InView} type="pg">{t.robot.overview.d2}</Text></div> */}
        </div>
      </div>
      </div>
    </section>
  );
}

export default Overview;
