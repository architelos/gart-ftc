import Landing from "@/components/robot/Landing";
import Overview from "@/components/robot/Overview";
import Subsystems from "@/components/robot/Subsystems";
import Video from "@/components/robot/Video";
import Gallery from "@/components/robot/Gallery";

function Robot() {
  return (
    <> 
      <Landing/>
      <Overview />
      <Subsystems />
      <Video />
      <Gallery />
    </>
  );
}

export default Robot;
