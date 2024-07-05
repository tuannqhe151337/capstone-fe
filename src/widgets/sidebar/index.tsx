import { Link, useLocation } from "react-router-dom";
import { ResizableBox } from "react-resizable";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { FaChartPie, FaChartLine, FaBars } from "react-icons/fa";
import { Tab } from "./ui/tab";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { IconButton } from "../../shared/icon-button";
import { useMeQuery } from "../../providers/store/api/authApi";
import { Role } from "../../providers/store/api/type";

export const Sidebar = () => {
  // i18n
  const { t } = useTranslation(["sidebar"]);

  // Router
  const location = useLocation();

  // Get me's data
  const { data } = useMeQuery();

  // Width state
  const [width, setWidth] = useState<number>(250);

  // Expanded or close state
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useHotkeys("ctrl + b", () => {
    setIsExpanded((prevState) => !prevState);
  });

  useEffect(() => {
    setWidth(isExpanded ? 275 : 85);
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
        {/* Toggle open close */}
        <div className="pl-3 mb-5">
          <IconButton
            tooltip="Toggle sidebar (Ctrl + B)"
            onClick={() => setIsExpanded((prevState) => !prevState)}
          >
            <FaBars className="text-xl text-primary-500" />
          </IconButton>
        </div>

        {/* Home */}
        <div>
          <Link to={`/`}>
            <Tab
              icon={<MdDashboard className="text-2xl" />}
              text={t("Home")}
              selected={location.pathname === "/"}
              isExpanded={isExpanded}
            />
          </Link>
        </div>

        {/* Annual report */}
        {data?.role.code === Role.ACCOUNTANT && (
          <div>
            <Link to={`/annual-report`}>
              <Tab
                icon={<FaChartPie className="text-2xl" />}
                text={t("Annual Report")}
                selected={location.pathname === "/annual-report"}
                isExpanded={isExpanded}
              />
            </Link>
          </div>
        )}

        {/* Term management */}
        {data?.role.code === Role.ACCOUNTANT && (
          <div>
            <Link to={`/term-management`}>
              <Tab
                icon={<RiCalendarScheduleFill className="text-2xl -ml-0.5" />}
                text={t("Term management")}
                selected={location.pathname === "/term-management"}
                isExpanded={isExpanded}
              />
            </Link>
          </div>
        )}

        {/* Financial report */}
        {(data?.role.code === Role.ACCOUNTANT ||
          data?.role.code === Role.FINANCIAL_STAFF) && (
          <div>
            <Link to={`/report-management`}>
              <Tab
                icon={<HiDocumentReport className="text-3xl -ml-1" />}
                text={t("Financial report")}
                selected={location.pathname === "/report-management"}
                isExpanded={isExpanded}
              />
            </Link>
          </div>
        )}

        {/* Financial plan */}
        {(data?.role.code === Role.ACCOUNTANT ||
          data?.role.code === Role.FINANCIAL_STAFF) && (
          <div>
            <Link to={`/plan-management`}>
              <Tab
                icon={<FaChartLine className="text-2xl" />}
                text={t("Financial plan")}
                selected={location.pathname === "/plan-management"}
                isExpanded={isExpanded}
              />
            </Link>
          </div>
        )}

        {/* User management */}
        {data?.role.code === Role.ADMIN && (
          <div>
            <Link to={`/user-management`}>
              <Tab
                icon={<FaUserGroup className="text-2xl -ml-0.5" />}
                text={t("User management")}
                selected={location.pathname === "/user-management"}
                isExpanded={isExpanded}
              />
            </Link>
          </div>
        )}
      </div>
    </ResizableBox>
  );
};
