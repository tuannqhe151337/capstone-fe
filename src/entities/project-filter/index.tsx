import { AsyncPaginate } from "react-select-async-paginate";
import type { LoadOptions } from "react-select-async-paginate";
import { useState } from "react";
import { cn } from "../../shared/utils/cn";
import { useLazyGetListProjectQuery } from "../../providers/store/api/projectsApi";

interface ProjectOption {
  value: number;
  label: string;
}

const pageSize = 10;

const DefaultOption: ProjectOption = {
  value: 0,
  label: "All project",
};

interface Props {
  className?: string;
  onChange?: (option: ProjectOption | null) => any;
  defaultOption?: ProjectOption;
}

export const ProjectFilter: React.FC<Props> = ({
  className,
  onChange,
  defaultOption = DefaultOption,
}) => {
  // Fetch initial data
  const [page, setPage] = useState<number>(1);
  const [getListProjectQuery, { isFetching }] = useLazyGetListProjectQuery();

  // Convert data to option
  const loadOptions: LoadOptions<ProjectOption, any, any> = async (query) => {
    // Fetch data
    const data = await getListProjectQuery({
      page,
      pageSize,
      query,
    }).unwrap();

    // Load options
    const hasMore = page < data.pagination.numPages;

    const loadOptions = {
      options: data?.data
        .map(({ projectId, name }) => ({
          value: projectId,
          label: name,
        }))
        .filter(({ value }) => value !== defaultOption.value),
      hasMore,
    };

    if (page === 1 && query === "") {
      loadOptions.options.unshift(defaultOption);
    }

    // Update page
    if (hasMore) {
      setPage((page) => page + 1);
    }

    return loadOptions;
  };

  // Select state
  const [selectedOption, setSelectedOption] = useState<ProjectOption | null>(
    defaultOption
  );

  return (
    <div>
      <AsyncPaginate
        classNamePrefix="custom-select"
        className={cn("w-[200px] cursor-pointer", className)}
        value={selectedOption}
        isLoading={isFetching}
        onChange={(value) => {
          if (value) {
            setSelectedOption(value);
            onChange && onChange(value);
          }
        }}
        // options={[defaultOption]}
        loadOptions={loadOptions}
      />
    </div>
  );
};
