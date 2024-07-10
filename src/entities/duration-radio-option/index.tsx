import React from "react";

interface RadioOptionProps {
  label?: React.ReactNode;
  onClick?: () => any;
  radioInput?: React.ReactNode;
  fromToDate?: React.ReactNode;
  isSelected?: boolean;
}

const DurationRadioOption: React.FC<RadioOptionProps> = ({
  label,
  onClick,
  radioInput,
  fromToDate,
  isSelected,
}) => {
  return (
    <div
      className={`flex flex-row items-center group border rounded-lg py-9 px-4 cursor-pointer duration-200 ${
        isSelected
          ? "dark:bg-primary-900/50 bg-primary-100 text-primary w-4/12 h-[66px] border-primary-200 dark:border-primary-500"
          : "bg-white text-neutral-600 w-4/12 h-[66px] dark:bg-neutral-800/50 dark:border-neutral-600 hover:border-neutral-300 hover:shadow-sm"
      }`}
      onClick={() => onClick && onClick()}
    >
      <div className="flex items-center mb-[0.125rem] mr-4 min-h-[1.5rem]">
        {radioInput}
        <label className="flex flex-col pl-[0.15rem] hover:cursor-pointer">
          <p
            className={`mb-1 ${
              isSelected
                ? "text-primary-600 font-extrabold opacity-70 dark:text-primary-500"
                : "text-neutral-600 group-hover:text-neutral-700 font-extrabold opacity-70 dark:text-primary-500 dark:group-hover:text-primary-400 duration-200"
            }`}
          >
            {label}
          </p>
          <p
            className={
              isSelected
                ? "text-primary-500 text-sm font-bold opacity-70 dark:text-primary-500"
                : "text-neutral-500 group-hover:text-neutra-600 text-sm font-bold opacity-70 dark:text-primary-600 dark:group-hover:text-primary-500/80 duration-200"
            }
          >
            {fromToDate}
          </p>
        </label>
      </div>
    </div>
  );
};

export default DurationRadioOption;
