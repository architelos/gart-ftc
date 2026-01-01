import Landing from "@/components/robot/Landing";
import Overview from "@/components/robot/Overview";
import Subsystems from "@/components/robot/Subsystems";
import Video from "@/components/robot/Video";
import Gallery from "@/components/robot/Gallery";
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
    </>
  );
}

export default BambooBot;
