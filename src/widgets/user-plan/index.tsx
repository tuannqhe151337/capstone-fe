import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { TableCell } from "./ui/table-cell";
import { TableCellName } from "./ui/table-cell-name";
import { TableCellIcon } from "./ui/table-cell-icon";
import { useNavigate } from "react-router-dom";
import { ActiveConfirmModal } from "../user-active-confirm-modal";
import { DeactiveConfirmModal } from "../user-deactive-confirm-modal";
// Định nghĩa kiểu cho dữ liệu bảng
type Status = "active" | "de-active";

type TablePlanDataType = {
  id: number;
  username: string;
  role: string;
  email: string;
  department: string;
  position: string;
  status: Status;
};

const tablePlanDataList: TablePlanDataType[] = [
  {
    id: 1,
    username: "AnhLN7",
    role: "Admin",
    email: "username@email.com",
    department: "Software development",
    position: "Techlead",
    status: "active",
  },
  {
    id: 2,
    username: "MaiNN2",
    role: "Admin",
    email: "username@email.com",
    department: "Software development",
    position: "Intern",
    status: "active",
  },
  {
    id: 3,
    username: "ThanhPD2",
    role: "Accountant",
    email: "username@email.com",
    department: "Accounting",
    position: "Employee",
    status: "de-active",
  },
  {
    id: 4,
    username: "NgocDN3",
    role: "Finalcial Staff",
    email: "username@email.com",
    department: "Finance",
    position: "Employee",
    status: "de-active",
  },
];

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 10,
    transition: {
      delay: 0.4,
    },
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
    },
  },
};

export const TableUserManagement: React.FC = () => {
  // Navigation
  const navigate = useNavigate();
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [deactiveModal, setDeactiveModal] = useState<boolean>(false);

  const handleIconClick = (status: Status) => {
    if (status !== "active") {
      setActiveModal(true);
    } else {
      setDeactiveModal(true);
    }
  };

  const handleCloseActiveModal = () => {
    setActiveModal(false);
  };

  const handleCloseDeactiveModal = () => {
    setDeactiveModal(false);
  };

  return (
    <div>
      <table className="text-center text-sm font-light mt-6 min-w-full shadow overflow-hidden rounded">
        <thead className="bg-primary-100 dark:bg-primary-950/50 font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-4 w-[220px] font-extrabold text-primary-500/80 dark:text-primary-600/80 text-left"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-4 w-[160px] font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Deparment
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Position
            </th>
            <th scope="col">
              <IconButton className="px-3">
                <FaPlusCircle className="text-[21px] text-primary-500/60 hover:text-primary-500/80 my-0.5" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {tablePlanDataList.map((row, index) => (
            <tr
              key={row.id}
              className={clsx({
                "group border-b cursor-pointer duration-200": true,
                "bg-white hover:bg-primary-50/50 dark:border-neutral-900 dark:bg-neutral-800/70 dark:hover:bg-neutral-800":
                  index % 2 === 0 && row.status === "active",
                "bg-primary-50 hover:bg-primary-100 dark:border-neutral-900 dark:bg-primary-950/30 dark:hover:bg-primary-950/70":
                  index % 2 !== 0 && row.status === "active",
                "bg-white/70 opacity-80 hover:opacity-1 dark:opacity-70 dark:hover:opacity-1 dark:border-neutral-900 dark:bg-neutral-800/70 dark:hover:bg-neutral-800":
                  index % 2 === 0 && row.status === "de-active",
                "bg-primary-50 opacity-80 hover:opacity-1 dark:opacity-70 dark:hover:opacity-1 dark:border-neutral-900 dark:bg-primary-950/30 dark:hover:bg-primary-950/70":
                  index % 2 !== 0 && row.status === "de-active",
              })}
              onMouseEnter={() => {
                setHoverRowIndex(index);
              }}
              onMouseLeave={() => {
                setHoverRowIndex(undefined);
              }}
              onClick={() => {
                navigate("detail");
              }}
            >
              <TableCell status={row.status}>{row.id}</TableCell>
              <TableCellName status={row.status}>{row.username}</TableCellName>
              <TableCell status={row.status}>{row.role}</TableCell>
              <TableCell status={row.status}>{row.email}</TableCell>
              <TableCell status={row.status}>{row.department}</TableCell>
              <TableCell status={row.status}>{row.position}</TableCell>
              <TableCellIcon
                index={index}
                hoverRowIndex={hoverRowIndex}
                status={row.status}
                onIconClick={() => handleIconClick(row.status)}
              ></TableCellIcon>
            </tr>
          ))}
        </tbody>
      </table>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        variants={animation}
      >
        <Pagination page={1} totalPage={20} className="mt-6" />
      </motion.div>

      <ActiveConfirmModal show={activeModal} onClose={handleCloseActiveModal} />
      <DeactiveConfirmModal
        show={deactiveModal}
        onClose={handleCloseDeactiveModal}
      />
    </div>
  );
};
