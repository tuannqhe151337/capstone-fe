import { motion, Variants } from "framer-motion";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Skeleton } from "../../shared/skeleton";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { ExchangeRateCreateModal } from "../exchange-rate-create-modal";
import { useHotkeys } from "react-hotkeys-hook";
import { DeleteExchangeRateModal } from "../delete-exchange-rate-modal";
import { ExchangeRateActionContextMenu } from "../../entities/exchange-rate-action-context-menu";
import {
  ExchangeRate,
  MonthlyExchangeRate,
} from "../../providers/store/api/exchangeRateApi";
import { useGetAllCurrencyQuery } from "../../providers/store/api/currencyApi";
import { UpdatableMoneyAmountInput } from "./component/updatable-money-amount-input";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

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

export interface Row extends MonthlyExchangeRate {
  isFetching?: boolean;
}

export interface MonthlyExchangeRateMap {
  month: string;
  exchangeRateMap: Record<number, ExchangeRate>;
}

interface Props {
  isFetching?: boolean;
  listMonthlyExchangeRate?: MonthlyExchangeRate[];
}

export const TableExchangeRate: React.FC<Props> = ({
  isFetching,
  listMonthlyExchangeRate,
}) => {
  // Get all currencies
  const { data: currencies } = useGetAllCurrencyQuery();

  // UI: show delete button
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();

  // UI: show delete modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // UI: new money rate modal
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  useHotkeys("ctrl + =", (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  });

  // UI: context menu
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuTop, setContextMenuTop] = useState<number>(0);
  const [contextMenuLeft, setContextMenuLeft] = useState<number>(0);
  const [chosenMonthlyExchangeRate, setChosenMonthlyExchangeRate] =
    useState<MonthlyExchangeRateMap>();

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

  // Map exchange rate to currency
  const monthlyExchangeRateMap: MonthlyExchangeRateMap[] = useMemo(() => {
    if (listMonthlyExchangeRate) {
      return listMonthlyExchangeRate.map(({ month, exchangeRates }) => {
        const monthlyExchangeRateCurrencyMap: MonthlyExchangeRateMap = {
          month,
          exchangeRateMap: {},
        };

        for (const exchangeRate of exchangeRates) {
          monthlyExchangeRateCurrencyMap.exchangeRateMap[
            exchangeRate.currency.currencyId
          ] = exchangeRate;
        }

        return monthlyExchangeRateCurrencyMap;
      });
    }

    return [];
  }, [listMonthlyExchangeRate]);

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
            {currencies?.data.map(({ currencyId, name }) => (
              <th
                key={currencyId}
                scope="col"
                className="px-6 py-4 font-bold text-primary-500/70 dark:text-primary-600/80"
              >
                {name}
              </th>
            ))}
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
        <motion.tbody
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          exit={AnimationStage.HIDDEN}
          variants={staggerChildrenAnimation}
        >
          {monthlyExchangeRateMap.map((monthlyExchangeRate, index) => (
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
                setChosenMonthlyExchangeRate(monthlyExchangeRate);
              }}
            >
              <td
                className={clsx({
                  "whitespace-nowrap px-10 py-5 font-extrabold w-[250px]": true,
                  "rounded-bl-lg": index === 4,
                })}
              >
                {monthlyExchangeRate.month}
              </td>
              {currencies?.data.map(({ currencyId, symbol, affix }) => (
                <td
                  key={currencyId}
                  className="whitespace-nowrap px-2 py-5 font-bold"
                  onClick={(e) => e.stopPropagation()}
                >
                  <UpdatableMoneyAmountInput
                    exchangeId={
                      monthlyExchangeRate.exchangeRateMap[currencyId]
                        ?.exchangeRateId
                    }
                    initialValue={
                      monthlyExchangeRate.exchangeRateMap[currencyId]?.amount ||
                      0
                    }
                    symbol={symbol}
                    affix={affix}
                  />
                </td>
              ))}

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
                      setChosenMonthlyExchangeRate(monthlyExchangeRate);
                    }}
                  >
                    <FaTrash className="text-red-600 text-xl" />
                  </IconButton>
                </motion.div>
              </td>
            </tr>
          ))}

          {isFetching &&
            new Array(2).fill(true).map((_, index) => (
              <motion.tr
                key={-index}
                className="border-b-2 border-neutral-100"
                variants={childrenAnimation}
              >
                <td className="py-2 pl-10 pr-1 w-[250px]">
                  <Skeleton className="w-full" />
                </td>
                {currencies?.data.map(({ currencyId }) => (
                  <td key={currencyId} className="py-2 px-1">
                    <Skeleton className="w-full" />
                  </td>
                ))}
                <td className="py-2"></td>
              </motion.tr>
            ))}
        </motion.tbody>
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
        onCreateSuccessfully={() => {
          setShowCreateModal(false);
        }}
      />

      {chosenMonthlyExchangeRate && (
        <DeleteExchangeRateModal
          month={chosenMonthlyExchangeRate.month}
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          onDeleteSuccessfully={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </motion.div>
  );
};
