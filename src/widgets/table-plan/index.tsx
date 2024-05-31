import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";

// Định nghĩa kiểu cho status
type StatusType = "new" | "approve" | "waiting for approval" | "denied";
const renderButton = (status: StatusType) => {
  switch (status) {
    case "new":
      return (
        <button
          type="button"
          className="border select-none shadow-sm rounded px-4 ml-4 mt-2 dark:shadow-black text-green-600 font-bold dark:bg-neutral-700 group-hover:text-green-700 dark:group-hover:text-green-500 dark:group-hover:bg-neutral-800"
        >
          New
        </button>
      );
    case "approve":
      return (
        <button
          type="button"
          className=" border select-none rounded px-6 py-1 ml-4 bg-green-600 dark:shadow-black dark:bg-green-800 dark:text-white/70 text-white font-bold group-hover:text-white group-hover:bg-green-700 dark:group-hover:bg-green-900 dark:group-hover:text-white/80"
        >
          Approve
        </button>
      );
    case "waiting for approval":
      return (
        <button
          type="button"
          className="border select-none px-4 py-1 ml-4 bg-white shadow-sm dark:shadow-black rounded font-bold text-primary-500 dark:text-primary-600 dark:bg-white/80 group-hover:text-primary-600 dark:group-hover:text-primary-600 dark:group-hover:bg-white/90"
        >
          Waiting for approval
        </button>
      );
    case "denied":
      return (
        <button
          type="button"
          className="border select-none ml-4 px-4 py-1 bg-white dark:bg-white/80 dark:bg-neutral dark:shadow-black rounded text-red-500 font-bold shadow-sm group-hover:text-red-600 dark:group-hover:text-red-500/90 dark:group-hover:bg-white/90"
        >
          Denined
        </button>
      );
    default:
      return null;
  }
};

// Định nghĩa kiểu cho dữ liệu bảng
type TablePlanDataType = {
  plan: string;
  term: string;
  department: string;
  version: string;
  status: StatusType;
};

const tablePlanDataList: TablePlanDataType[] = [
  {
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v1",
    status: "new",
  },
  {
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v2",
    status: "approve",
  },
  {
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v3",
    status: "waiting for approval",
  },
  {
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v4",
    status: "denied",
  },
];

export const TablePlanManagement: React.FC = () => {
  return (
    <div>
      <table className="text-center text-sm font-light mt-6 min-w-full shadow overflow-hidden rounded">
        <thead className="bg-primary-100 dark:bg-primary-950/50 font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Plan
            </th>
            {/* <th scope="col" className="px-6 py-4"></th> */}
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Term
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Version
            </th>
            <th scope="col" className="px-6 py-4">
              <IconButton className="px-3">
                <FaPlusCircle className="text-2xl text-primary-500/80 hover:text-primary-500/80 mt-1" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {tablePlanDataList.map((row, index) => (
            <tr
              key={index}
              className={`group border-b cursor-pointer ${
                index % 2 === 0
                  ? "bg-white hover:bg-primary-50/50 dark:border-neutral-500 dark:bg-neutral-800/70 dark:hover:bg-neutral-900"
                  : "bg-primary-100 hover:bg-primary-200 dark:border-neutral-500 dark:bg-primary-950/50 dark:hover:bg-primary-950"
              }`}
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <div className="flex flex-row flex-wrap">
                  <p className="text-primary-500 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-600 dark:group-hover:text-primary-500/90 ml-14">
                    {row.plan}
                  </p>
                  <div>{renderButton(row.status)}</div>
                </div>
              </td>
              {/* <td></td> */}
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.term}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.department}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.version}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <IconButton>
                  <FaTrash className="text-red-600 text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={1} totalPage={20} className="mt-6" />
    </div>
  );
};
