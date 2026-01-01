import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";

function Video() {
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: videoRef, inView: videoInView } = useInView();

  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  return (
    <section className="flex flex-col gap-y-page w-full h-fit p-page bg-bg">
      <div ref={titleRef}><Text type="title" animate={titleInView}>{t.bamboo.video.heading}</Text></div>
      <div ref={videoRef}>
        <iframe
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className={`w-full aspect-video opacity-0 ${videoInView ? "a-fade-in" : ""}`}
          src={`https://www.youtube.com/embed/${t.bamboo.video.video}`} />
      </div>
    </section>
  );
}

export default Video;
