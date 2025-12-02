import { useState } from "react";

import Text from "@/components/Text";
import useLocale from "@/hooks/useLocale";
import useInView from "@/hooks/useInView";
import useIsMd from "@/hooks/useIsMd";
import translations from "@/data/translations";
import data from "@/data/data";
import assetMap from "@/data/assetMap";

type Person = {
  idx: number;
  name: string;
  job: string;
  img: string;
  quote: string;
};
type Divisions = "programming" | "mechanical" | "business";

type Pos = { x: number; y: number; }
type PersonProps = {
  person: Person;
  jobs: Record<string, string>;
  showCard: boolean;
  pos: Pos;
}
type DivisionTextProps = { name: string; selected: boolean; isMd: boolean; onClick: () => void; }

function Person({ person, jobs, showCard, pos }: PersonProps) {
  const { ref, inView } = useInView();

  const { ref: refSm, inView: inViewSm } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();
  const { ref: quoteRef, inView: quoteInView } = useInView();

  return (
    <>
      {/* desktop */}
      <div ref={ref} className="hidden md:flex flex-row items-baseline gap-x-page w-full">
        <div className="hidden md:flex w-[40%]">
          <Text type="sub" animate={inView} className={`w-full text-right transition-colors duration-200 ${!showCard ? "text-text/25" : ""}`}>
            {jobs[person.job]}
          </Text>
        </div>
        <Text type="title" animate={inView} className={`flex transition-colors duration-200 ${!showCard ? "md:text-text/25" : ""}`}>
          {person.name}
        </Text>
      </div>

      {/* mobile */}
      <div className="md:hidden flex flex-col gap-y-s-three w-full">
        <div ref={refSm} className="flex flex-row justify-between items-baseline w-full">
          <Text type="title" animate={inViewSm} className={`flex transition-colors duration-200 ${!showCard ? "md:text-text/25" : ""}`}>
            {person.name}
          </Text>
          <Text type="sub" animate={inViewSm} className={`text-right transition-colors duration-200`}>
            {jobs[person.job]}
          </Text>
        </div>
        {/* <div className="flex flex-row justify-between gap-x-s-two"> */}
          {/* <div ref={imgRef} className="w-[40%]"> */}
            {/* <img src={assetMap[person.img]} className={`w-full object-contain opacity-0 ${imgInView ? "a-fade-in" : ""}`} /> */}
          {/* </div> */}
          {/* <div ref={quoteRef} className="self-end w-[60%]"> */}
            {/* <Text type="pg" animate={quoteInView}>"{person.quote}"</Text> */}
          {/* </div> */}
        {/* </div> */}
      </div>

      {/* {showCard && (
        <div className="z-25 fixed w-[20vw] max-h-[35vh] pointer-events-none" style={{ left:`${pos.x}px`, top:`${pos.y}px` }}>
          <div className="flex flex-col gap-y-s-four p-s-four rounded-md outline-2 outline-text/20 bg-bg">
            <img src={assetMap[person.img]} className={`object-contain opacity-0 a-fade-in max-h-[35vh] self-start rounded-md`} />
            <Text type="pg">"{person.quote}"</Text>
          </div>
        </div>
      )} */}
    </>
  );
}

function DivisionText({ name, selected, isMd, onClick }: DivisionTextProps) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} onClick={onClick} >
      <Text type="pg" animate={inView} clickable={true} className={`pb-s-two font-bold! text-left transition-colors duration-300 ${!isMd && !selected ? "text-text/25!" : ""}`}>{name}</Text>
    </div>
  );
}

function Team() {
  const locale = useLocale((state) => state.locale);
  const t = translations(locale);
  const { people } = data(locale);

  const isMd = useIsMd();
  const { ref: headingRef, inView: headingInView } = useInView();

  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [div, setDiv] = useState<number | null>(null);

  const divs = Object.entries(t.about.team.divisions) as [Divisions, string][];
  const jobs = t.about.team.jobs as Record<string, string>;

  return (
    <section className="flex flex-col gap-y-page w-full p-page bg-bg">
      <div ref={headingRef} className="flex flex-row items-baseline gap-x-page">
        <Text type="title" animate={headingInView}>{t.about.team.title}</Text>
        <Text type="sub" animate={headingInView}>{isMd ? t.about.team.hover : t.about.team.tap}</Text>
      </div>
      {divs.map(([key, name], i) => (
        <div key={key}>
          <DivisionText name={name} selected={div === i} isMd={isMd} onClick={() => setDiv(i)}></DivisionText>
          <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${div === i || isMd ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="min-h-0">
              <div className="flex flex-col gap-y-s-two">
                {(people as Record<string, Person[]>)[key].map((person) => (
                  <div
                    key={person.idx}
                    className="w-full"
                    onMouseOver={() => setHovered(person.idx)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseMove={(e) => setPos({ x: e.clientX + 10, y: e.clientY - 10 })}
                  >
                    <Person person={person} jobs={jobs} showCard={person.idx === hovered} pos={pos} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Team;
