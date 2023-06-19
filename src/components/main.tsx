// external modules
// React specific
import { useEffect, useState } from "react";

// animations
import { AnimatePresence } from "framer-motion";

// internal modules
import jsonData from "../data/data.json";

// components
import BannerCp from "./banner";
import CardsContainer from "./cardsContainer";
import ShareModal from "./shareModal";
import PageNotFound from "./404";

// types
import type { CardType } from "../types/card";

export default function MainCp(): JSX.Element {
  // extracting languages from raw json data
  const languages = jsonData.data.map((elem) => elem.languageLabel);

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentUrl, setCurrentUrl] = useState("");

  const cardsData = jsonData.data;

  // filtered based on selected language
  const filteredData = jsonData.data.filter(
    (elem) => elem.languageValue === selectedLanguage.toLowerCase()
  );
  const [selectedCard, setSelectedCard] = useState<
    | {
        card: CardType;
        color: string;
      }
    | undefined
  >(undefined);

  // used to determine if language is set in url and if so, change default language (eng) to the one from url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCurrentUrl(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam !== null) {
      setSelectedLanguage(langParam.toLowerCase());
    }
    setTimeout(() => {
      const langaugeSelection = document.getElementById("langSelection");
      if (langaugeSelection !== null) {
        langaugeSelection.style.pointerEvents = "auto";
      }
    }, 1000);

    // function trigered on resize that changes language state variable to lower/upper case
    // and triggers cardsContainer component to re-render and recalculate the vertical slider animation
    function handleResize() {
      if (window.innerWidth > 1200) {
        setSelectedLanguage((prev) => {
          const firstChar = prev[0];
          return firstChar === firstChar.toLowerCase()
            ? prev.toUpperCase()
            : prev.toLowerCase();
        });
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // controls whether the modal is open or not
  const [openShareModal, setOpenShareModal] = useState(false);

  if (filteredData.length === 0) {
    return <PageNotFound />;
  } else {
    const urlParams = new URLSearchParams(currentUrl);
    const cardIdParam = urlParams.get("km");

    if (
      cardIdParam !== null &&
      parseInt(
        filteredData[0].cards[filteredData[0].cards.length - 1].cardId
      ) <= parseInt(cardIdParam)
    ) {
      return <PageNotFound />;
    } else {
      // currently bannerText is not translated and always will be on English
      const bannerText = filteredData[0].bannerText;

      return (
        <div className="flex flex-col gap-y-16 xl:flex-row-reverse xl:h-full xl:gap-x-6">
          <BannerCp
            currentLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            languages={languages}
            bannerText={bannerText}
            data={cardsData}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
          <CardsContainer
            language={selectedLanguage}
            data={cardsData}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            setOpenShareModal={setOpenShareModal}
          />

          <AnimatePresence>
            {openShareModal && (
              <ShareModal setOpenShareModal={setOpenShareModal} />
            )}
          </AnimatePresence>
        </div>
      );
    }
  }
}
