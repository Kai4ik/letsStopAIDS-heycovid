// external modules
// React specific
import type { SetStateAction, Dispatch } from "react";

// icons
import { IoIosCopy, IoLogoWhatsapp } from "react-icons/io/index";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa/index";
import { RxCross2 } from "react-icons/rx/index";

// react-share
import FacebookShareButton from "react-share/lib/FacebookShareButton";
import WhatsappShareButton from "react-share/lib/WhatsappShareButton";
import TwitterShareButton from "react-share/lib/TwitterShareButton";
import LinkedinShareButton from "react-share/lib/LinkedinShareButton";

// animations
import { motion } from "framer-motion";

type Props = { setOpenShareModal: Dispatch<SetStateAction<boolean>> };

export default function ShareModal(props: Props): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{
        opacity: 0,
        transition: { duration: 0.4 },
      }}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center  bg-white bg-opacity-80 z-100"
    >
      <div className="bg-white ">
        <div className="py-10 px-20 flex flex-col gap-y-8">
          <div className="flex justify-between items-center">
            <p className="font-paragraphs text-base-pink font-extrabold text-2xl">
              Share
            </p>
            <RxCross2
              size={18}
              className="cursor-pointer "
              onClick={() => props.setOpenShareModal(false)}
            />
          </div>
          <div className="flex gap-x-8 items-center">
            <FacebookShareButton
              url={window.location.href}
              quote={"Check out this great info about Covid19!"}
              hashtag="#HeyCovid19"
            >
              <FaFacebookF
                aria-label="facebook-btn"
                size={30}
                className="cursor-pointer transition-colors duration-300 hover:text-base-pink"
              />
            </FacebookShareButton>

            <TwitterShareButton
              url={window.location.href}
              title={"Check out this great info about Covid19!"}
              className="Demo__some-network__share-button"
            >
              <FaTwitter
                aria-label="twitter-btn"
                size={30}
                className="cursor-pointer transition-colors duration-300 hover:text-base-pink"
              />
            </TwitterShareButton>

            <WhatsappShareButton
              url={window.location.href}
              title={"Check out this great info about Covid19!"}
              className="Demo__some-network__share-button"
            >
              <IoLogoWhatsapp
                aria-label="whatsapp-btn"
                size={32}
                className="cursor-pointer transition-colors duration-300 hover:text-base-pink"
              />
            </WhatsappShareButton>

            <LinkedinShareButton
              url={window.location.href}
              title={"Check out this great info about Covid19!"}
              className="Demo__some-network__share-button"
            >
              <FaLinkedin
                aria-label="linkedin-btn"
                size={32}
                className="cursor-pointer transition-colors duration-300 hover:text-base-pink"
              />
            </LinkedinShareButton>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#151515] bg-opacity-20"></div>
        <div
          className="flex py-10 px-20 items-center gap-x-4 cursor-pointer"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <IoIosCopy size={32} />
          <p className="text-2xl font-paragraphs " aria-label="copy-link-btn">
            Copy Link
          </p>
        </div>
      </div>
    </motion.div>
  );
}
