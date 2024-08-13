import Chart from "react-apexcharts";
import { YearFilter } from "../../entities/year-filter";
import { cn } from "../../shared/utils/cn";
import { useEffect, useMemo, useState } from "react";
import { useLazyGetMonthlyCostTypeExpenseQuery } from "../../providers/store/api/dashboardAPI";
import { useGetAllCostTypeQuery } from "../../providers/store/api/costTypeAPI";

interface Props {
  className?: string;
}

export const MonthlyCostTypeExpenseChart: React.FC<Props> = ({ className }) => {
  // Select year
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // Get cost type
  const { data: costTypeResult } = useGetAllCostTypeQuery();

  // Get chart's data
  const [getMonthlyCostType, { data }] =
    useLazyGetMonthlyCostTypeExpenseQuery();

  useEffect(() => {
    if (year) {
      getMonthlyCostType({ year });
    }
  }, [year]);

  const dataChart: ApexAxisChartSeries = useMemo(() => {
    const dataChart: ApexAxisChartSeries = [];

    if (data && costTypeResult) {
      // Map by cost type name and list amount corresponding to each month
      const costTypeMonthlyMap: Record<string, number[]> = {};

      // Fill all cost type to the map
      for (const costType of costTypeResult.data) {
        costTypeMonthlyMap[costType.name] = [];
      }

      // For each monthly record:
      for (let monthlyCostType of data.data) {
        // Map by cost type and amount
        const costTypeMonthMap: Record<string, number> = {};
        for (const diagramResponse of monthlyCostType.diagramResponses) {
          costTypeMonthMap[diagramResponse.costType.name] =
            diagramResponse.totalCost;
        }

        // Insert all of cost type for that month, if it's not exists return 0
        for (const costType of costTypeResult.data) {
          costTypeMonthlyMap[costType.name].push(
            costTypeMonthMap[costType.name] || 0
          );
        }
      }

      // Map back from map to list data chart
      for (const [costTypeName, listAmount] of Object.entries(
        costTypeMonthlyMap
      )) {
        dataChart.push({
          name: costTypeName,
          data: listAmount,
        });
      }
    }

    return dataChart;
  }, [data, costTypeResult]);

  return (
    <div
      className={cn(
        "relative w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl pt-9 pb-12 px-8",
        className
      )}
    >
      <div className="flex flex-row flex-wrap mb-8">
        <div>
          <p className="text-primary-500 dark:text-primary-400 font-bold text-xl">
            Cost type consumption over time
          </p>
        </div>
        <div className="ml-auto">
          <YearFilter
            defaultOption={{
              value: new Date().getFullYear(),
              label: new Date().getFullYear().toString(),
            }}
            onChange={(option) => {
              option && setYear(option.value);
            }}
          />
        </div>
      </div>
      <Chart
        options={{
          chart: {
            toolbar: { show: true, offsetY: 355 },
            animations: { enabled: true },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth" },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              stops: [0, 90, 100],
            },
          },
          legend: { position: "top" },
        }}
        series={dataChart}
        type="area"
        height={350}
      />
    </div>
  );
};
