import { MdDarkMode } from "react-icons/md";
import { IconButton } from "../../shared/icon-button";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../providers/store/slices/darkModeSlice";

export const DarkmodeChanger: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <IconButton
      tooltip="Dark/Light mode"
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        dispatch(toggleDarkMode());
      }}
    >
      <MdDarkMode className="text-2xl text-primary-500 dark:text-primary-600" />
    </IconButton>
  );
};
