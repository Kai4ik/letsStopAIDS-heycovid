// external modules
// animations
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa/index";

// internal modules
// local assets
import Card1 from "/src/assets/MenuCard1.png";
import Card2 from "/src/assets/MenuCard2.png";
import Card3 from "/src/assets/MenuCard3.png";
import LetsStopAidsLogo from "../assets/OrgLogoColorful.svg";
import oldLogo from "/src/assets/heycovid19-2020-logo.svg";

export default function Menu(): JSX.Element {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0, transition: { duration: 0.4 } }}
      exit={{
        y: "-100%",
        transition: { duration: 0.4 },
      }}
      className="fixed left-0 top-[108px] flex flex-col gap-y-8 w-screen h-screen z-40 bg-white px-8 lg:px-14 overflow-scroll pb-[240px]"
    >
      <div className="hidden xl:flex gap-8 max-h-[40%]">
        <img alt="2020 website card" src={Card1} className="h-[100%]" />
        <img alt="2020 website card" src={Card2} className="h-[100%]" />
        <img alt="2020 website card" src={Card3} className="h-[100%]" />
        <div className="flex flex-col grow justify-end items-start gap-4">
          <img alt="2020 website logo" src={oldLogo} className="h-[80px]" />
          <a
            href="https://heycovid19.letsstopaids.org/2020/"
            className="bg-base-blue px-4 py-2 font-paragraphs text-white text-2xl w-full"
          >
            Visit 2020 website
          </a>
        </div>
      </div>
      <a
        href="https://heycovid19.letsstopaids.org/2020/"
        className="bg-base-blue px-4 py-2 font-paragraphs text-white text-2xl w-full  xl:hidden"
      >
        Visit HeyCOVID19 2020
      </a>
      <img
        src={LetsStopAidsLogo}
        alt="LetsStopAIDS Logo"
        className="w-[240px] 2xl:w-[300px]"
      />
      <div className="flex flex-wrap gap-y-8 md:gap-y-8 3xl:flex-col 3xl:flex-nowrap">
        <div className="basis-full xl:basis-1/2 ">
          <h5 className="font-headings font-extrabold text-xl 3xl:text-2xl">
            Find Us:
          </h5>
          <p className="font-paragraphs text-base mb-1 3xl:text-xl">
            <b> LetsStopAIDS HQ </b>- 160 John St, Suite 200, Toronto, ON M5V
            2E5.
          </p>
          <p className="font-paragraphs text-base xl:w-full xl:max-w-[80%] 3xl:text-xl">
            <b> LetsStopAIDS Guyana </b> - Lot 8 Back Street, Better Hope, East
            Coast Demerara, Guyana.
          </p>
        </div>
        <div className="basis-full xl:basis-1/2">
          <h5 className="font-headings font-extrabold mb-2 text-xl 3xl:text-2xl">
            Contact Us:
          </h5>
          <p className="font-paragraphs text-base underline 3xl:text-xl">
            info@LetsStopAIDS.org
          </p>
          <p className="font-paragraphs text-base underline 3xl:text-xl">
            +1 (416) 231-2333
          </p>
          <p className="font-paragraphs text-base underline 3xl:text-xl">
            1-866-530 AIDS (2437) (toll fee)
          </p>
        </div>

        <div className="flex gap-x-4 ">
          <a target="_blank" href="https://www.facebook.com/LetsStopAIDS">
            <FaFacebookF className="text-xl 3xl:text-3xl" />
          </a>
          <a target="_blank" href="https://twitter.com/LetsStopAIDS">
            <FaTwitter className="text-xl  3xl:text-3xl" />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/letsstopaids/"
          >
            <FaLinkedin className="text-xl  3xl:text-3xl" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/letsstopaids/?hl=en"
          >
            <FaInstagram className="text-xl  3xl:text-3xl" />
          </a>
          <a target="_blank" href="https://www.tiktok.com/@letsstopaids">
            <FaTiktok className="text-xl 3xl:text-3xl" />
          </a>
          <a target="_blank" href="https://www.youtube.com/@LetsStopAIDS">
            <FaYoutube className="text-xl 3xl:text-3xl" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
