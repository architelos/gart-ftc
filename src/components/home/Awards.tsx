import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useIsMd from "@/hooks/useIsMd";
import useInView from "@/hooks/useInView";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";
import data from "@/data/data";

interface Award {
  year: string;
  award: string;
  description: string;
}
interface AwardRowProps { award: Award; isMd: boolean; }

function AwardRow({ award, isMd }: AwardRowProps) {
  const { ref: textRef, inView: textInView} = useInView();
  const { ref: descSmRef, inView: descSmInView } = useInView();

  return (
    <>
      <div ref={textRef}><Text type="pg" animate={textInView}>{award.year}</Text></div>
      <div className="flex flex-col gap-y-s-four">
        <Text type="pg" animate={textInView} className={!isMd ? "font-bold!" : ""}>{award.award}</Text>
        {!isMd && <div ref={descSmRef}><Text type="pg" animate={descSmInView}>{award.description}</Text></div>}
      </div>
      {isMd && <Text type="pg" animate={textInView}>{award.description}</Text>}
    </>
  )
}

function Awards() {
  const isMd = useIsMd();
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { awards } = data(locale);

  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: legendRef, inView: legendInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={imgRef} className="flex flex-col gap-y-s-two">
        <div ref={headerRef}><Text type="title" animate={headerInView}>{t.home.awards.header}</Text></div>
        <Text type="pg" animate={headerInView} className="md:max-w-[60%]">{t.home.awards.header2}</Text>
        <img src={assetMap["home/10.avif"]} className={`opacity-0 ${imgInView ? "a-fade-in" : ""}`} />
      </div>
      <div className="gap-x-s-two gap-y-s-two grid grid-cols-[3fr_7fr] md:grid-cols-[1fr_1fr_2fr]">
        <div ref={legendRef}><Text type="sub" animate={legendInView}>{t.home.awards.year}</Text></div>
        <Text type="sub" animate={legendInView}>{t.home.awards.award}</Text>
        {isMd && <Text type="sub" animate={legendInView}>{t.home.awards.add}</Text>}
        {awards.map((award, i) => (
          <AwardRow key={i} award={award} isMd={isMd} />
        ))}
      </div>
    </section>
  );
}

export default Awards;
