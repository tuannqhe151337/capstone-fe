import { motion, Variants } from "framer-motion";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Skeleton } from "../../shared/skeleton";
import clsx from "clsx";
import { TEInput } from "tw-elements-react";
import { NumericFormat } from "react-number-format";
import { useInfiteLoaderWholePage } from "../../shared/hooks/use-infite-loader-whole-page";
import { useEffect, useState } from "react";
import { ExchangeRateCreateModal } from "../exchange-rate-create-modal";
import { useHotkeys } from "react-hotkeys-hook";
import { DeleteExchangeRateModal } from "../delete-exchange-rate-modal";
import { ExchangeRateActionContextMenu } from "../../entities/exchange-rate-action-context-menu";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const tableAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 10,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const deleteIconAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

interface Props {
  onCreatePlanClick?: () => any;
  isFetching?: boolean;
  page?: number | undefined | null;
  totalPage?: number;
  isDataEmpty?: boolean;
  onPageChange?: (page: number | undefined | null) => any;
  onPrevious?: () => any;
  onNext?: () => any;
}

export const TableExchangeRate: React.FC<Props> = ({ isFetching }) => {
  // Infinite scroll
  useInfiteLoaderWholePage(() => {});

  // UI: show delete button
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // New money rate
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  useHotkeys("ctrl + =", (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  });

  // UI: context menu
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuTop, setContextMenuTop] = useState<number>(0);
  const [contextMenuLeft, setContextMenuLeft] = useState<number>(0);

  useEffect(() => {
    const clickHandler = () => {
      setShowContextMenu(false);
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, []);

  useHotkeys("esc", () => {
    setShowContextMenu(false);
  });

  return (
    <motion.div
      className="pb-24"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={tableAnimation}
    >
      <table className="text-center text-sm font-light mt-6 min-w-full shadow rounded-lg">
        <thead className="bg-primary-100 dark:bg-primary-950/50 font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-lg">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600 rounded-tl-lg"
            >
              Month
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-bold text-primary-500/70 dark:text-primary-600/80"
            >
              USD
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-bold text-primary-500/70 dark:text-primary-600/80"
            >
              VNĐ
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-bold text-primary-500/70 dark:text-primary-600/80"
            >
              JPY
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-bold text-primary-500/70 dark:text-primary-600/80"
            >
              KRW
            </th>
            <th scope="col" className="px-5 rounded-tr-lg">
              <IconButton
                className="px-3"
                tooltip="New month"
                onClick={() => {
                  setShowCreateModal(true);
                }}
              >
                <FaPlusCircle className="text-[21px] text-primary-500/60 hover:text-primary-500/80 my-0.5" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill(true)
            .map((plan, index) => (
              <tr
                key={index}
                className={clsx({
                  "group text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-400 duration-200":
                    true,
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
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowContextMenu(true);
                  setContextMenuLeft(e.pageX);
                  setContextMenuTop(e.pageY);
                }}
              >
                <td
                  className={clsx({
                    "whitespace-nowrap px-10 py-5 font-bold w-[250px]": true,
                    "rounded-bl-lg": index === 4,
                  })}
                >
                  {isFetching ? (
                    <Skeleton className="w-[200px]" />
                  ) : (
                    <div>
                      <TEInput
                        className="!text-neutral-500 text-center"
                        value={"01/2024"}
                      />
                    </div>
                  )}
                </td>
                <td
                  className="whitespace-nowrap px-6 py-5 font-bold"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isFetching ? (
                    <Skeleton className="w-[200px]" />
                  ) : (
                    <div>
                      <NumericFormat
                        className="!text-neutral-500/80"
                        customInput={TEInput}
                        value={1}
                        allowNegative={false}
                        prefix="$"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-5 font-bold">
                  {isFetching ? (
                    <Skeleton className="w-[200px]" />
                  ) : (
                    <div>
                      <NumericFormat
                        className="!text-neutral-500/80"
                        customInput={TEInput}
                        value={20000}
                        suffix=" đ"
                        allowNegative={false}
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </div>
                  )}
                </td>
                <td
                  className={clsx({
                    "whitespace-nowrap px-6 py-5 font-bold": true,
                    "rounded-br-lg": index === 4,
                  })}
                >
                  {isFetching ? (
                    <Skeleton className="w-[100px]" />
                  ) : (
                    <NumericFormat
                      className="!text-neutral-500/80"
                      customInput={TEInput}
                      value={147}
                      allowNegative={false}
                      prefix="¥"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-5 font-bold">
                  {isFetching ? (
                    <Skeleton className="w-[100px]" />
                  ) : (
                    <NumericFormat
                      className="!text-neutral-500/80"
                      customInput={TEInput}
                      value={1.374}
                      allowNegative={false}
                      prefix="₩"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  )}
                </td>
                <td
                  className={clsx({
                    "whitespace-nowrap px-6 py-5 font-bold": true,
                    "rounded-br-lg": index === 4,
                  })}
                >
                  <motion.div
                    initial={AnimationStage.HIDDEN}
                    animate={
                      hoverRowIndex === index
                        ? AnimationStage.VISIBLE
                        : AnimationStage.HIDDEN
                    }
                    exit={AnimationStage.HIDDEN}
                    variants={deleteIconAnimation}
                  >
                    <IconButton
                      tooltip="Delete monthly rate"
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash className="text-red-600 text-xl" />
                    </IconButton>
                  </motion.div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ExchangeRateActionContextMenu
        show={showContextMenu}
        top={contextMenuTop}
        left={contextMenuLeft}
        onCreateExchangeRateAction={() => {
          setShowCreateModal(true);
        }}
        onDeleteExchangeRateAction={() => {
          setShowDeleteModal(true);
        }}
      />

      <ExchangeRateCreateModal
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
        }}
      />

      <DeleteExchangeRateModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onDeleteSuccessfully={() => {
          setShowDeleteModal(false);
        }}
      />
    </motion.div>
  );
};
