import Text from "@/components/Text";
import useIsMd from "@/hooks/useIsMd";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import dims from "@/data/dims.json";
import updates from "@/data/strings/updates.json";
import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

interface Update {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
};

interface ContentProps { update: Update };
function Content({ update }: ContentProps) {
  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: descRef, inView: descInView } = useInView();

  return (
    <div ref={imgRef} className="flex flex-col gap-y-s-three">
      <img className={`max-w-full object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} src={assetMap[update.image]} />
      <div ref={titleRef} className="flex flex-col gap-y-s-four max-w-[80%]">
        <Text type="pg" animate={titleInView} className="font-bold!">{update.title}</Text>
        <Text type="sub" animate={titleInView}>{update.date}</Text>
      </div>
      <div ref={descRef}><Text type="pg" animate={descInView} className="max-w-[80%]">{update.description}</Text></div>
    </div>
  );
}

function Updates() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const isMd = useIsMd();

  const {ref: titleRef, inView: titleInView} = useInView();
  const {ref: _titleRef, inView: _titleInView} = useInView();

  if (isMd) {
    const chunked: Update[][] = (updates[locale] as Update[]).reduce<Update[][]>((acc, curr, i) => {
      if (i % 2 === 0) acc.push([curr]);
      else acc[acc.length - 1].push(curr);
      return acc;
    }, []);

    return (
      <section className="flex flex-col gap-y-page w-full p-page bg-bg">
        <div ref={titleRef}><Text type="title" animate={titleInView} className="text-right!">{t.home.updates.updates}</Text></div>
        <div className="flex flex-col gap-y-s-two w-full">
          {chunked.map((updateRow, i) => {
            const _dims = dims as Record<string, Record<string, number>>;
            let totalW = _dims[updateRow[0].image]["w"];
            if (updateRow.length > 1) totalW += _dims[updateRow[1].image]["w"];

            return (
              <div key={i} className="flex flex-row gap-x-s-two w-full">
                {updateRow.map((update) => (
                  <div key={update.id} style={{ width: updateRow.length === 1 ? "65%" : `${_dims[update.image]["w"] / totalW * 100}%` }}>
                    <Content update={update} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={_titleRef}><Text type="title" animate={_titleInView} className="text-right!">{t.home.updates.updates}</Text></div>
      <div className="flex flex-col gap-y-s-two">
        {(updates[locale] as Update[]).map((update, i) => (
          <Content key={i} update={update} />
        ))}
      </div>
    </section>
  );
}

export default Updates;
