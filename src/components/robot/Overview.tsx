import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Overview() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: overviewRef, inView: overviewInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={titleRef}><Text animate={titleInView} type="title">{t.robot.overview.heading}</Text></div>
      <div className="flex align-middle justify-center">
        <div className="flex flex-col items-center gap-x-page gap-y-s-two w-fit md:max-w-[60%]">
        <img className={`object-contain opacity-0 ${overviewInView ? "a-fade-in" : ""}`} src={assetMap["ph.avif"]} />
        <div className="flex flex-col gap-y-s-one">
          <div ref={overviewRef}><Text animate={overviewInView} type="pg">{t.robot.overview.description}</Text></div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Overview;
