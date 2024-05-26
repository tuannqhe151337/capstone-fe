import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { SearchBox } from "../../shared/search-box";
import { TermCard } from "./ui/term-card";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";

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

interface Props {
  show: boolean;
  onClose: () => any;
}

export const UploadPlanModal: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal className={`w-[90vw] h-[95vh]`} show={show} onClose={onClose}>
      <>
        {/* Header */}
        <div className="relative pt-5">
          <p className="w-fit m-auto text-xl font-bold text-primary-500 dark:text-primary-600">
            Choose term
          </p>
          <div className="absolute top-3 right-5">
            <IconButton
              onClick={() => {
                onClose && onClose();
              }}
            >
              <IoClose className="text-3xl text-neutral-400" />
            </IconButton>
          </div>
        </div>

        {/* Body */}
        <div className="pt-6">
          <div className="flex flex-row flex-wrap items-center justify-center w-full">
            <div className="relative w-full h-fit px-[70px]">
              <div className="absolute w-full h-full top-[23px] left-0 px-[70px] z-0">
                <div className="h-1 w-full bg-neutral-100 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-row flex-wrap items-center justify-around">
                  <div className="flex flex-col flex-wrap items-center">
                    <div className="flex flex-row flex-wrap items-center justify-center size-[50px] bg-neutral-200 rounded-full">
                      <RiCalendarScheduleFill className="text-xl text-white" />
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-neutral-300">
                      Select term
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap items-center">
                    <div className="flex flex-row flex-wrap items-center justify-center size-[50px] bg-neutral-200 rounded-full">
                      <FaUpload className="text-lg text-white mb-1" />
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-neutral-300">
                      Upload plan
                    </p>
                  </div>
                  <div className="flex flex-col flex-wrap items-center">
                    <div className="flex flex-row flex-wrap items-center justify-center size-[50px] bg-neutral-200 rounded-full">
                      <FaListUl className="text-lg text-white" />
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-neutral-300">
                      Select term
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-3/4 mt-5">
              <SearchBox autoFocus />

              <div className="flex flex-col flex-wrap py-6 gap-3">
                {DUMMY_TERM_LIST.map((term) => (
                  <TermCard
                    key={term.id}
                    termName={term.termName}
                    type={term.type}
                    startDate={term.startDate}
                    endDate={term.endDate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};
