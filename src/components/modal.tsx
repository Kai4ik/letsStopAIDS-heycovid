// external modules
import parse from "html-react-parser";
import { toPng } from "html-to-image";

// react specific
import { Dispatch, SetStateAction, useRef, useCallback } from "react";
import { IoMdDownload } from "react-icons/io/index";

// animations
import { motion } from "framer-motion";

// internal modules
import miniFace from "/src/assets/Face.svg";
import companyLogo from "/src/assets/OrgLogo.svg";
import programLogo from "/src/assets/ProgramLogo.svg";

// types
import type { CardType } from "../types/card";

// helper functions
import { mapEmojis } from "../utils/helperFns";

interface Props {
  scrollTop: number;
  color: string;
  card: CardType;
  setOpenShareModal: Dispatch<SetStateAction<boolean>>;
  setSelectedCard: Dispatch<
    SetStateAction<
      | {
          card: CardType;
          color: string;
        }
      | undefined
    >
  >;
}

export default function ModalCp(props: Props): JSX.Element {
  const bgColor = `bg-${props.color}`;

  const bubbleColor =
    props.color === "base-blue"
      ? "[#66C5FF]"
      : props.color === "base-yellow"
      ? "[#FED23A]"
      : props.color === "base-pink"
      ? "[#FE8BCC]"
      : "[#AFD37E]";

  const handleClose = () => {
    document.body.style.overflowY = "auto";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, props.scrollTop);
    props.setSelectedCard(undefined);

    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    const urSplit = window.location.href.split("/");
    urSplit.pop();
    let newUrl = urSplit.join("/");
    if (langParam !== null) newUrl += `/?lang=${langParam}`;

    // next state, next title, next url
    window.history.replaceState({}, document.title, newUrl);
  };

  const handleShare = async () => {
    if (navigator.share) {
      const userAgent = navigator.userAgent;
      if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Win") > -1) {
        props.setOpenShareModal(true);
      } else {
        await navigator.share({
          text: `HeyCOVID19 Booster Information for All!\n`,
          url: window.location.href,
        });
      }
    } else {
      props.setOpenShareModal(true);
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  const saveAs = (blob: any, fileName: string) => {
    var elem = window.document.createElement("a");
    elem.href = blob;
    elem.download = fileName;
    elem.setAttribute("style", "display:none");

    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === "function") {
      elem.click();
    } else {
      elem.target = "_blank";
      elem.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
    URL.revokeObjectURL(elem.href);
    elem.remove();
  };

  const onCapture = useCallback(() => {
    // Added ! operator to indicate that we are sure that it
    // will never be null so typescript does not have to check
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true }).then(function (dataUrl: string) {
      toPng(ref.current!, {
        cacheBust: true,
        filter(domNode: HTMLElement) {
          if (domNode.classList?.contains("download-icon")) {
            return false;
          }

          return true;
        },
      }).then(function (dataUrl: string) {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get("lang") || "en";
        saveAs(
          dataUrl,
          `HeyCOVID19-${langParam.toUpperCase()}-KM${props.card.cardId}`
        );
      });
    });
  }, [ref]);

  return (
    <div
      className={`flex flex-col justify-center items-center gap-y-4 no-scrollbar w-full`}
    >
      <motion.div
        key={props.card.cardId}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
        exit={{
          opacity: 0,
          scale: 0,
          transition: { delay: 0.3, duration: 0.4 },
        }}
        ref={ref}
        className={`w-full ${bgColor} z-50 px-6 py-8 
        flex flex-col gap-y-4 3xl:py-16 3xl:px-12 3xl:gap-y-8`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-headings font-extrabold text-3xl md:text-3xl 3xl:text-5xl">
            #HeyCOVID19
          </h1>
          <IoMdDownload
            data-html2canvas-ignore
            size={22}
            className="download-icon cursor-pointer pt-1"
            onClick={() => onCapture()}
          />
        </div>

        <div
          className={`bubble-message relative p-6 rounded-md font-headings text-lg font-extrabold 
          rounded-bl-none bg-${bubbleColor}  border-2 border-indigo-100
        before:content=[""] before:absolute before:w-0 before:h-0 before:-left-[2px] before:-bottom-[20px]
        before:border-[10px]  before:border-transparent before:border-t-indigo-100 before:border-l-indigo-100
        after:content-[""] after:absolute after:w-0 after:h-0 after:left-0 after:-bottom-[15px]
        after:border-[20px] after:border-transparent after:border-t-${bubbleColor} after:border-l-${bubbleColor}
        md:text-3xl 3xl:text-3xl
      `}
        >
          {mapEmojis(props.card.title)}
        </div>
        <div className="flex gap-x-4 mt-2 items-center">
          <img
            src={miniFace}
            alt="Website Logo"
            className="w-[30px] 3xl:w-[50px]"
          />
          <div className="flex flex-col font-lexend">
            <p className="text-[12px] font-medium lg:text-base 3xl:text-3xl">
              {props.card.name}
            </p>
            <p className="text-[10px] lg:text-sm 3xl:text-lg">
              {props.card.location}
            </p>
          </div>
        </div>

        <div className="font-paragraphs font-normal text-base flex flex-col gap-y-2 md:text-lg 3xl:text-3xl">
          <p className="hidden xl:block">
            {parse(props.card.text.replaceAll("\n", "<br/>"))}
          </p>
          <p className="xl:hidden">
            {parse(props.card.fact.replaceAll("\n", "<br/>"))}
          </p>
          <a
            href={props.card.link}
            target="_blank"
            className="underline xl:hidden"
          >
            Link here
          </a>

          <div className="flex justify-between mt-4 justify-self-end xl:pt-8 3xl:pt-12">
            <img
              src={companyLogo}
              alt="LetsStopAIDS Logo"
              className="w-[100px] xl:w-[130px] 3xl:w-[200px]"
            />
            <img
              src={programLogo}
              alt="HeyCOVID19 Logo"
              className="w-[100px] xl:w-[130px] 3xl:w-[200px]"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "-350%" }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, duration: 0.4 },
        }}
        exit={{ opacity: 0, y: "-350%", transition: { duration: 0.4 } }}
        className="flex justify-center gap-x-5 text-[#F8F6F2] font-paragraphs relative z-40 xl:pb-10 3xl:text-3xl"
      >
        <button
          className={`px-6 py-2 ${bgColor}`}
          onClick={() => handleShare()}
        >
          Share
        </button>
        <button
          className="px-6 py-2 bg-[#808486]"
          onClick={() => handleClose()}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
