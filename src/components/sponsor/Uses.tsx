import Text from "@/components/Text";
import assetMap from "@/data/assetMap";

const uses = [
  {
    "use": "Community Sports Program",
    "desc": "Funds are used to run free weekend sports sessions for underprivileged kids, including coaching, equipment, and facility rental.",
    "img": "pv.avif"
  },
  {
    "use": "Scholarship Fund",
    "desc": "The sponsorship supports annual scholarships for promising students in design, architecture, and engineering.",
    "img": "ph.avif"
  },
  {
    "use": "Environmental Initiative",
    "desc": "Money goes to tree-planting drives, waste-sorting campaigns, and maintaining green spaces around the city.",
    "img": "pv.avif"
  },
  {
    "use": "Innovation Lab",
    "desc": "Sponsors help build and maintain a small innovation lab where students can experiment with new technology and prototypes.",
    "img": "ph.avif"
  },
  {
    "use": "Public Art Installation",
    "desc": "Funds are used to commission local artists to create murals and pop-up art pieces to beautify community spaces.",
    "img": "ph.avif"
  }
]

interface Use {
  use: string;
  desc: string;
  img: string;
}

function Uses() {
  const chunked: Use[][] = (uses as Use[]).reduce<Use[][]>((acc, curr, i) => {
    if (i % 2 === 0) acc.push([curr]);
    else acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div className="items-center w-full text-center">
        <Text type="pg" className="font-bold!">How your generosity benefits us</Text>
      </div>
      <div className="gap-x-s-two grid grid-cols-2 w-full">
        <div className="flex flex-col gap-y-s-two">
          <img src={assetMap["pv.avif"]} className="w-full object-contain" />
          <Text type="pg" className="max-w-[80%] font-bold!">Lorem ipsum</Text>
          <Text type="pg" className="max-w-[80%]">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </Text>
        </div>
        <div className="flex flex-col gap-y-s-two">
          <img src={assetMap["pv.avif"]} className="w-full object-contain" />
          <Text type="pg" className="max-w-[80%] font-bold!">Lorem ipsum</Text>
          <Text type="pg" className="max-w-[80%]">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </Text>
        </div>
      </div>
    </div>
  );
}

export default Uses;
