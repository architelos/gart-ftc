import useInView from "@/hooks/useInView";
import assetMap from "@/data/assetMap";

function Images() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="flex md:flex-row flex-col items-start gap-x-s-three gap-y-s-three w-full p-page bg-bg">
      <img src={assetMap["home/2.2.avif"]} className={`md:max-w-[70%] object-contain opacity-0 ${inView ? "a-fade-in" : ""}`} />
      <img src={assetMap["home/2.3.avif"]} className={`md:max-w-[30%] object-contain opacity-0 ${inView ? "a-fade-in" : ""}`} />
    </section>
  );
}

export default Images;
