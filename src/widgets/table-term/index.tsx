import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Tag } from "../../shared/tag";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { Button } from "../../shared/button";
import { StartTermModal } from "../start-term-modal";

// Định nghĩa kiểu cho status
type StatusType = "new" | "approve" | "inProgress" | "denied";
const renderButton = (status: StatusType) => {
  switch (status) {
    case "new":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="new">
          New
        </Tag>
      );
    case "inProgress":
      return (
        <Tag className="ml-4 mt-1" background="filled" variant="inProgress">
          In progess
        </Tag>
      );
    case "denied":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="denied">
          Closed
        </Tag>
      );
    default:
      return null;
  }
};

// Định nghĩa kiểu cho dữ liệu bảng
type TablePlanDataType = {
  id: number;
  term: string;
  startDate: string;
  endDate: string;
  status: StatusType;
};

const tablePlanDataList: TablePlanDataType[] = [
  {
    id: 1,
    term: "Financial plan December Q3 2021",
    startDate: "25 December 2021",
    endDate: "30 December 2021",
    status: "new",
  },
  {
    id: 2,
    term: "Financial plan December Q3 2021",
    startDate: "25 December 2021",
    endDate: "30 December 2021",
    status: "inProgress",
  },
  {
    id: 3,
    term: "Financial plan December Q3 2021",
    startDate: "25 December 2021",
    endDate: "30 December 2021",
    status: "denied",
  },
  {
    id: 4,
    term: "Financial plan December Q3 2021",
    startDate: "25 December 2021",
    endDate: "30 December 2021",
    status: "denied",
  },
];

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

interface Props {
  onCreatePlanClick?: () => any;
}

export const TableTermManagement: React.FC<Props> = ({ onCreatePlanClick }) => {
  // Navigation
  const navigate = useNavigate();

  // UI: show delete button
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();
  const [startModal, setStartModal] = useState<boolean>(false);

  const handleClick = () => {
    setStartModal(true);
  };

  const handleCloseStartTermModal = () => {
    setStartModal(false);
  };

  return (
    <div>
      <table className="text-center text-sm font-light mt-6 min-w-full shadow overflow-hidden rounded">
        <thead className="bg-primary-100 dark:bg-primary-950/50 font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Term
            </th>
            {/* <th></th> */}
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Start date
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              End date
            </th>

            <th scope="col">
              <IconButton
                className="px-3"
                onClick={() => {
                  onCreatePlanClick && onCreatePlanClick();
                }}
              >
                <FaPlusCircle className="text-[21px] text-primary-500/60 hover:text-primary-500/80 my-0.5" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {tablePlanDataList.map((row, index) => (
            <tr
              key={row.id}
              className={`group border-b cursor-pointer duration-200 ${
                row.status === "denied" ? "opacity-70" : ""
              } ${
                index % 2 === 0
                  ? "bg-white hover:bg-primary-50/50 dark:border-neutral-900 dark:bg-neutral-800/70 dark:hover:bg-neutral-800"
                  : "bg-primary-50 hover:bg-primary-100 dark:border-neutral-900 dark:bg-primary-950/30 dark:hover:bg-primary-950/70"
              }`}
              onMouseEnter={() => {
                setHoverRowIndex(index);
              }}
              onMouseLeave={() => {
                setHoverRowIndex(undefined);
              }}
              onClick={() => {
                navigate("detail");
              }}
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium w-[438px]">
                <div className="flex flex-row flex-wrap">
                  <p className="text-primary-500 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-600 dark:group-hover:text-primary-500/90 ml-14">
                    {row.term}
                  </p>
                  <div>{renderButton(row.status)}</div>
                </div>
              </td>
              {/* <td className="">
                <div className="flex flex-row flex-wrap">
                  <div>{renderButton(row.status)}</div>
                </div>
              </td> */}
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.startDate}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.endDate}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                {row.status === "new" && (
                  <motion.div
                    initial={AnimationStage.HIDDEN}
                    animate={
                      hoverRowIndex === index
                        ? AnimationStage.VISIBLE
                        : AnimationStage.HIDDEN
                    }
                    exit={AnimationStage.HIDDEN}
                    variants={animation}
                  >
                    <Button
                      className="py-0.5 px-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClick();
                      }}
                    >
                      <FaPlay className="text-white text-xl inline-block mr-1" />
                      <div className="inline-block text-sm font-bold">
                        Start
                      </div>
                    </Button>
                  </motion.div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        variants={animation}
      >
        <Pagination page={1} totalPage={20} className="mt-6" />
      </motion.div>

      <StartTermModal show={startModal} onClose={handleCloseStartTermModal} />
    </div>
  );
};
