import { AsyncPaginate } from "react-select-async-paginate";
import type { LoadOptions } from "react-select-async-paginate";
import { useEffect, useState } from "react";
import { useLazyGetListDepartmentQuery } from "../../providers/store/api/departmentApi";

interface DepartmentOption {
  value: number;
  label: string;
}

const pageSize = 10;

const defaultOption: DepartmentOption = {
  value: 0,
  label: "All department",
};

interface Props {
  onChange?: (option: DepartmentOption | null) => any;
}

export const DepartmentFilter: React.FC<Props> = ({ onChange }) => {
  // Fetch initial data
  const [page, setPage] = useState<number>(1);
  const [getListDepartmentQuery, { isFetching }] =
    useLazyGetListDepartmentQuery();

  // Convert data to option
  const loadOptions: LoadOptions<DepartmentOption, any, any> = async (
    query
  ) => {
    // Fetch data
    const data = await getListDepartmentQuery({
      page,
      pageSize,
      query,
    }).unwrap();

    // Load options
    const hasMore = page < data.pagination.numPages;

    const loadOptions = {
      options: data?.data.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
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
  const [selectedOption, setSelectedOption] = useState<DepartmentOption | null>(
    defaultOption
  );

  useEffect(() => {
    onChange && onChange(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <AsyncPaginate
        classNamePrefix="custom-select"
        className="w-[200px] cursor-pointer"
        value={selectedOption}
        isLoading={isFetching}
        onChange={(value) => setSelectedOption(value)}
        options={[defaultOption]}
        loadOptions={loadOptions}
      />
    </div>
  );
};
