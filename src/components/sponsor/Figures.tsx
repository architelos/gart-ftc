import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import figures from "@/data/strings/figures.json";
import translations from "@/data/translations";

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

  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page p-page bg-bg">
      <div ref={headingRef}><Text type="title" animate={headingInView} className="text-right">{t.sponsor.figures.heading}</Text></div>

      <div className="flex flex-row justify-between max-sm:gap-y-s-two max-sm:grid max-sm:grid-cols-2 max-sm:grid-rows-1 w-full">
        {figures["en"].map((figure, i) => (
          <FigureRow i={i} figure={figure} />
        ))}
      </div>
    </section>
  );
}

export default Figures;
