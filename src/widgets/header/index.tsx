import { Link } from "react-router-dom";
import { DarkmodeChanger } from "../../features/darkmode-changer";
import { LanguageChanger } from "../../features/language-changer";
import { ThemeChanger } from "../../features/theme-changer";
import { AccountIcon } from "../../entities/account-icon";

export const Header: React.FC = () => {
  return (
    <div className="flex items-center h-[100px]">
      <div className="ml-6">
        <Link to={`/`}>
          <p className="text-primary">
            <span className="text-4xl font-black">SD</span>
            <span className="text-2xl font-bold">Budget</span>
          </p>
        </Link>
      </div>
      <div className="flex items-center ml-auto mr-10">
        <LanguageChanger />
        <ThemeChanger />
        <DarkmodeChanger />
        <AccountIcon />
      </div>
    </div>
  );
};
