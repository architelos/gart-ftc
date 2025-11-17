import { useState } from "react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import translations from "@/data/translations";
import people from "@/data/strings/people.json";

type Person = { name: string, job: string };
type Divisions = "programming" | "mechanical" | "business";

function Team() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);

  const [hoveredPerson, setHoveredPerson] = useState<Person | null>(null);

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <Text type="title">{t.about.team.title}</Text>
      {(Object.entries(t.about.team.divisions) as [Divisions, string][]).map(([key, name]) => (
        <div key={key}>
          <div>
            <Text type="sub" className="text-left">{name}</Text>
          </div>

          {(people as Record<string, Person[]>)[key].map((person, pIdx) => (
            <div
              key={pIdx}
              className="flex md:flex-row flex-col items-baseline gap-x-page w-full"
              onMouseOver={() => { setHoveredPerson(person);}}
              onMouseLeave={() => {setHoveredPerson(null);}}
            >
              {/* desktop job title */}
              <div className="hidden md:flex flex-row w-[40%]">
                <Text
                  type="sub"
                  className={`w-full text-right transition-colors duration-200 ${hoveredPerson != person ? "text-text/20" : ""}`}
                >
                  {(t.about.team.jobs as Record<string, string>)[person.job]}
                </Text>
              </div>

              <Text
                type="title"
                className={`flex transition-colors duration-200 ${hoveredPerson != person ? "md:text-text/20" : ""}`}
              >
                {person.name}
              </Text>


              {/* mobile job title */}
              <div className="md:hidden flex flex-row w-full">
                <Text
                  type="sub"
                  className={`w-full text-right transition-colors duration-200`}
                >
                  {(t.about.team.jobs as Record<string, string>)[person.job]}
                </Text>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Team;
