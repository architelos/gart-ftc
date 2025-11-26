import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import data from "@/data/data";
import translations from "@/data/translations";
import assetMap from "@/data/assetMap";

interface Figure {
  name: string,
  data: string
}
interface FigureRowProps { i: number; figure: Figure; }

function FigureRow({ i, figure }: FigureRowProps) {
  const { ref: figureRef, inView: figureInView } = useInView();
  const { ref: titleRef, inView: titleInView } = useInView();

  return (
    <div className={`flex flex-col gap-y-s-three md:items-center ${i % 2 !== 0 ? "text-right" : ""}`}>
      <div ref={figureRef}><Text type="title" animate={figureInView} className="text-accent!">{figure.data}</Text></div>
      <div ref={titleRef}><Text type="pg" animate={titleInView}>{figure.name}</Text></div>
    </div>
  );
}

function Figures() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { figures } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();

  const { ref: img1Ref, inView: img1InView } = useInView();
  const { ref: text1Ref, inView: text1InView } = useInView();
  const { ref: img2Ref, inView: img2InView } = useInView();
  const { ref: text2Ref, inView: text2InView } = useInView();
  const { ref: img3Ref, inView: img3InView } = useInView();
  const { ref: text3Ref, inView: text3InView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={headingRef} className="flex flex-col self-end gap-y-s-two md:max-w-[30%]">
        <Text type="title" animate={headingInView} className="text-right">{t.sponsor.figures.heading}</Text>
        <Text type="sub" animate={headingInView} className="text-right">{t.sponsor.figures.desc}</Text>
      </div>

      <div className="flex flex-row justify-between max-sm:gap-y-s-two max-sm:grid max-sm:grid-cols-2 max-sm:grid-rows-1 w-full">
        {figures.map((figure, i) => (
          <FigureRow key={i} i={i} figure={figure} />
        ))}
      </div>
      <div className="flex flex-col gap-y-s-two">
        <div className="flex md:flex-row flex-col gap-x-s-two gap-y-s-two">
          <div className="flex flex-col gap-y-s-four">
            <div ref={img1Ref}><img className={`md:w-[50vw] object-contain opacity-0 ${img1InView ? "a-fade-in" : ""}`} src={assetMap["sponsor/f1.avif"]} /></div>
            <div ref={text1Ref}><Text type="sub" animate={text1InView} className="font-bold! text-text">{t.sponsor.figures.i1}</Text></div>
          </div>
          <div className="flex flex-col gap-y-s-four">
            <div ref={img2Ref}><img className={`md:w-[50vw] object-contain opacity-0 ${img2InView ? "a-fade-in" : ""}`} src={assetMap["sponsor/f2.avif"]} /></div>
            <div ref={text2Ref}><Text type="sub" animate={text2InView} className="font-bold! text-text">{t.sponsor.figures.i2}</Text></div>
          </div>
        </div>
        <div className="flex flex-col gap-y-s-four">
          <div className="flex flex-col gap-y-s-four">
            <div ref={img3Ref}><img className={`object-contain opacity-0 ${img3InView ? "a-fade-in" : ""}`} src={assetMap["sponsor/f3.avif"]} /></div>
            <div ref={text3Ref}><Text type="sub" animate={text3InView} className="font-bold! text-text">{t.sponsor.figures.i3}</Text></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Figures;
