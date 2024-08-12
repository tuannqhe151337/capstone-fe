import React, { useCallback, useEffect, useState } from "react";
import {
  useCreateExchangeRateMutation,
  useUpdateMonthlyExchangeRateMutation,
} from "../../../providers/store/api/exchangeRateApi";
import { NumericFormat } from "react-number-format";
import { TEInput } from "tw-elements-react";
import { toast } from "react-toastify";
import { useDetectDarkmode } from "../../../shared/hooks/use-detect-darkmode";
import { AFFIX } from "../../../providers/store/api/type";

interface Props {
  exchangeId?: number;
  initialValue?: number;
  month?: string;
  currencyId: number;
  symbol?: string;
  affix?: AFFIX;
}

export const UpdatableMoneyAmountInput: React.FC<Props> = ({
  exchangeId,
  initialValue,
  month,
  currencyId,
  symbol,
  affix,
}) => {
  // Value input state
  const [value, setValue] = useState<number | undefined>(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Check is dark mode
  const isDarkmode = useDetectDarkmode();

  // Update
  const [updateMonthlyExchangeRate, { isSuccess: monthlyExchangeRateSuccess }] =
    useUpdateMonthlyExchangeRateMutation();
  const [createExchangeRate, { isSuccess: createExchangeRateSuccess }] =
    useCreateExchangeRateMutation();

  useEffect(() => {
    if (monthlyExchangeRateSuccess || createExchangeRateSuccess) {
      toast("Update successfully!", {
        type: "success",
        theme: isDarkmode ? "dark" : "light",
      });
      setIsDirty(false);
    }
  }, [monthlyExchangeRateSuccess, createExchangeRateSuccess]);

  // Query
  const updateOrCreateExchangeRate = useCallback(
    (
      exchangeId?: number,
      amount?: number,
      month?: string,
      currencyId?: number
    ) => {
      if (exchangeId && amount) {
        updateMonthlyExchangeRate({ exchangeId, amount: amount || 0 });
      } else if (amount && month && currencyId) {
        createExchangeRate({
          month,
          currencyId,
          amount,
        });
      }
    },
    []
  );

  return (
    <NumericFormat
      className="!text-neutral-500/80 dark:!text-neutral-400"
      customInput={TEInput}
      value={value}
      allowNegative={false}
      prefix={affix === AFFIX.PREFIX ? symbol : undefined}
      suffix={affix === AFFIX.SUFFIX ? symbol : undefined}
      thousandSeparator=","
      decimalSeparator="."
      onValueChange={({ floatValue }) => {
        setValue(floatValue);
        setIsDirty(true);
      }}
      onBlur={() => {
        isDirty &&
          updateOrCreateExchangeRate(exchangeId, value, month, currencyId);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          isDirty &&
            updateOrCreateExchangeRate(exchangeId, value, month, currencyId);
        }
      }}
    />
  );
};
