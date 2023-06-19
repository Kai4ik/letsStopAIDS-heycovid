// external modules
// React specific
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

// animations
import { AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// internal modules

// components
import CardCp from "./card";
import ModalCp from "./modal";

// types
import type { CardsDataType, CardType } from "../types/card";

// helper functions
import { determineBgColor } from "../utils/helperFns";

// function that takes care of infinite vertical scroll animation
// targets - elements the animation needs to be applied to, speed - speed of the animation
function verticalLoop(targets: string, speed: number) {
  let elements: HTMLDivElement[] = gsap.utils.toArray(targets);

  let firstBounds = elements[0].getBoundingClientRect(),
    lastBounds = elements[elements.length - 1].getBoundingClientRect(),
    top = 108 - firstBounds.height - 16,
    bottom = lastBounds.top,
    distance = bottom - top + (lastBounds.height - firstBounds.height),
    duration = Math.abs(distance / speed),
    tl = gsap.timeline({ repeat: -1 }),
    plus = speed < 0 ? "-=" : "+=",
    minus = speed < 0 ? "+=" : "-=";

  elements.forEach((el) => {
    let bounds = el.getBoundingClientRect(),
      ratio = Math.abs((bottom - bounds.top) / distance);

    if (speed < 0) {
      ratio = 1 - ratio;
    }

    tl.to(
      el,
      {
        y: plus + distance * ratio,
        duration: duration * ratio,
        ease: "none",
      },
      0
    );

    tl.fromTo(
      el,
      {
        y: minus + distance,
      },
      {
        y: plus + (1 - ratio) * distance,
        ease: "none",
        duration: (1 - ratio) * duration,
        immediateRender: false,
      },
      duration * ratio
    );
  });

  return tl;
}

type Props = {
  data: CardsDataType;
  language: string;
  selectedCard:
    | {
        card: CardType;
        color: string;
      }
    | undefined;
  setSelectedCard: Dispatch<
    SetStateAction<
      | {
          card: CardType;
          color: string;
        }
      | undefined
    >
  >;
  setOpenShareModal: Dispatch<SetStateAction<boolean>>;
};

export default function CardsContainer(props: Props): JSX.Element {
  // when modal opens, used to keep the page at the current scroll position
  const [scrollTop, setScrollTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  const handleCardSelection = (card: CardType, index: number) => {
    // used to prevent user from scrolling the body
    document.body.style.overflowY = "hidden";
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    setScrollTop(scrollPosition);

    props.setSelectedCard({
      card: card,
      color: determineBgColor(index),
    });

    // changes the url according to the new selected card
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    const urSplit = window.location.href.split("/");
    urSplit.pop();
    let newUrl = urSplit.join("/");
    if (langParam !== null) newUrl += `/?lang=${langParam}&km=${card.cardId}`;
    else newUrl += `/?km=${card.cardId}`;
    // next state, next title, next url

    window.history.replaceState(
      { selectedCard: card.cardId },
      document.title,
      newUrl
    );
  };

  const container = useRef<HTMLDivElement | null>(null);

  const cards = props.data.filter(
    (elem) => elem.languageValue.toLowerCase() === props.language.toLowerCase()
  )[0].cards;

  // used to determine if modal should be opened and if so, open it
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardIdParam = urlParams.get("km");
    const langParam = urlParams.get("lang");

    if (cardIdParam !== null) {
      const requiredLangauge = langParam ? langParam : "en";
      const cardsByLanguage = props.data.filter(
        (elem) =>
          elem.languageValue.toLowerCase() === requiredLangauge.toLowerCase()
      )[0].cards;

      const indexOfSelectedCard = cardsByLanguage.findIndex(
        (card) => card.cardId === cardIdParam
      );

      props.setSelectedCard({
        card: cardsByLanguage[indexOfSelectedCard],
        color: determineBgColor(indexOfSelectedCard),
      });

      document.body.style.overflowY = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.width = "100%";
    }

    setHeaderHeight(document.getElementById("header")!.offsetHeight);
  }, []);

  const half = Math.ceil(cards.length / 2);
  const firstHalf = cards.slice(0, half);
  const secondHalf = cards.slice(half);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const tlRightRef = useRef<gsap.core.Timeline | null>(null);

  // used to set the animation
  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (tlRightRef.current) {
      tlRightRef.current.kill();
      tlRightRef.current = null;
    }

    const verticalInfiniteSliderTl = verticalLoop(".card", -50);
    tlRef.current = verticalInfiniteSliderTl;
    const verticalInfiniteSliderRightTl = verticalLoop(".card2", -65);
    tlRightRef.current = verticalInfiniteSliderRightTl;
  }, [props.language]);

  return (
    <div
      ref={container}
      className={`flex flex-col relative px-8 z-30 no-scrollbar gap-y-8 pb-10 md:flex-row md:flex-wrap md:justify-between 
      xl:pr-0 xl:pl-16 xl:w-1/2 xl:pb-32 xl:overflow-hidden`}
    >
      <AnimatePresence>
        {props.selectedCard !== undefined && (
          <div
            className={`fixed top-0 left-0 no-scrollbar bg-white bg-opacity-80 overflow-auto w-full min-h-[100%] max-h-[100%] py-20 px-8 
            ${props.selectedCard ? "z-80" : "-z-20"} grid place-items-center 
            xl:w-[50%] xl:pl-16 xl:pr-3 ${
              headerHeight !== null && "xl:mt-[108px]"
            } xl:pt-0`}
          >
            <ModalCp
              color={props.selectedCard.color}
              card={props.selectedCard.card}
              setSelectedCard={props.setSelectedCard}
              setOpenShareModal={props.setOpenShareModal}
              scrollTop={scrollTop}
            />
          </div>
        )}
      </AnimatePresence>
      <div className="hidden xl:flex flex-col basis-[48%] max-w-[48%] h-full gap-y-4">
        {firstHalf.map((card, index) => (
          <div
            className="card"
            key={card.cardId + props.language}
            onClick={() => handleCardSelection(card, index)}
          >
            <CardCp card={card} index={index} />
          </div>
        ))}
      </div>
      <div className="hidden xl:flex flex-col basis-[48%] max-w-[48%] h-full gap-y-4">
        {secondHalf.map((card, index) => (
          <div
            className="card2"
            onClick={() => handleCardSelection(card, index + firstHalf.length)}
            key={card.cardId + props.language}
          >
            <CardCp card={card} index={index + firstHalf.length} />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center gap-y-8 md:flex-row md:flex-wrap md:justify-between md:items-start xl:hidden">
        {props.data
          .filter(
            (elem) =>
              elem.languageValue.toLowerCase() === props.language.toLowerCase()
          )[0]
          .cards.map((card, index) => (
            <div
              key={card.cardId + props.language}
              onClick={() => handleCardSelection(card, index)}
              className="w-full md:basis-[49%]"
            >
              <CardCp card={card} index={index} />
            </div>
          ))}
      </div>
    </div>
  );
}
