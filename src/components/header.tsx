// external modules
// React specific
import { useState } from "react";

// animations
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// internal modules
// components
import Menu from "./menu";

// local assets
import programLogo from "/src/assets/ProgramLogo.svg";

export default function Header(): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const topPathControls = useAnimation();
  const middlePathControls = useAnimation();
  const bottomPathControls = useAnimation();

  const onClick = async () => {
    setOpen(!isOpen);
    setOpenMenu(!openMenu);

    if (!openMenu) {
      document.body.style.overflowY = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `0px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    }

    // start animation
    if (!isOpen) {
      await middlePathControls.start(path02Variants.moving);
      topPathControls.start(path01Variants.open);
      middlePathControls.start(path02Variants.open);
      bottomPathControls.start(path03Variants.open);
    } else {
      topPathControls.start(path01Variants.closed);
      await bottomPathControls.start(path03Variants.moving);
      await middlePathControls.start(path02Variants.moving);
      bottomPathControls.start(path03Variants.closed);
      middlePathControls.start(path02Variants.closed);
    }
  };

  const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 9.5L21 9.5" },
  };
  const path02Variants = {
    open: { d: "M0 14.5L0 14.5" },
    moving: { d: "M0 14.5L8 14.5" },
    closed: { d: "M0 14.5L21 14.5" },
  };
  const path03Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: "M0 19.5L24 19.5" },
    closed: { d: "M0 19.5L21 19.5" },
  };

  return (
    <div>
      <div
        id="header"
        className={`flex flex-wrap gap-y-4 h-[108px] relative bg-white justify-between px-8 py-8 lg:px-14`}
      >
        <img
          src={programLogo}
          alt="HeyCOVID19 Logo"
          className="w-[140px] lg:w-[180px]"
        />

        <div onClick={onClick} className="hamburger cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <motion.path
              {...path01Variants.closed}
              animate={topPathControls}
              transition={{ duration: 0.2 }}
              stroke="#000"
              strokeWidth={3}
            />
            <motion.path
              {...path02Variants.closed}
              animate={middlePathControls}
              transition={{ duration: 0.2 }}
              stroke="#000"
              strokeWidth={3}
            />
            <motion.path
              {...path03Variants.closed}
              animate={bottomPathControls}
              transition={{ duration: 0.2 }}
              stroke="#000"
              strokeWidth={3}
            />
          </svg>
        </div>
      </div>
      <AnimatePresence>{openMenu && <Menu />}</AnimatePresence>
    </div>
  );
}
