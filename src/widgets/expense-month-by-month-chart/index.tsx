import Chart from "react-apexcharts";
import { YearFilter } from "../../entities/year-filter";
import { cn } from "../../shared/utils/cn";

interface Props {
  className?: string;
}

export const ExpenseMonthByMonthChart: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl py-7 px-8",
        className
      )}
    >
      <div className="flex flex-row flex-wrap">
        <div>
          <p className="text-neutral-600 dark:text-neutral-400 font-bold text-lg">
            Monthly expense
          </p>
        </div>
        <div className="ml-auto">
          <YearFilter />
        </div>
      </div>
      <Chart
        options={{
          chart: {
            id: "finance-chart",
            toolbar: { show: false },
            animations: { enabled: true },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth" },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
          legend: { position: "top" },
          yaxis: {
            min: 15000,
            max: 65000,
          },
        }}
        series={[
          {
            name: "Actual cost",
            data: [35000, 55000, 45000, 50000, 49000, 60000, 50000, 40000],
          },
          {
            name: "Expected cost",
            data: [40000, 50000, 60000, 30000, 60000, 30000, 20000, 35000],
          },
        ]}
        type="area"
        height={350}
      />
    </div>
  );
};
