import Landing from "@/components/bamboo/Landing";
import Overview from "@/components/bamboo/Overview";
import Subsystems from "@/components/bamboo/Subsystems";
import Video from "@/components/bamboo/Video";
import Resources from "@/components/bamboo/Resources";
import Gallery from "@/components/bamboo/Gallery";
import Break from "@/components/Break";

function BambooBot() {
  return (
    <>
      <Landing/>
      <Overview />
      <Break />
      <Subsystems />
      <Break />
      <Video />
      <Break />
      <Gallery />
      <Break />
      <Resources />
    </>
  );
}

export default BambooBot;
