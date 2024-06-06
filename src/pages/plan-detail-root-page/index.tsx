import { RiCalendarScheduleFill } from "react-icons/ri";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Tag } from "../../shared/tag";
import { OverviewCard } from "./ui/overview-card";
import { FaMoneyBillTrendUp, FaCoins } from "react-icons/fa6";
import TabList from "../../shared/tab-list";
import { Outlet } from "react-router-dom";

export const PlanDetailRootPage: React.FC = () => {
  return (
    <div className="px-6 pb-10">
      <BubbleBanner></BubbleBanner>

      {/* Title */}
      <div className="flex flex-row flex-wrap items-center mt-6 px-7">
        <p className="text-2xl font-extrabold text-primary mr-5">
          Burname_templan
        </p>

        <div className="flex flex-row flex-wrap gap-3">
          <Tag background="unfilled" variant="waiting">
            v2
          </Tag>
          <Tag background="unfilled" variant="waiting">
            Waiting for review
          </Tag>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-between gap-5 mt-10 px-5 w-full">
        <OverviewCard
          className="flex-1"
          icon={<RiCalendarScheduleFill className="text-4xl" />}
          label={"Term"}
          value={"Financial plan December Q3 2021"}
        />

        <OverviewCard
          className="flex-1"
          icon={<FaMoneyBillTrendUp className="text-4xl" />}
          label={"Biggest expenditure"}
          value={"180.000.000 VNĐ"}
        />

        <OverviewCard
          className="flex-1"
          icon={<FaCoins className="text-4xl" />}
          label={"Total plan"}
          value={"213.425.384 VNĐ"}
        />
      </div>

      <div className="mt-7 px-5">
        <div className="w-full h-full border shadow rounded-xl py-7 px-8">
          <div className="border-b-2 border-b-neutral-200 dark:border-b-neutral-700">
            <TabList
              className="-mb-0.5"
              items={[
                { id: "expenses", name: "Expenses" },
                { id: "detail", name: "Detail" },
                { id: "version", name: "Version" },
              ]}
            />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};
