import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Landing() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  return (
    <main
      className="relative flex flex-col justify-center items-center w-full h-dvh p-page"
    >
      {/* <img
        src={assetMap["pv.avif"]}
        alt="Landing Background"
        className="top-0 left-0 z-0 absolute w-full h-dvh object-cover a-fade-in"
      /> */}
      <div className="z-1 absolute w-full h-dvh bg-linear-to-t from-30% from-bg/80 to-100% to-bg" />

      <div className="z-2 flex flex-col justify-end items-start gap-y-s-four w-full h-dvh">
        <Text type="title">{t.bamboo.landing.header_text_1}</Text>
        <Text type="title" className="text-accent!">{t.bamboo.name}</Text>
      </div>

    </main>
  )
}

export default Landing;
