import { Link, useLocation } from "react-router-dom";
import { ResizableBox } from "react-resizable";
import { MdDashboard, MdGroupAdd, MdPersonSearch } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { Tab } from "./ui/tab";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  // i18n
  const { t } = useTranslation(["sidebar"]);

  // Router
  const location = useLocation();

  // Width state
  const [width, setWidth] = useState<number>(250);

  // Expanded or close state
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useHotkeys("ctrl + b", () => {
    setIsExpanded((prevState) => !prevState);
  });

  useEffect(() => {
    setWidth(isExpanded ? 250 : 85);
  }, [isExpanded]);

  return (
    <ResizableBox
      className="pl-5"
      height={window.innerHeight - 100}
      width={width}
      minConstraints={[80, Infinity]}
      resizeHandles={["e"]}
      onResize={(event, data) => {
        setWidth(data.size.width);
        event.preventDefault();
      }}
    >
      <div>
        {/* Dashboard */}
        <div>
          <Link to={`/`}>
            <Tab
              icon={<MdDashboard className="text-2xl" />}
              text={t("dashboard")}
              selected={location.pathname === "/"}
              isExpanded={isExpanded}
            />
          </Link>
        </div>

        {/* My Groups */}
        <div>
          <Link to={`/`}>
            <Tab
              icon={<FaUserGroup className="text-xl mr-1" />}
              text={t("myGroups")}
              // selected={location.pathname === "/"}
              isExpanded={isExpanded}
            />
          </Link>
        </div>

        {/* Find Group */}
        <div>
          <Link to={`/`}>
            <Tab
              icon={<MdPersonSearch className="text-2xl" />}
              text={t("findGroup")}
              // selected={location.pathname === "/"}
              isExpanded={isExpanded}
            />
          </Link>
        </div>

        {/* Create group */}
        <div>
          <Link to={`/`}>
            <Tab
              icon={<MdGroupAdd className="text-2xl" />}
              text={t("createGroup")}
              // selected={location.pathname === "/"}
              isExpanded={isExpanded}
            />
          </Link>
        </div>
      </div>
    </ResizableBox>
  );
};
