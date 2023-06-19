// external modules
// React specific
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";

// icons
import { FiChevronDown } from "react-icons/fi/index";

// animations
import { motion, AnimatePresence, useCycle } from "framer-motion";

// internal modules
// local assets
import programLogo from "/src/assets/ProgramLogo.svg";

// types
import type { CardsDataType, CardType } from "../types/card";

// helper functions
import { determineBgColor } from "../utils/helperFns";

const variants = {
  open: {
    opacity: 1,
    y: 0,
    zIndex: 30,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    opacity: 0,
    y: "100%",
    zIndex: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      when: "afterChildren", // ensure the container animates after its children
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const arrowVariants = {
  open: { rotate: 180, y: 4 },
  closed: { rotate: 0 },
};

const languageOptions = {
  open: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
};

type Props = {
  currentLanguage: string;
  bannerText: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  languages: string[];
  selectedCard:
    | {
        card: CardType;
        color: string;
      }
    | undefined;
  data: CardsDataType;
  setSelectedCard: Dispatch<
    SetStateAction<
      | {
          card: CardType;
          color: string;
        }
      | undefined
    >
  >;
};

export default function BannerCp(props: Props): JSX.Element {
  // controls whether select language dropdown is open/close
  const [isOpen, toggleOpen] = useCycle(false, true);

  // when language is changed, the url is changed + if modal is open, the selected card is changed as well according to the new language
  const handleChangeLanguage = (language: string) => {
    const newLanguage = language.split(" ")[0];
    props.setSelectedLanguage(newLanguage.toLowerCase());

    const urlParams = new URLSearchParams(window.location.search);
    const cardIdParam = urlParams.get("km");
    const urSplit = window.location.href.split("/");
    urSplit.pop();
    let newUrl = urSplit.join("/");
    if (cardIdParam !== null) {
      const cardIndex = props.data
        .filter(
          (elem) => elem.languageValue === props.currentLanguage.toLowerCase()
        )[0]
        .cards.findIndex((card) => {
          return card.cardId === cardIdParam;
        });

      let card = props.data.filter(
        (elem) => elem.languageValue === newLanguage.toLowerCase()
      )[0].cards[cardIndex];

      newUrl += `/?lang=${newLanguage.toLowerCase()}&km=${card.cardId}`;
      props.setSelectedCard({
        card: card,
        color: determineBgColor(cardIndex),
      });
    } else newUrl += `/?lang=${newLanguage.toLowerCase()}`;

    // parameters - next state, next title, next url
    window.history.replaceState(
      { selectedLanguage: newLanguage.toLowerCase() },
      document.title,
      newUrl
    );
  };

  // when select language dropdown closes, we scroll to the top of it, so next time we open it, we will be on top
  const langSelect = useRef<HTMLUListElement>(null);

  // used to constantly (every 3 seconds) change the background color
  const [bgColor, setBgColor] = useState("bg-base-blue");
  useEffect(() => {
    const interval = setInterval(function () {
      switch (bgColor) {
        case "bg-base-blue":
          setBgColor("bg-base-yellow");
          break;
        case "bg-base-yellow":
          setBgColor("bg-base-pink");
          break;
        case "bg-base-pink":
          setBgColor("bg-base-green");
          break;
        default:
          setBgColor("bg-base-blue");
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [bgColor]);

  return (
    <div
      className={`flex flex-col gap-y-4 ${bgColor} relative transition-colors duration-500 ease-linear no-scrollbar py-10 px-8  xl:w-1/2 xl:h-full  xl:gap-y-8 xl:px-16 xl:overflow-scroll 3xl:gap-y-12`}
    >
      <div className="md:flex items-center">
        <img
          src={programLogo}
          alt="HeyCOVID19 Logo"
          className="w-[80%] lg:w-[30%]"
        />
        <p className="font-paragraphs text-right mr-10 -mt-2 md:mt-2 md:ml-4 md:text-sm 3xl:text-base">
          version 3.0
        </p>
      </div>

      <div
        id="langSelection"
        className="pointer-events-none bg-white font-paragraphs font-extrabold text-xl py-2 flex justify-center gap-x-4 items-center relative z-20 lg:hidden"
        onClick={() => {
          toggleOpen();
          if (isOpen === true && langSelect.current !== null) {
            langSelect.current.scrollTop = 0;
          }
        }}
      >
        <p>
          {
            props.languages.filter(
              (lang) =>
                lang.split(" ")[0].toLowerCase() ===
                props.currentLanguage.toLowerCase()
            )[0]
          }
        </p>
        <motion.div
          className="origin-center pt-1"
          variants={arrowVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.5 }}
        >
          <FiChevronDown size={20} />
        </motion.div>
      </div>
      <div className="hidden lg:flex flex-wrap max-h-[30%] overflow-y-scroll  lg:gap-y-2 2xl:gap-y-4 3xl:max-h-none">
        {props.languages.map((language, index) => (
          <p
            className={`font-paragraphs cursor-pointer text-lg w-1/2 xl:text-base xl:w-1/3 ${
              props.currentLanguage.toLowerCase() ===
              language.split(" ")[0].toLowerCase()
                ? "font-semibold"
                : "font-normal"
            } ${
              props.currentLanguage.toLowerCase() ===
              language.split(" ")[0].toLowerCase()
                ? "underline"
                : "no-underline"
            } hover:font-semibold underline-offset-8	2xl:text-lg`}
            key={index}
            onClick={() => handleChangeLanguage(language)}
          >
            {language}
          </p>
        ))}
      </div>
      <motion.div
        initial="closed"
        className={`relative h-full -mt-4 lg:hidden`}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <motion.ul
          variants={languageOptions}
          ref={langSelect}
          className="flex origin-top flex-wrap gap-y-8 py-4 absolute top-0 left-0 w-full font-paragraphs text-sm bg-white px-6 h-[35vh] overflow-scroll md:h-[15vh]"
        >
          {props.languages.map((language, index) => (
            <li
              key={index}
              className={`w-[50%] pr-2 ${
                props.currentLanguage.toLowerCase() ===
                language.split(" ")[0].toLowerCase()
                  ? "font-semibold"
                  : "font-normal"
              } ${
                props.currentLanguage.toLowerCase() ===
                language.split(" ")[0].toLowerCase()
                  ? "underline"
                  : "no-underline"
              } underline-offset-4`}
              onClick={() => handleChangeLanguage(language)}
            >
              {language}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <p className="font-lexend text-base lg:text-lg lg:pb-20 3xl:text-[1.5rem] xl:hidden">
        {props.bannerText}
      </p>
      <div
        className={`hidden flex-col min-h-[30%] overflow-auto relative font-paragraphs text-base xl:text-base 3xl:text-[1.5rem] 3xl:leading-normal 
        xl:flex`}
      >
        <motion.p
          animate={props.selectedCard ? "closed" : "open"}
          variants={{
            open: { y: 0, transition: { duration: 0.8 } },
            closed: { y: "-150%", transition: { duration: 0.8 } },
          }}
        >
          {props.bannerText}
        </motion.p>

        <AnimatePresence>
          {props.selectedCard && (
            <motion.div
              className="absolute top-0 left-0 flex flex-col gap-y-2 pr-2"
              initial={{ y: "300%" }}
              animate={{ y: 0, transition: { duration: 0.8 } }}
              exit={{
                y: "300%",
                transition: { duration: 0.8 },
              }}
            >
              <h4 className="font-headings font-extrabold text-2xl">Facts</h4>
              <p className="font-paragraphs">{props.selectedCard?.card.fact}</p>
              <a
                href={props.selectedCard?.card.link}
                target="_blank"
                className="underline"
              >
                Link here
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-sm font-paragraphs ">
        2023 LetsStopAIDS. All right reserved.
      </p>
    </div>
  );
}
