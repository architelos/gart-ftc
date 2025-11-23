import Text from "@/components/Text";
import assetMap from "@/data/assetMap";

function Uses() {
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
