import { useState } from "react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
// import assetMap from "@/data/assetMap";
import translations from "@/data/translations";

type Person = {
  name: string;
  job_title: string;
};

function Team() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { headings, people } = t.about.team;
  const [curr, setCurr] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <Text type="title">{t.about.team.title}</Text>
      {Object.entries(headings).map(([divisionKey, divisionName], i) => (
        <section key={divisionKey}>
          <div>
            <Text type="sub" className="text-left">{divisionName}</Text>
          </div>

          {people[divisionKey as keyof typeof people]?.map((person: Person, j: number) => (
            <div
              key={i * 100 + j}
              className="flex md:flex-row flex-col items-baseline gap-x-page w-full"
              onMouseOver={() => { setCurr(i * 100 + j); }}
              onClick={() => { setCurr(i * 100 + j); }}
            >
              <div className="hidden md:flex flex-row w-[40%]">
                <Text
                  type="sub"
                  className={`w-full text-right transition-colors duration-200 ${i * 100 + j !== curr ? "text-text/20" : ""}`}
                >
                  {person.job_title}
                </Text>
              </div>

              <Text
                type="title"
                className={`transition-colors duration-200 ${i * 100 + j !== curr ? "text-text/20" : ""}`}
              >
                {person.name}
              </Text>
              <div className="md:hidden flex flex-row w-full">
                <Text
                  type="sub"
                  className={`w-full text-right transition-colors duration-200 ${i * 100 + j !== curr ? "text-text/20" : ""}`}
                >
                  {person.job_title}
                </Text>
              </div>
            </div>
          ))}
        </section>
      ))}
    </section>
  );
}

export default Team;
