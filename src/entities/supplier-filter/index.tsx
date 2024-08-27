import { AsyncPaginate } from "react-select-async-paginate";
import type { LoadOptions } from "react-select-async-paginate";
import { useState } from "react";
import { cn } from "../../shared/utils/cn";
import { useLazyGetListSupplierQuery } from "../../providers/store/api/supplierApi";

interface SupplierOption {
  value: number;
  label: string;
}

const pageSize = 10;

const DefaultOption: SupplierOption = {
  value: 0,
  label: "All supplier",
};

interface Props {
  className?: string;
  onChange?: (option: SupplierOption | null) => any;
  defaultOption?: SupplierOption;
}

export const SupplierFilter: React.FC<Props> = ({
  className,
  onChange,
  defaultOption = DefaultOption,
}) => {
  // Fetch initial data
  const [page, setPage] = useState<number>(1);
  const [getListSupplierQuery, { isFetching }] = useLazyGetListSupplierQuery();

  // Convert data to option
  const loadOptions: LoadOptions<SupplierOption, any, any> = async (query) => {
    // Fetch data
    const data = await getListSupplierQuery({
      page,
      pageSize,
      query,
    }).unwrap();

    // Load options
    const hasMore = page < data.pagination.numPages;

    const loadOptions = {
      options: data?.data
        .map(({ supplierId, name }) => ({
          value: supplierId,
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
  const [selectedOption, setSelectedOption] = useState<SupplierOption | null>(
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
