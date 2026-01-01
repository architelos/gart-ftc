import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";
import data from "@/data/data";
import dims from "@/data/dims.json";

interface Image {
  img: string;
  desc: string;
}
interface Dimensions {
  w: number;
  h: number;
}
interface GalleryItemProps { img: Image; }

function GalleryItem({ img }: GalleryItemProps) {
  const { ref: imageRef, inView: imageInView } = useInView();
  const { ref: textRef, inView: textInView } = useInView();

  const _dims = dims as Record<string, Dimensions>;
  const dim = _dims[img.img];
  const ratio = dim ? dim.w / dim.h : 1;
  const span = ratio >= 1.2 && dim["w"] >= 1440;

  return (
    <div className={`flex flex-col gap-y-s-four ${span ? "md:col-span-2" : ""}`}>
      <div ref={imageRef}>
        <img
          className={`w-full h-auto object-contain opacity-0 ${imageInView ? "a-fade-in" : ""}`}
          style={{ aspectRatio: ratio }}
          src={assetMap[img.img]}
          alt={img.desc}
        />
      </div>
      {img.desc && (
        <div ref={textRef}><Text type="sub" animate={textInView} className="text-text">{img.desc}</Text></div>
      )}
    </div>
  );
}

function Gallery() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { bamboo_images } = data(locale);

  return (
    <section className="flex flex-col gap-y-page p-page bg-bg">
      <Text type="title">{t.bamboo.gallery.heading}</Text>
      <div className="gap-x-s-two gap-y-s-two grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {(bamboo_images as Image[]).map((img, i) => {
          return (
            <GalleryItem key={i} img={img} />
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
