import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Subsystems() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: subsystemRef, inView: subsystemInView } = useInView();

  return (
      <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={titleRef}><Text animate={titleInView} type="title">{t.robot.subsystems.heading}</Text></div>
      <div className="flex flex-col align-middle justify-center gap-y-page" ref={subsystemRef}>
        {t.robot.subsystems.subsystems.map((item, i) => (
          <div className={`flex md:flex-row flex-col-reverse md:gap-x-s-three gap-y-page ${i % 2 == 0 ? "md:flex-row-reverse" : ""}` }>
            <div className="md:max-w-[40%] md:max-h-[20%]">
              <img src={assetMap[item.image]} className="self-start w-full h-full object-cover"></img>
            </div>
            
            <div key={i} className="flex flex-col gap-y-s-three">
              <Text type="pg" className="font-bold!" animate={subsystemInView}>{item.name}</Text>
              <Text type="pg" animate={subsystemInView}>{item.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Subsystems;
