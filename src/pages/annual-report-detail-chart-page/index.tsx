import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useLazyFetchAnnualReportChartQuery } from "../../providers/store/api/annualsAPI";
import { useEffect } from "react";
import { ApexOptions } from "apexcharts";

export const AnnualReportDetailChartPage: React.FC = () => {
  // Get annual report chart
  const { annualReportId } = useParams<{ annualReportId: string }>();

  const [fetchAnnualReportChart, { data: annual, isFetching, isSuccess }] =
    useLazyFetchAnnualReportChartQuery();

  useEffect(() => {
    if (annualReportId) {
      fetchAnnualReportChart(parseInt(annualReportId, 10), true);
    }
  }, [annualReportId]);

  useEffect(() => {
    console.log("Annual report data:", annual);
  }, [annual]);

  if (!isFetching && isSuccess && !annual) return <p>No annual found</p>;

  const chartOptions: ApexOptions = {
    chart: { id: "annual-report-chart", toolbar: { show: false } },
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
    plotOptions: {
      pie: {
        donut: {
          labels: { show: true },
        },
      },
    },
  };

  return (
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


      {/* {isFetching && <p>Loading...</p>}
      {isSuccess && annual && (
        <Chart
          options={{
            ...chartOptions,
            labels: annual.map((item: AnnualReportChart) => item.costType.name),
          }}
          series={annual.map((item: AnnualReportChart) => item.totalCost)}
          type="donut"
          height={350}
        />
      )}
      {!isFetching && !isSuccess && <p>No data available</p>} */}
    </div>
  );
};
