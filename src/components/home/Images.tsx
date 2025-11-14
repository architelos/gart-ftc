import assetMap from "@/data/assetMap";

function Images() {
  return (
    <section className="flex md:flex-row flex-col items-start gap-x-s-three gap-y-s-three w-full p-page bg-bg">
      <img src={assetMap["ph.avif"]} className="md:max-w-[70%] object-contain" />
      <img src={assetMap["pv.avif"]} className="md:max-w-[30%] object-contain" />
    </section>
  );
}

export default Images;
