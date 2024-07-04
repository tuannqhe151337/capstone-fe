import { AsyncPaginate } from "react-select-async-paginate";
import type { LoadOptions } from "react-select-async-paginate";
import { useEffect, useState } from "react";
import { useLazyGetListTermQuery } from "../../providers/store/api/termApi";

interface TermOption {
  value: number;
  label: string;
}

const pageSize = 10;

const defaultOption: TermOption = {
  value: 0,
  label: "All term",
};

interface Props {
  onChange?: (option: TermOption | null) => any;
}

export const TermFilter: React.FC<Props> = ({ onChange }) => {
  // Fetch initial data
  const [page, setPage] = useState<number>(1);
  const [getListTermQuery, { isFetching }] = useLazyGetListTermQuery();

  // Convert data to option
  const loadOptions: LoadOptions<TermOption, any, any> = async (query) => {
    // Fetch data
    const data = await getListTermQuery({
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
  const [selectedOption, setSelectedOption] = useState<TermOption | null>(
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
