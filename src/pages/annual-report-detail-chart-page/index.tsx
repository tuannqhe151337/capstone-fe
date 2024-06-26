import Chart from "react-apexcharts";

export const AnnualReportDetailChartPage: React.FC = () => {
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
    </div>
  );
};
