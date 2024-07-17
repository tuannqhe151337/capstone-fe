import { useSelector } from "react-redux";
import { RootState } from "../../providers/store";

export const useDetectDarkmode = () => {
  return useSelector((state: RootState) => state.darkMode.isDarkMode);
};
