import useLocale from "@/hooks/useLocale";
import Text from "@/components/Text";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import Images from "@/data/strings/robotImages.json"

function Gallery() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const images = Images[locale];

  const rowSpans = [2, 1, 2, 2, 1, 2, 1, 1, 2];

  return (
    <section className="flex flex-col gap-y-page w-full h-fit p-page bg-bg">
      <div className="flex flex-col gap-y-s-four h-fit">
        <Text type="title">{t.robot.gallery.heading}</Text>
        <div className="flex flex-row flex-wrap gap-s-four self-center justify-self-center">
          <div className="gap-s-three grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-[200px] w-full">
            {images.map((image, idx) => {
              const rowSpan = rowSpans[idx % rowSpans.length];
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-y-s-four"
                  style={{ gridRow: `span ${rowSpan}` }}
                >
                  <img
                    src={assetMap[image.img]}
                    className="h-full object-cover"
                  />
                  <Text type="sub" className="h-fit">{image.desc}</Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
