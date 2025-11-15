import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

function Values() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <Text type="title">Our values</Text>
    </section>
  )
}

export default Values;
