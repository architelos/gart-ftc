import { useEffect } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useMenuState from "@/hooks/useMenuState";

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({ once: false });
  const setFooterVisible = useMenuState((state) => state.setFooterVisible);

  useEffect(() => {
    setFooterVisible(footerInView);
  }, [footerInView, setFooterVisible]);

  return (
    <footer
      ref={footerRef}
      className="p-page bg-bg flex flex-col gap-y-s-four md:h-screen"
    >
      {/* nav */}
      <div className="flex flex-row flex-0 flex-wrap gap-x-s-one mb-l">
        <Text type="pg" link={true} href="/">Home</Text>
        <Text type="pg" link={true} href="/about">About us</Text>
        <Text type="pg" link={true} href="/robot">Our robot</Text>
        <Text type="pg" link={true} href="/aponsor">Become a sponsor</Text>
      </div>

      {/* contact */}
      <div className="flex flex-row justify-between flex-0 flex-wrap mb-l">
        <Text type="pg" className="font-bold" link={true} href="mailto:contact@greenams.com">contact@greenams.com</Text>
        <Text type="pg" className="font-bold">+84 123456789</Text>
      </div>

      <div className="flex flex-col flex-1 justify-center">
          <Text
            type="title"
            className="text-center leading-none"
            style={{
              fontSize: "30vmin",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            GART
          </Text>

          <Text
            type="title"
            className="text-center leading-none"
            style={{
              fontSize: "25vmin",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            #24751
          </Text>
      </div>
s
      <div className="flex flex-row justify-between flex-wrap">
        <Text type="sub" link={true} href="/privacy_policy">Privacy policy</Text>
        <Text type="sub">Copyright © GreenAms Robotics Team, all rights reserved</Text>
      </div>
      
    </footer>
  );
}

export default Footer;
