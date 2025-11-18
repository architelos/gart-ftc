import useLocale from "@/hooks/useLocale";
import Text from "@/components/Text";
import translations from "@/data/translations";

function Video() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);


  return (
    <section className="flex flex-col gap-y-page w-full h-fit p-page bg-bg">
      <div className="flex flex-col gap-y-s-four h-fit">
        <Text type="title">{t.robot.video.heading}</Text>
      <Text type="title" className="self-center justify-self-center">insert video here 😛</Text>
      </div>
    </section>
  );
}

export default Video;
