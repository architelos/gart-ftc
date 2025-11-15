import Hero from "@/components/home/Hero";
import Images from "@/components/home/Images";
import About from "@/components/home/About";
import Sponsors from "@/components/home/Sponsors";
import Break from "@/components/Break";

function Home() {
  return (
    <>
      <Hero />
      <Break />
      <Images />
      <Break />
      <About />
      <Break />
      <Sponsors />
    </>
  )
}

export default Home;
