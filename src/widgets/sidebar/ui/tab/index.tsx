import { useRef } from "react";
import { TERipple } from "tw-elements-react";

interface Props {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  selected?: boolean;
  isExpanded?: boolean;
}

export const Tab: React.FC<Props> = ({
  icon,
  text,
  selected = false,
  isExpanded,
}) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <TERipple
      ref={ref}
      rippleColor="primary"
      className={`flex flex-row items-center gap-5 px-5 py-4 cursor-pointer text-primary-500 ${
        selected
          ? "bg-primary-100 dark:bg-primary-950"
          : "hover:bg-primary-50 hover:dark:bg-primary-950/50"
      } rounded-lg duration-300 overflow-hidden`}
    >
      <div>{icon}</div>
      {isExpanded && (
        <div className="text-sm font-bold select-none">{text}</div>
      )}
    </TERipple>
  );
};
