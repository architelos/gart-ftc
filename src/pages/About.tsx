import Landing from "@/components/about/Landing";
import Missions from "@/components/about/Missions";
import Team from "@/components/about/Team";
import Values from "@/components/about/Values";
import Vision from "@/components/about/Vision";
import Break from "@/components/Break";

function About() {
  return (
    <>
      <Landing />
      <Missions />
      <Break />
      <Team />
      <Break />
      <Values />
      <Break />
      <Vision />
    </>
  );
}

export default About;
