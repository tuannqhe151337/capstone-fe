import { useState } from "react";
import Select from "react-select";
import {
  CostType,
  useGetListCostTypeQuery,
} from "../../providers/store/api/costTypeAPI";

interface Option {
  value: number;
  label: string;
}

const DefaultOption: Option = {
  value: 0,
  label: "All cost type",
};

const convertCostTypeToOptions = (
  roles: CostType[],
  excludeRoleId?: number
) => {
  return roles
    .map(({ costTypeId, name }) => ({ label: name, value: costTypeId }))
    .filter(({ value }) => value !== excludeRoleId);
};

interface Props {
  defaultOption?: Option;
  onChange?: (option: Option | null | undefined) => any;
}

export const CostTypeFilter: React.FC<Props> = ({
  onChange,
  defaultOption = DefaultOption,
}) => {
  // Fetch initial data
  const { data } = useGetListCostTypeQuery();

  // Select state
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);

  return (
    <div>
      <Select
        classNamePrefix="custom-select"
        className="w-[200px] cursor-pointer"
        isSearchable
        value={selectedOption}
        onChange={(value) => {
          if (value) {
            setSelectedOption(value);
            onChange && onChange(value);
          }
        }}
        options={[
          defaultOption,
          ...convertCostTypeToOptions(data?.data || [], defaultOption.value),
        ]}
      />
    </div>
  );
};
