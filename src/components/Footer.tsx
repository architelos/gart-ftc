import { useEffect } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useMenuState from "@/hooks/useMenuState";
import assetMap from "@/data/assetMap";

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({ once: false });
  const { ref: navRef, inView: navInView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  const setFooterVisible = useMenuState((state) => state.setFooterVisible);

  useEffect(() => {
    setFooterVisible(footerInView);
  }, [footerInView, setFooterVisible]);

  return (
    <footer ref={footerRef} className="flex flex-col gap-y-s-three p-page bg-bg">
      <div ref={navRef} className="flex flex-row flex-wrap flex-0 gap-x-s-one gap-y-s-four mb-s-three">
        <Text type="pg" link={true} animate={navInView} href="/">Home</Text>
        <Text type="pg" link={true} animate={navInView} href="/about">About us</Text>
        <Text type="pg" link={true} animate={navInView} href="/robot">Our robot</Text>
        <Text type="pg" link={true} animate={navInView} href="/sponsor">Become a sponsor</Text>
      </div>

      <div className="flex flex-row flex-wrap flex-0 justify-between mb-l">
        <Text type="pg" className="font-bold!" link={true} animate={navInView} href="mailto:contact@greenams.com">contact@greenams.com</Text>
        <Text type="pg" className="font-bold!" link={true} animate={navInView} href="tel:+84123456789">+84 123456789</Text>
      </div>

      <div ref={imgRef} className="flex flex-col flex-1 justify-center">
        <img className={`object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} src={assetMap["footer.png"]} />
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-y-s-four">
        <Text type="sub" link={true} href="/privacy_policy">Privacy policy</Text>
        <Text type="sub">Copyright © GreenAms Robotics Team, all rights reserved</Text>
      </div>
    </footer>
  );
}

export default Footer;
