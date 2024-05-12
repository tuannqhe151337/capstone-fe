import { forwardRef } from "react";
import { TEInput } from "tw-elements-react";
import { InputProps } from "tw-elements-react/dist/types/forms/Input/types";

interface Props extends InputProps {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const AdornmentInput = forwardRef<any, Props>(
  ({ startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className="relative w-full h-full">
        {startAdornment && (
          <div className="absolute h-max flex flex-row flex-wrap items-center left-0 right-0 w-max z-10">
            {startAdornment}
          </div>
        )}
        <TEInput
          ref={ref}
          className={`
            ${startAdornment ? "pl-7" : null} ${endAdornment ? "pr-7" : null}
            `}
          {...props}
        />
        {endAdornment && (
          <div className="absolute h-max flex flex-row flex-wrap items-center top-0 right-0 w-max z-10">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);
