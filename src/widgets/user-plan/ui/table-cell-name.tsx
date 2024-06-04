type Status = "active" | "de-active";

interface Props {
  children?: React.ReactNode;
  status: Status;
}

export const TableCellName: React.FC<Props> = ({ children, status }) => (
  <td className="text-left first-letter:whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
    <p
      className={`${
        status === "active"
          ? "inline-block mr-4 text-primary-500 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-600 dark:group-hover:text-primary-500/90"
          : "inline-block mr-4 text-primary-500/70 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-500 dark:group-hover:text-primary-500/90"
      }`}
    >
      {children}
    </p>

    {status === "de-active" && (
      <div className="py-1 px-2 border shadow rounded-lg text-gray-500/70 dark:text-gray-500 dark:group-hover:text-gray-400 group-hover:text-gray-500 inline-block dark:border-black">
        Deactive
      </div>
    )}
  </td>
);
