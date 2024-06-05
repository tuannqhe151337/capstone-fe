import { Variants, motion } from "framer-motion";
import { IconButton } from "../../../shared/icon-button";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { LuPowerOff } from "react-icons/lu";

type Status = "active" | "de-active";

interface Props {
  index: number;
  hoverRowIndex?: number;
  status: Status;
}

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export const TableCellIcon: React.FC<Props> = ({
  index,
  hoverRowIndex,
  status,
}) => (
  <td className="whitespace-nowrap px-6 py-4">
    <motion.div
      initial={AnimationStage.HIDDEN}
      animate={
        hoverRowIndex === index ? AnimationStage.VISIBLE : AnimationStage.HIDDEN
      }
      exit={AnimationStage.HIDDEN}
      variants={animation}
    >
      <IconButton>
        {status === "active" ? (
          // <FaTrash className="text-red-600 text-xl" />
          <LuPowerOff className="text-red-600 text-xl" />
        ) : (
          <FaPowerOff className="text-primary-500 text-xl" />
        )}
      </IconButton>
    </motion.div>
  </td>
);
