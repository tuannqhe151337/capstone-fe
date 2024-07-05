import { FaPlusCircle } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Tag } from "../../shared/tag";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { Button } from "../../shared/button";
import { StartTermModal } from "../start-term-modal";
import clsx from "clsx";
import { Term } from "../../providers/store/api/termsApi";
import { formatISODate } from "../../shared/utils/format-iso-date";

const renderButton = (status: string) => {
  switch (status) {
    case "NEW":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="new">
          NEW
        </Tag>
      );
    case "IN_PROGRESS":
      return (
        <Tag className="ml-4 mt-1" background="filled" variant="inProgress">
          In progess
        </Tag>
      );
    case "CLOSED":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="denied">
          Closed
        </Tag>
      );
    default:
      return null;
  }
};

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

export interface Row extends Term {
  isFetching?: boolean;
}

interface Props {
  onCreateTermClick?: () => any;
  isFetching?: boolean;
  terms?: Row[];
  page?: number | undefined | null;
  totalPage?: number;
  isDataEmpty?: boolean;
  onPageChange?: (page: number | undefined | null) => any;
  onPrevious?: () => any;
  onNext?: () => any;
}
export const TableTermManagement: React.FC<Props> = ({
  onCreateTermClick: onCreatePlanClick,
  terms,
  isFetching,
  page,
  totalPage,
  isDataEmpty,
  onPageChange,
  onPrevious,
  onNext,
}) => {
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
      <table className="text-center text-sm font-light mt-6 min-w-full shadow overflow-hidden rounded-lg">
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
                tooltip="Add new term"
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
          {terms &&
            terms.map((row, index) => (
              <tr
                key={index}
                className={clsx({
                  "group cursor-pointer border-b-2 border-neutral-100 dark:border-neutral-800 duration-200":
                    true,
                  "text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-400":
                    row.status.code !== "CLOSED",
                  "text-primary-500/70 hover:text-primary-500 dark:text-primary-800 dark:hover:text-primary-600":
                    row.status.code === "CLOSED",
                  "bg-white hover:bg-primary-50/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/70":
                    index % 2 === 0,
                  "bg-primary-50 hover:bg-primary-100 dark:bg-neutral-800/80 dark:hover:bg-neutral-800":
                    index % 2 === 1,
                })}
                onMouseEnter={() => {
                  setHoverRowIndex(index);
                }}
                onMouseLeave={() => {
                  setHoverRowIndex(undefined);
                }}
                onClick={() => {
                  navigate("detail/information");
                }}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium w-[438px]">
                  <div className="flex flex-row flex-wrap">
                    <p className="font-extrabold py-2 ml-14">{row.name}</p>
                    <div>{renderButton(row.status.code)}</div>
                    <div>{row.status.code}</div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {formatISODate(row.startDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {formatISODate(row.endDate)}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  {row.status.code === "NEW" && (
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
                        className="flex flex-row flex-wrap py-1.5 px-3"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClick();
                        }}
                      >
                        <FaPlay className="text-white dark:text-neutral-300 text-base mr-2 mt-[1.25px]" />
                        <div className="text-white dark:text-neutral-300 text-sm font-bold">
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

      {isDataEmpty && (
        <div className="flex flex-row flex-wrap items-center justify-center w-full min-h-[250px] text-lg font-semibold text-neutral-400 italic">
          No data found.
        </div>
      )}
      {!isDataEmpty && (
        <motion.div
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          variants={animation}
        >
          <Pagination
            className="mt-6"
            page={page}
            totalPage={totalPage || 1}
            onNext={onNext}
            onPageChange={onPageChange}
            onPrevious={onPrevious}
          />
        </motion.div>
      )}

      <StartTermModal show={startModal} onClose={handleCloseStartTermModal} />
    </div>
  );
};
