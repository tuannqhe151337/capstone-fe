import { FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { useHotkeys } from "react-hotkeys-hook";
import { ContextMenu } from "../../shared/context-menu";
import { ContextMenuItem } from "../../shared/context-menu-item";

interface Props {
  className?: string;
  show?: boolean;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  onCreateMoneyRateAction?: () => any;
  onDeleteMoneyRateAction?: () => any;
}

export const MoneyRateActionContextMenu: React.FC<Props> = ({
  className,
  show,
  top,
  left,
  bottom,
  right,
  onCreateMoneyRateAction,
  onDeleteMoneyRateAction,
}) => {
  useHotkeys("c", () => {
    if (show) {
      onCreateMoneyRateAction && onCreateMoneyRateAction();
    }
  });

  useHotkeys("d", () => {
    if (show) {
      onDeleteMoneyRateAction && onDeleteMoneyRateAction();
    }
  });

  return (
    <ContextMenu
      className={className}
      show={show}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
    >
      <div className="flex flex-col flex-wrap items-center justify-center">
        <ContextMenuItem
          icon={<FaPlusCircle className="text-xl dark:opacity-60" />}
          text={
            <>
              <span className="underline">C</span>
              <span>reate monthly rate conversion</span>
            </>
          }
          onClick={onCreateMoneyRateAction}
        />
        <ContextMenuItem
          className="group-hover:text-red-600 dark:group-hover:text-red-600"
          icon={<FaTrash className="text-xl dark:opacity-60" />}
          text={
            <>
              <span className="underline">D</span>
              <span>elete monthly rate conversion</span>
            </>
          }
          onClick={onDeleteMoneyRateAction}
        />
      </div>
    </ContextMenu>
  );
};
