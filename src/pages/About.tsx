import useIsMd from "@/hooks/useIsMd";

import Landing from "@/components/about/Landing";
import Missions from "@/components/about/Missions";
import Team from "@/components/about/Team";
import Values from "@/components/about/Values";
import Vision from "@/components/about/Vision";
import Resources from "@/components/about/Resources";
import Break from "@/components/Break";

function About() {
  const isMd = useIsMd();

  return (
    <>
      <Landing />
      <Missions />
      <Break />
      {isMd && (
        <>
          <Break />
          <Break />
        </>
      )}
      <Team />
      <Break />
      <Values />
      <Break />
      <Vision />
      <Break />
      <Resources />
    </>
  );
}

export default About;
