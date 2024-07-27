import { MdDarkMode } from "react-icons/md";
import { IconButton } from "../../shared/icon-button";
import { useEffect } from "react";
import { changeDarkmode } from "./utils/change-darkmode";
import {
  useMeQuery,
  useUserSettingMutation,
} from "../../providers/store/api/authApi";

export const DarkmodeChanger: React.FC = () => {
  // Get data
  const { data } = useMeQuery();

  // Mutation
  const [updateUserSetting] = useUserSettingMutation();

  useEffect(() => {
    if (data) {
      changeDarkmode(data.settings.darkMode);
    }
  }, [data?.settings.darkMode]);

  return (
    <IconButton
      containerClassName="z-30"
      tooltip="Dark/Light mode"
      onClick={() => {
        if (data) {
          updateUserSetting({
            theme: data.settings.theme,
            language: data.settings.language,
            darkMode: !data.settings.darkMode,
          });
        }
      }}
    >
      <MdDarkMode className="z-30 text-2xl text-primary-500 dark:text-primary-600" />
    </IconButton>
  );
};
