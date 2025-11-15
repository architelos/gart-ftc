import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Landing() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  return (
    <main
      className="relative flex flex-col justify-center items-center w-full h-screen p-page"
    >
      <img
        src={assetMap["pv.avif"]}
        alt="Landing Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 a-fade-in"
      />
      <div className="z-1 absolute w-full h-screen bg-linear-to-t from-30% from-bg/80 to-100% to-bg" />
      
      <div className="z-2 flex flex-col justify-end items-start gap-y-s-two w-full h-full">
        <Text type="title">{t.about.landing.main_heading}</Text>
        <Text type="pg" className= "text-accent!" style={{ animationDelay: "0.2s" }}>{t.about.landing.tagline}</Text>
      </div>

      
    </main>
  )
}

export default Landing;
