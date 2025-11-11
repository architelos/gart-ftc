import { useEffect } from "react";

import Text from "@/components/Text";
import useInView from "@/hooks/useInView";
import useMenuState from "@/hooks/useMenuState";

function Footer() {
  const { ref: footerRef, inView: footerInView } = useInView({ once: false });
  const setFooterVisible = useMenuState((state) => state.setFooterVisible);

  useEffect(() => {
    setFooterVisible(footerInView);
    console.log(footerInView)
  }, [footerInView, setFooterVisible]);

  return (
    <div ref={footerRef} className="p-page">
      <Text type="title">wow really cool footer!</Text>
    </div>
  );
}

export default Footer;
