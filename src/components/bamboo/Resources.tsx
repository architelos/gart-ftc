import type { MouseEvent } from "react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import translations from "@/data/translations";
import data from "@/data/data";

type Resource = {
  title: string;
  link: string;
}

type ResourceTextProps = {
  resource: Resource
}

function ResourceText({ resource }: ResourceTextProps) {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.open(resource.link, "_blank", "noopener,noreferrer");
  }

  const { ref, inView } = useInView();

  return (
    <div ref={ref}>
      <Text type="pg" link={true} href={resource.link} animate={inView} onClick={onClick}>{resource.title}</Text>
    </div>
  );
}

function Resources() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { bamboo_resources } = data(locale);

  const { ref, inView } = useInView();

  return (
    <div className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={ref}><Text type="title" animate={inView}>{t.bamboo.rss.heading}</Text></div>
      <div className="flex flex-row gap-x-page gap-y-s-two">
        {bamboo_resources.map((resource, i) => (
          <ResourceText key={i} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default Resources;
