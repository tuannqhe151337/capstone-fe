import React, { useState } from "react";
import { IconButton } from "../../shared/icon-button";
import { BsFillImageFill } from "react-icons/bs";
import { AnimatePresence, Variants, motion } from "framer-motion";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const imageAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

export const ImageExplaner: React.FC = () => {
  // Show image
  const [showImage, setShowImage] = useState<boolean>(false);

  return (
    <>
      <IconButton
        tooltip="Image explanation"
        onClick={() => {
          setShowImage((prevState) => !prevState);
        }}
      >
        <BsFillImageFill className="text-xl text-primary-500 dark:text-primary-600" />
      </IconButton>

      <AnimatePresence>
        {showImage && (
          <motion.img
            className="fixed left-52 lg:left-64 top-36 lg:top-52 z-50 bg-white cursor-move shadow w-[50rem]"
            src={import.meta.env.VITE_FLOW_IMAGE_URL}
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={imageAnimation}
            drag
          />
        )}
      </AnimatePresence>
    </>
  );
};
