import { TERipple } from "tw-elements-react";
import { FaAngleRight } from "react-icons/fa6";
import { format } from "date-fns";

interface Props {
  termName: string;
  type: string;
  startDate: Date;
  endDate: Date;
}

export const TermCard: React.FC<Props> = ({
  termName,
  type,
  startDate,
  endDate,
}) => {
  return (
    <TERipple rippleColor="primary">
      <div className="flex flex-row flex-wrap items-center w-full py-3 px-5 border-2 border-primary-100 hover:bg-primary-50 hover:border-primary-300 dark:border-primary-900/60 dark:hover:border-primary-800 dark:hover:bg-primary-950/30 rounded-lg cursor-pointer duration-200">
        <p className="font-bold text-sm dark:text-base text-primary-500 w-[275px]">
          {termName}
        </p>
        <div className="text-xs px-2 py-1 border-2 border-primary-100 dark:border-primary-900 ml-1 rounded-lg text-primary-400 font-bold select-none">
          {type}
        </div>
        <div className="flex flex-row flex-wrap items-center ml-auto">
          <p className="text-xs dark:text-sm font-bold select-none text-primary-500/60">
            {format(startDate, "dd/MM/yyyy")} - {format(endDate, "dd/MM/yyyy")}
          </p>
          <FaAngleRight className="ml-3 text-lg text-primary-400/80" />
        </div>
      </div>
    </TERipple>
  );
};
