import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import figures from "@/data/strings/figures.json";
import translations from "@/data/translations";

interface FigureInterface {
  name: string,
  data: string
}

function Figure({ figure }: { figure: FigureInterface }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="flex md:flex-col flex-col-reverse w-40 h-fit items-center justify-center m-2"
    >
      <div className={`${inView ? "a-fade-in" : "opacity-0"}`}>
        <Text type="title" className="text-center text-accent!">
          {figure.data}
        </Text>
      </div>
      <div className={`s${inView ? "a-fade-in" : "opacity-0"}`}>
        <Text type="pg" className="font-bold! text-center">
          {figure.name}
        </Text>
      </div>
    </div>
  );
}

function Figures() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const _figures = figures[locale];

  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col md:justify-between gap-y-s-four max-sm:gap-y-page w-full p-page bg-bg">
      <div ref={headingRef}>
        <Text type="title" animate={headingInView}>
          {t.sponsor.figures.heading}
        </Text>
      </div>

      <div className="grid gap-s-one w-full place-items-center">
        {_figures.map((figure: FigureInterface, i: number) => (
          <Figure key={i} figure={figure} />
        ))}
      </div>
    </section>
  );
}

export default Figures;
