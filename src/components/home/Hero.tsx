import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Hero() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  return (
    <main className="relative flex flex-col justify-center items-center w-full h-dvh p-page">
      <div className="md:max-w-1/2 pb-s-two text-center">
        <Text type="title" className="text-accent!">{t.home.hero.accented}</Text>
        <Text type="title">{t.home.hero.unaccented}</Text>
      </div>
      <Text type="pg" className="text-center">{t.home.hero.tagline}</Text>
      <Text type="sub" className="bottom-page absolute w-full text-center" style={{ animationDelay: "0.2s" }}>{t.home.hero.end}</Text>

      <div className="z-[-1] absolute w-full h-dvh bg-linear-to-t from-30% from-bg/80 to-100% to-bg" />
      <div className="z-[-2] absolute flex md:flex-row flex-col justify-between gap-y-s-page w-full h-dvh overflow-hidden p-page bg-bg">
        <img className="md:self-start md:max-w-[40%] max-h-[50%] md:max-h-[80%] object-contain rotate-[-25deg] a-fade-in" src={assetMap["pv.avif"]} />
        <img className="md:self-end md:max-w-[40%] max-h-[50%] object-contain rotate-20 a-fade-in" style={{ animationDelay: "0.1s" }} src={assetMap["ph.avif"]} />
      </div>
    </main>
  );
}

export default Hero;
