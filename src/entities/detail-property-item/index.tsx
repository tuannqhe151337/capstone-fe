interface Props {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  value?: React.ReactNode;
}

export const DetailPropertyItem: React.FC<Props> = ({ icon, title, value }) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6">
      <div className="text-3xl text-neutral-300 dark:text-neutral-500">
        {icon}
      </div>
      <div className="flex flex-col flex-wrap gap-0.5">
        <p className="text-sm font-semibold text-neutral-400 dark:font-bold dark:text-neutral-500">
          {title}
        </p>
        <p className="text-base font-bold text-neutral-500 dark:text-neutral-400">
          {value}
        </p>
      </div>
    </div>
  );
};
