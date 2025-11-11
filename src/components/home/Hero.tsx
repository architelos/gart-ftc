import Text from "@/components/Text";
import assetMap from "@/data/assetMap";

function Hero() {
  return (
    <main className="relative flex flex-col justify-center items-center w-full h-screen p-page">
      <div className="md:max-w-1/2 pb-s-two text-center">
        <Text type="title" className="text-accent!">GreenAms</Text>
        <Text type="title">Robotics Team</Text>
      </div>
      <Text type="pg" className="text-center">FTC #24751 — We build robots and help other teams learn</Text>
      <Text type="sub" className="bottom-page absolute w-full text-center" style={{ animationDelay: "0.2s" }}>(scroll to explore)</Text>

      <div className="z-[-1] absolute w-full h-screen bg-linear-to-t from-30% from-black/80 to-100% to-black" />
      <div className="z-[-2] absolute flex md:flex-row flex-col justify-between gap-y-s-page w-full h-screen overflow-hidden p-page bg-bg">
        <img className="md:self-start md:max-w-[40%] max-h-[50%] md:max-h-[80%] object-contain rotate-[-25deg] a-fade-in" src={assetMap["pv.avif"]} />
        <img className="md:self-end md:max-w-[40%] max-h-[50%] object-contain rotate-20 a-fade-in" style={{ animationDelay: "0.1s" }} src={assetMap["ph.avif"]} />
      </div>
    </main>
  );
}

export default Hero;
