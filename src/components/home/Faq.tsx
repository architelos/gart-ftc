import { useState } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import data from "@/data/data";
import translations from "@/data/translations";

function Faq() {
  const [idx, setIdx] = useState<number | null>(null);
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { faqs } = data(locale);

  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: contentRef, inView: contentInView } = useInView();

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={headingRef} className="md:self-center md:w-[40%] md:text-center">
        <Text type="title" animate={headingInView}>{t.home.faq.heading}</Text>
      </div>
      <div ref={contentRef} className={`flex flex-col gap-y-s-two opacity-0 ${contentInView ? "a-fade-in" : ""}`}>
        {faqs.map((faq, i) => (
          <div key={i} className="flex flex-col gap-y-s-three">
            <Text type="pg" clickable={true} onClick={() => setIdx(i)} className={`cursor-pointer transition-colors duration-300 ${idx !== i ? "text-text/25!" : ""}`}>
              <span className="font-bold!">{t.home.faq.q}</span> {faq.q}
            </Text>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${idx === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="min-h-0">
                <Text type="pg">
                  <span className="font-bold!">{t.home.faq.a}</span> {faq.a}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
