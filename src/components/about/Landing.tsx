import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Landing() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  return (
    <main 
      className="relative flex flex-col justify-center items-center w-full h-screen p-page bg-cover bg-center a-fade-in"
      style={{
        backgroundImage: `url(${assetMap["pv.avif"]})`,
        backgroundAttachment: "cover"
      }}
    >
      <div className="flex flex-col w-full h-full z-1">
        <div className="flex flex-col justify-end items-start w-full h-full p-page z-1">
          <Text type="title" className= "z-1">{t.about.landing.main_heading}</Text>
          <Text type="pg" className= "z-1 text-accent!">{t.about.landing.tagline}</Text>
        </div>
      </div>

      <div className="z-0 absolute w-full h-screen bg-linear-to-t from-30% from-bg/80 to-100% to-bg" />
    </main>
  )
}

export default Landing;
