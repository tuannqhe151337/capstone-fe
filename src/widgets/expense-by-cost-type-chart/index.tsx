import Chart from "react-apexcharts";
import { cn } from "../../shared/utils/cn";
import { YearFilter } from "../../entities/year-filter";

interface Props {
  className?: string;
}

export const ExpenseByCostTypeChart: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl py-7 px-8",
        className
      )}
    >
      <div className="flex flex-row flex-wrap">
        <p className="text-neutral-600 dark:text-neutral-400 font-bold text-lg">
          By cost type
        </p>
        <div className="ml-auto">
          <YearFilter />
        </div>
      </div>
      <div className="mt-8">
        <Chart
          options={{
            chart: { id: "sale-chart", toolbar: { show: false } },
            yaxis: {
              min: 15000,
              max: 65000,
            },
            legend: { position: "bottom" },
            labels: ["Shippings", "Refunds", "Order", "Income"],
            dataLabels: { enabled: true },
            plotOptions: {
              pie: {
                donut: {
                  labels: { show: true },
                },
              },
            },
          }}
          series={[35000, 55000, 45000, 50000]}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};
