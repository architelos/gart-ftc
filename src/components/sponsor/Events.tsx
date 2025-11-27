import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

interface Event {
  img: string;
  name: string;
  full: boolean;
}

interface EventProps { event: Event }

function Event({ event }: EventProps) {
  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: textRef, inView: textInView } = useInView();

  return (
    <div className={`flex flex-col gap-y-s-four ${event.full ? "col-span-2" : ""}`}>
      <div ref={imgRef}><img className={`object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} src={assetMap[event.img]} /></div>
      <div ref={textRef}><Text type="sub" animate={textInView} className="font-bold! text-text">{event.name}</Text></div>
    </div>
  );
}

function Events() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { events } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page p-page bg-bg">
      <div ref={headingRef}><Text type="pg" animate={headingInView} className="font-bold!">{t.sponsor.event.heading}</Text></div>
      <div className="gap-x-s-two gap-y-s-two grid grid-cols-1 md:grid-cols-2">
        {events.map((item, i) => (
          <Event key={i} event={item} />
        ))}
      </div>
    </section>
  )
}

export default Events;
