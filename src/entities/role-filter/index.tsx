import { useEffect, useState } from "react";
import { Role, useGetListRoleQuery } from "../../providers/store/api/roleApi";
import Select from "react-select";

interface Option {
  value: number;
  label: string;
}

const defaultOption: Option = {
  value: 0,
  label: "All role",
};

const convertRoleToOptions = (roles: Role[]) => {
  return roles.map(({ id, name }) => ({ label: name, value: id }));
};

interface Props {
  onChange?: (option: Option | null | undefined) => any;
}

export const RoleFilter: React.FC<Props> = ({ onChange }) => {
  // Fetch initial data
  const { data } = useGetListRoleQuery();

  // Select state
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultOption
  );

  useEffect(() => {
    onChange && onChange(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <Select
        classNamePrefix="custom-select"
        className="w-[200px] cursor-pointer"
        isSearchable
        value={selectedOption}
        onChange={(value) => setSelectedOption(value)}
        options={[defaultOption, ...convertRoleToOptions(data?.data || [])]}
      />
    </div>
  );
};
