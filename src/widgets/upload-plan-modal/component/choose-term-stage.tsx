import { SearchBox } from "../../../shared/search-box";
import { Term, TermList } from ".././component/term-list";
import { Pagination } from "../../../shared/pagination";
import { produce } from "immer";
import { useState } from "react";

const DUMMY_TERM_LIST = [
  {
    id: 1,
    termName: "Financial plan December Q3 2021",
    type: "Quarterly",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    termName: "Financial plan December Q3 2021",
    type: "Half year",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 3,
    termName: "Financial plan December Q3 2021",
    type: "Quarterly",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 4,
    termName: "Financial plan December 2021",
    type: "Monthly",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 5,
    termName: "Financial plan December Q3 2021",
    type: "Monthly",
    startDate: new Date(),
    endDate: new Date(),
  },
];

const totalPage = 20;

interface Props {
  onTermSelected: (term: Term) => any;
}

export const ChooseTermStage: React.FC<Props> = ({ onTermSelected }) => {
  const [page, setPage] = useState<number | undefined | null>(1);

  return (
    <div className="pt-6">
      <SearchBox autoFocus />

      <TermList
        terms={DUMMY_TERM_LIST}
        onClick={(term) => {
          onTermSelected && onTermSelected(term);
        }}
      />

      <Pagination
        page={page}
        totalPage={20}
        onPageChange={(page) => {
          setPage(page);
        }}
        onPrevious={() => {
          setPage(
            produce((page) => {
              if (page === null || page === undefined) {
                return totalPage;
              } else if (page > 1) {
                return page - 1;
              }
            })
          );
        }}
        onNext={() => {
          setPage(
            produce((page) => {
              if (page === null || page === undefined) {
                return 1;
              } else if (page < totalPage) {
                return page + 1;
              }
            })
          );
        }}
      />
    </div>
  );
};
