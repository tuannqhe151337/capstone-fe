import { useCallback, useEffect, useRef, useState } from "react";
import { TermCard } from "../ui/term-card";
import { useHotkeys } from "react-hotkeys-hook";
import { produce, nothing } from "immer";

export interface Term {
  id: string | number;
  termName: string;
  type: string;
  startDate: Date;
  endDate: Date;
}

interface Props {
  terms: Term[];
}

export const TermList: React.FC<Props> = ({ terms }) => {
  // State
  const [selectedTermIndex, setSelectedTermIndex] = useState<number>();

  // Up and down hotkey
  useHotkeys(
    "up",
    () => {
      setSelectedTermIndex(
        produce((selectedTermIndex) => {
          if (selectedTermIndex === null || selectedTermIndex === undefined) {
            return terms.length - 1;
          } else if (selectedTermIndex === 0) {
            return nothing;
          } else {
            return selectedTermIndex - 1;
          }
        })
      );
    },
    { enableOnFormTags: ["input", "INPUT"] }
  );

  useHotkeys(
    "down",
    () => {
      setSelectedTermIndex(
        produce((selectedTermIndex) => {
          if (selectedTermIndex === null || selectedTermIndex === undefined) {
            return 0;
          } else if (selectedTermIndex === terms.length - 1) {
            return nothing;
          } else {
            return selectedTermIndex + 1;
          }
        })
      );
    },
    { enableOnFormTags: ["input", "INPUT"] }
  );

  // Deselect element when click outside
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setSelectedTermIndex(undefined);
      }
    },
    [ref.current]
  );

  useEffect(() => {
    document.addEventListener("click", clickHandler, true);

    return () => {
      document.removeEventListener("click", clickHandler, true);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col flex-wrap py-6 gap-3">
      {terms.map((term, index) => (
        <TermCard
          key={term.id}
          selected={selectedTermIndex === index}
          termName={term.termName}
          type={term.type}
          startDate={term.startDate}
          endDate={term.endDate}
        />
      ))}
    </div>
  );
};
