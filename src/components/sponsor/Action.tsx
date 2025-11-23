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
    <section className="flex flex-row justify-between gap-y-page p-page bg-bg">
      <div className="w-[40%]" ref={headingRef}>
        <Text type="title" className="w-fit" animate={headingInView}>{t.sponsor.action.heading}</Text>
      </div>
      <div className="flex flex-col self-end" ref={linksRef}>
        <Text type="pg" className="font-bold! cursor-pointer justify-self-center" link={true} animate={linksInView}><span className="inline-flex"><ArrowRight /></span>{t.tel}</Text>
        <Text type="pg" className="font-bold! cursor-pointer justify-self-center" link={true} animate={linksInView}><span className="inline-flex"><ArrowRight /></span>{t.email}</Text>
      </div>
    </section>
  );
}

export default Action;
