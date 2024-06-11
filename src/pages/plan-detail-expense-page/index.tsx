import { HiDotsVertical } from "react-icons/hi";
import { TablePlanExpenses } from "../../widgets/table-plan-expense";
import { FaFilter } from "react-icons/fa6";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { RiDeleteRow } from "react-icons/ri";
import { Button } from "../../shared/button";
import { FaListCheck } from "react-icons/fa6";

export const PlanDetailExpensePage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row flex-wrap items-center pl-3 mt-7 gap-2">
        <div className="flex-1">
          <SearchBox />
        </div>
        <div className="flex flex-row flex-wrap items-center ml-2">
          <Button variant="error" containerClassName="mr-3">
            <div className="flex flex-row flex-wrap items-center gap-3">
              <RiDeleteRow className="text-xl" />
              <p className="text-sm font-semibold">Deny expense</p>
            </div>
          </Button>
          <Button containerClassName="mr-3">
            <div className="flex flex-row flex-wrap items-center gap-3">
              <FaListCheck className="text-lg" />
              <p className="text-sm font-semibold">Approve expense</p>
            </div>
          </Button>

          <IconButton>
            <FaFilter className="text-xl text-primary -mb-0.5 mt-0.5" />
          </IconButton>
          <IconButton>
            <HiDotsVertical className="text-xl text-primary" />
          </IconButton>
        </div>
      </div>

      <TablePlanExpenses />
    </div>
  );
};
