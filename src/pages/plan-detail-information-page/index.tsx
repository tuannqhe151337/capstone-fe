import { format } from "date-fns";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { DetailPropertyItem } from "../../entities/detail-property-item";
import { FaChartLine } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import { RiProgress3Fill } from "react-icons/ri";

export const PlanDetailInformationPage: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap w-full px-4 py-10">
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Term */}
        <DetailPropertyItem
          icon={<RiCalendarScheduleFill className="text-3xl" />}
          title="Term"
          value="Financial plan December Q3 2001"
        />

        {/* Plan due date */}
        <DetailPropertyItem
          icon={<FaChartLine className="text-2xl" />}
          title="Plan due date"
          value={format(new Date(), "dd MMMM yyyy")}
        />

        {/* Department */}
        <DetailPropertyItem
          icon={<PiTreeStructureFill className="text-3xl" />}
          title="Department"
          value="BU 01"
        />
      </div>
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Status */}
        <DetailPropertyItem
          icon={<RiProgress3Fill className="text-3xl" />}
          title="Status"
          value={<p className="text-primary-500">Waiting for approval</p>}
        />

        {/* Version */}
        <DetailPropertyItem
          icon={<BsStack className="text-2xl" />}
          title="Version"
          value="v3"
        />

        {/* Created at */}
        <DetailPropertyItem
          icon={<FaClock className="text-2xl" />}
          title="Created at"
          value={format(new Date(), "dd MMMM yyyy")}
        />

        {/* Created by */}
        <DetailPropertyItem
          icon={<HiUser className="text-3xl -ml-1" />}
          title="Created by"
          value="AnhLN2"
        />
      </div>
    </div>
  );
};
