import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import data from "@/data/data";
import translations from "@/data/translations";

interface Subsystem {
  name: string;
  description: string;
  image: string;
}
interface SubsystemRowProps { i: number, subsystem: Subsystem };

function SubsystemRow({ i, subsystem }: SubsystemRowProps) {
  const { ref: textRef, inView: textInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  return (
    <div key={i} className={`flex md:flex-row flex-col gap-y-s-two md:gap-x-s-two md:h-[40dvh] ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
      <div ref={textRef} className={`flex flex-col md:w-[70%] gap-y-s-three ${i % 2 == 0 ? "md:text-right" : ""}`}>
        <Text type="pg" animate={textInView} className="font-bold!">{subsystem.name}</Text>
        <Text type="pg" animate={textInView}>{subsystem.description}</Text>
      </div>
      <div ref={imgRef} className="md:w-[30%] md:h-full">
        <img src={assetMap[subsystem.image]} className={`self-start w-full h-full object-cover opacity-0 ${imgInView ? "a-fade-in" : ""}`}></img>
      </div>
    </div>
  )
}

function Subsystems() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { subsystems } = data(locale);

  const { ref: titleRef, inView: titleInView } = useInView();

  return (
      <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={titleRef} className="self-end w-full max-w-[50%] md:max-w-[20%] text-right">
        <Text animate={titleInView} type="pg" className="font-bold!">{t.robot.subsystems.heading}</Text>
      </div>
      <div className="flex flex-col gap-y-page">
        {(subsystems as Subsystem[]).map((subsystem, i) => (
          <SubsystemRow key={i} i={i} subsystem={subsystem}></SubsystemRow>
        ))}
      </div>
    </section>
  );
}

export default Subsystems;
