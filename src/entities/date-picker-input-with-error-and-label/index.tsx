import React from "react";
import { InputValidationMessage } from "../../shared/validation-input-message";
import {
  DatePickerInputProps,
  DatePickerInput as DatePickerInputShared,
} from "../../shared/date-picker-input";

interface Props extends DatePickerInputProps {
  label?: React.ReactNode;
  showValidationMessage?: boolean;
  validateFn?: Function;
}

export const DatePickerInputWithErrorAndLabel: React.FC<Props> = ({
  label,
  showValidationMessage,
  validateFn,
  ...props
}) => {
  return (
    <div className="flex flex-col flex-wrap gap-0.5">
      <div className="text-xs font-semibold text-neutral-400 dark:font-bold dark:text-neutral-500">
        {label}
      </div>
      <div className="custom-wrapper w-[200px]">
        <DatePickerInputShared {...props} />

        <InputValidationMessage
          className="mt-1 w-max"
          show={showValidationMessage}
          validateFn={validateFn}
        />
      </div>
    </div>
  );
};
