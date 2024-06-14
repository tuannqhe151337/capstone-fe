import ReactDOM from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import "react-day-picker/dist/style.css";
import { PatternFormat } from "react-number-format";
import { FaCalendar } from "react-icons/fa6";
import { format, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import { TERipple } from "tw-elements-react";
import { AdornmentInput } from "../adornment-input";
import { motion, Variants } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { useDetectDarkmode } from "../hooks/useDetectDarkmode";
import { cn } from "../utils/cn";

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

const duration = 200; // In miliseconds

interface ModalPosition {
  top?: number;
  left?: number;
}

interface Props {
  className?: string;
  calendarClassName?: string;
  modalPosition?: ModalPosition;
  value?: Date;
  allowEmpty?: boolean;
  onChange?: (value: Date) => any;
  onClickOutside?: () => any;
  onFocus?: () => any;
  onBlur?: () => any;
}

export const DatePickerInput: React.FC<Props> = ({
  className,
  calendarClassName,
  modalPosition,
  value,
  allowEmpty,
  onChange,
  onClickOutside,
  onFocus,
  onBlur,
}) => {
  const isDarkMode = useDetectDarkmode();

  const [inputValue, setInputValue] = useState<string>(
    value ? format(value, "dd/MM/yyyy") : ""
  );
  const [monthSelected, setMonthSelected] = useState<Date>();
  const [isInputValueValid, setIsInputValueValid] = useState<boolean>();
  const [showCalender, setShowCalendar] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLElement>(null);

  // Check if inputValue is a valid date
  useEffect(() => {
    if (inputValue === "" && allowEmpty) {
      setIsInputValueValid(true);
    } else {
      const date = inputValue && parse(inputValue, "dd/MM/yyyy", new Date());

      if (date instanceof Date && !isNaN(date.valueOf())) {
        setIsInputValueValid(true);
      } else {
        setIsInputValueValid(false);
      }
    }
  }, [inputValue]);

  // onChange
  useEffect(() => {
    if (isInputValueValid) {
      const date = inputValue && parse(inputValue, "dd/MM/yyyy", new Date());
      onChange && date instanceof Date && onChange(date);
    }
  }, [isInputValueValid]);

  // Select month base on valid input value
  useEffect(() => {
    if (isInputValueValid) {
      const date = inputValue && parse(inputValue, "dd/MM/yyyy", new Date());
      date instanceof Date && setMonthSelected(date);
    }
  }, [isInputValueValid]);

  // Close calendar when click outside
  useHotkeys(
    "esc",
    () => {
      setShowCalendar(false);
    },
    { enableOnFormTags: ["INPUT", "input"] }
  );

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (
        !containerRef.current?.contains(event.target as Node) &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        setShowCalendar(false);
        onClickOutside && onClickOutside();
        onBlur && onBlur();
      }
    },
    [onClickOutside, onBlur]
  );

  useEffect(() => {
    if (showCalender) {
      document.addEventListener("click", clickHandler, true);
    }

    return () => {
      document.removeEventListener("click", clickHandler, true);
    };
  }, [showCalender]);

  // Delay 200ms to wait for modal to unmount after running animation
  useEffect(() => {
    if (showCalender) {
      setShowModal(true);
    } else {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
      }, duration);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showCalender]);

  return (
    <div ref={containerRef} className={cn(`relative w-full h-full`, className)}>
      <PatternFormat
        getInputRef={inputRef}
        className={cn(
          "focus:-outline-offset-1 focus:outline-primary focus:outline-[2px] focus:shadow-sm focus:shadow-primary dark:!text-neutral-400 duration-500",
          {
            "outline-offset-1 outline-[2px] outline-red-600":
              isInputValueValid === false,
          }
        )}
        value={inputValue}
        pattern="##/##/####"
        format="##/##/####"
        mask="_"
        endAdornment={
          <div
            className="flex flex-row flex-wrap items-center w-full h-full mt-[2.25px] mr-1 rounded-full overflow-hidden"
            onClick={() => {
              setShowCalendar((prevState) => !prevState);
            }}
          >
            <TERipple
              className="cursor-pointer rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700 duration-500 p-2"
              rippleColor={isDarkMode ? "light" : "dark"}
            >
              <FaCalendar className="text-neutral-500/80 dark:text-neutral-400/80" />
            </TERipple>
          </div>
        }
        customInput={AdornmentInput}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
        onFocus={() => {
          setShowCalendar(true);
          onFocus && onFocus();
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            setShowCalendar(false);
          }
        }}
        onBlur={() => {
          if (!showCalender) {
            onBlur && onBlur();
          }
        }}
      />

      {showModal &&
        ReactDOM.createPortal(
          <motion.div
            ref={modalRef}
            className={`absolute bg-white dark:bg-neutral-700 shadow rounded-lg z-30 ${calendarClassName}`}
            style={{
              top:
                (modalPosition?.top || 0) +
                (containerRef.current?.getBoundingClientRect().bottom || 0) +
                window.scrollY +
                15,
              left:
                (modalPosition?.left || 0) +
                (containerRef.current?.getBoundingClientRect().left || 0),
            }}
            initial={AnimationStage.HIDDEN}
            animate={
              showCalender ? AnimationStage.VISIBLE : AnimationStage.HIDDEN
            }
            exit={AnimationStage.HIDDEN}
            variants={animation}
            transition={{ duration: duration / 1000 }}
          >
            <DayPicker
              mode="single"
              classNames={{
                day: "w-[40px] h-[40px] rounded-full duration-500",
              }}
              modifiersClassNames={{
                selected: "bg-primary-200 text-black font-bold",
              }}
              month={monthSelected}
              onMonthChange={(date) => {
                setMonthSelected(date);
              }}
              selected={
                inputValue
                  ? parse(inputValue, "dd/MM/yyyy", new Date())
                  : undefined
              }
              onSelect={(date) => {
                date && setInputValue(format(date, "dd/MM/yyyy"));
              }}
            />
          </motion.div>,
          document.querySelector("#popup") as HTMLDivElement
        )}
    </div>
  );
};
