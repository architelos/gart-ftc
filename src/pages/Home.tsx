import Hero from "@/components/home/Hero";
import Images from "@/components/home/Images";
import About from "@/components/home/About";
import Sponsors from "@/components/home/Sponsors";
// import Updates from "@/components/home/Updates";
import Awards from "@/components/home/Awards";
import Faq from "@/components/home/Faq";
import Resources from "@/components/home/Resources";
import Break from "@/components/Break";

function Home() {
  return (
    <>
      <Hero />
      <Images />
      <Break />
      <About />
      <Break />
      <Sponsors />
      <Break />
      {/* <Updates />
      <Break /> */}
      <Awards />
      <Break />
      <Faq />
      <Break />
      <Resources />
    </>
  )
}

export default Home;
