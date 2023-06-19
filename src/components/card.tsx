// internal modules
// local assets
import miniFace from "/src/assets/Face.svg";
import companyLogo from "/src/assets/OrgLogo.svg";
import programLogo from "/src/assets/ProgramLogo.svg";
import clickme from "/src/assets/Click.svg";

// types
import type { CardType } from "../types/card";

// helper functions
import { mapEmojis } from "../utils/helperFns";

type Props = {
  index: number;
  card: CardType;
};

export default function CardCp(props: Props): JSX.Element {
  const bgColor =
    props.index % 4 === 0
      ? "bg-base-blue"
      : props.index % 4 === 1
      ? "bg-base-yellow"
      : props.index % 4 === 2
      ? "bg-base-pink"
      : "bg-base-green";

  const borderT =
    props.index % 4 === 0
      ? "after:border-t-[#66C5FF]"
      : props.index % 4 === 1
      ? "after:border-t-[#FED23A]"
      : props.index % 4 === 2
      ? "after:border-t-[#FE8BCC]"
      : "after:border-t-[#AFD37E]";

  const borderL =
    props.index % 4 === 0
      ? "after:border-l-[#66C5FF]"
      : props.index % 4 === 1
      ? "after:border-l-[#FED23A]"
      : props.index % 4 === 2
      ? "after:border-l-[#FE8BCC]"
      : "after:border-l-[#AFD37E]";

  const bubble =
    props.index % 4 === 0
      ? "bg-[#66C5FF]"
      : props.index % 4 === 1
      ? "bg-[#FED23A]"
      : props.index % 4 === 2
      ? "bg-[#FE8BCC]"
      : "bg-[#AFD37E]";

  return (
    <div className={`flex flex-col gap-y-4 w-full ${bgColor} px-6 py-8`}>
      <img src={programLogo} alt="HeyCOVID19 Logo" className="w-[140px]" />
      <h1
        className={`relative min-h-[8rem] font-headings font-extrabold text-xl  p-6 rounded-md rounded-bl-none ${bubble}  border-[2px] border-indigo-100
        before:content=[""] before:absolute before:w-0 before:h-0 before:-left-[2px] before:-bottom-[20px]
        before:border-[10px]  before:border-transparent before:border-t-indigo-100 before:border-l-indigo-100
        after:content-[""] after:overflow-hidden after:absolute after:w-0 after:h-0 after:left-0 after:-bottom-[15px]
        after:border-[10px] after:border-transparent ${borderT} ${borderL}
        lg:before:-left-[1.5px] lg:after:-bottom-[16px] lg:min-h-[4rem] lg:text-base
        2xl:text-2xl 2xl:before:-left-[2px] 2xl:after:-bottom-[15px] 2xl:min-h-[8rem]
      `}
      >
        {mapEmojis(props.card.title)}
      </h1>
      <div className="flex gap-x-4 mt-2 items-center">
        <img src={miniFace} width="30px" height="40px" alt="Website Logo" />
        <div className="flex flex-col font-lexend">
          <p className="text-[12px] font-medium leading-3">{props.card.name}</p>
          <p className="text-[10px] ">{props.card.location}</p>
        </div>
      </div>
      <p className="font-paragraphs font-normal text-sm min-h-[6rem] md:text-base 2xl:text-xl">
        {props.card.text}
      </p>
      <div className="flex justify-between ">
        <img
          src={companyLogo}
          alt="LetsStopAIDS Logo"
          className="w-[80px] lg:w-[100px]"
        />
        <img src={clickme} height="80px" alt="Click Icon" />
      </div>
    </div>
  );
}
