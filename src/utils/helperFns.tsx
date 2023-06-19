// external modules
import parse from "html-react-parser";

// internal modules
// icons
import crossIcon from "/src/assets/CrossIcon.svg";
import clappingIcon from "/src/assets/ClappingIcon.svg";
import bicepIcon from "/src/assets/BicepIcon.svg";
import earthIcon from "/src/assets/EarthIcon.svg";
import influencerIcon from "/src/assets/InfluencerIcon.svg";
import rocketIcon from "/src/assets/RocketIcon.svg";
import syringeIcon from "/src/assets/SyringeIcon.svg";
import packageIcon from "/src/assets/PackageIcon.svg";
import shoeIcon from "/src/assets/ShoeIcon.svg";
import funnyFaceIcon from "/src/assets/FunnyFaceIcon.svg";
import facePalmIcon from "/src/assets/FacePalmIcon.svg";
import gamepadcon from "/src/assets/GamepadIcon.svg";
import cameraIcon from "/src/assets/CameraIcon.svg";
import gladFaceIcon from "/src/assets/GladFaceIcon.svg";
import chartIcon from "/src/assets/ChartIcon.svg";
import shirtIcon from "/src/assets/ShirtIcon.svg";
import sunglassesIcon from "/src/assets/SunglassesIcon.svg";
import bootIcon from "/src/assets/BootIcon.svg";
import jeansIcon from "/src/assets/JeansIcon.svg";
import maskIcon from "/src/assets/MaskIcon.svg";
import spaceInvaderIcon from "/src/assets/SpaceInvaderIcon.svg";

const emojiMap: Record<string, { path: string; alt: string; styling: string }> =
  {
    "❌": {
      path: crossIcon,
      alt: "Cross Icon",
      styling: "inline mx-1 w-[15px] h-[15px] 2xl:w-[20px] 2xl:h-[20px]",
    },
    "👏": {
      path: clappingIcon,
      alt: "Clapping Icon",
      styling: "inline mx-1 w-[20px] h-[20px]  2xl:w-[25px] 2xl:h-[25px]",
    },
    "💪": {
      path: bicepIcon,
      alt: "Bicep Icon",
      styling: "inline mx-1 w-[20px] h-[20px]  2xl:w-[25px] 2xl:h-[25px]",
    },
    "🌎": {
      path: earthIcon,
      alt: "Earth Icon",
      styling: "inline mx-1 w-[20px] h-[20px]  2xl:w-[25px] 2xl:h-[25px]",
    },
    "🤳": {
      path: influencerIcon,
      alt: "Influencer Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[35px] 2xl:h-[35px]",
    },
    "🚀": {
      path: rocketIcon,
      alt: "Rocket Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "💉": {
      path: syringeIcon,
      alt: "Syringe Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "📦": {
      path: packageIcon,
      alt: "Package Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "👟": {
      path: shoeIcon,
      alt: "Shoe Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "🤦": {
      path: facePalmIcon,
      alt: "FacePalm Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "🤪": {
      path: funnyFaceIcon,
      alt: "Funny Face Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "📸": {
      path: cameraIcon,
      alt: "Camera Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "🎮": {
      path: gamepadcon,
      alt: "Gamepad Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "📉": {
      path: chartIcon,
      alt: "Chart Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[25px] 2xl:h-[20px]",
    },
    "💁": {
      path: gladFaceIcon,
      alt: "Glad Face Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "🎽": {
      path: shirtIcon,
      alt: "Shirt Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "👓": {
      path: sunglassesIcon,
      alt: "Sunglasses Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "👖": {
      path: jeansIcon,
      alt: "Jeans Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "👢": {
      path: bootIcon,
      alt: "Boot Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "😷": {
      path: maskIcon,
      alt: "Mask Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
    "👾": {
      path: spaceInvaderIcon,
      alt: "Space Invader Icon",
      styling: "inline mx-1  w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]",
    },
  };

// replaces default emoji characters with custom emojis created by designer
export const mapEmojis = (
  title: string
): string | JSX.Element | JSX.Element[] => {
  return (
    <div className="flex-inline items-center justify-center break-words	">
      {parse(
        Array.from(title)
          .map((character) => {
            const svgMapping = emojiMap[character];
            return svgMapping
              ? `<img src="${svgMapping.path}" alt="${svgMapping.alt}" className="${svgMapping.styling}" />`
              : character;
          })
          .join("")
          .replaceAll("\n", "<br/>")
      )}
    </div>
  );
};

// determines background color based on the index of the card
export const determineBgColor = (index: number): string => {
  return index % 4 === 0
    ? "base-blue"
    : index % 4 === 1
    ? "base-yellow"
    : index % 4 === 2
    ? "base-pink"
    : "base-green";
};
