import { ArrowRight } from "lucide-react"

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import translations from "@/data/translations";

function Action() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: linksRef, inView: linksInView } = useInView();

  return (
    <section className="flex md:flex-row flex-col md:justify-between gap-y-page p-page bg-bg">
      <div className="md:w-[30%]" ref={headingRef}>
        <Text type="title" animate={headingInView}>{t.sponsor.action.heading}</Text>
      </div>
      <div className="flex flex-col md:self-end gap-y-s-three" ref={linksRef}>
        <div className={`flex flex-row items-center gap-x-s-four opacity-0 ${linksInView ? "a-fade-in" : ""}`}>
          <ArrowRight />
          <Text type="pg" link={true} href={`tel:${t.tel}`} className="font-bold!">{t.tel}</Text>
        </div>
        <div className={`flex flex-row items-center gap-x-s-four opacity-0 ${linksInView ? "a-fade-in" : ""}`}>
          <ArrowRight />
          <Text type="pg" link={true} href={`mailto:${t.email}`} className="font-bold!">{t.email}</Text>
        </div>
      </div>
    </section>
  );
}

export default Action;
