import { useEffect } from "react";
import { useLazyGetListExchangeRateQuery } from "../../providers/store/api/exchangeRateApi";
import { TableExchangeRate } from "../../widgets/table-exchange-rate";
import { useInfiteLoaderWholePage } from "../../shared/hooks/use-infite-loader-whole-page";

const pageSize = 10;

export const ExchangeRateManagementList: React.FC = () => {
  // Fetch data
  const [getListExchangeRate, { data, isFetching }] =
    useLazyGetListExchangeRateQuery();

  useEffect(() => {
    getListExchangeRate({ page: 1, pageSize });
  }, []);

  // Infinite scroll
  useInfiteLoaderWholePage(() => {
    if (data && data.data.length < data.pagination.totalRecords) {
      getListExchangeRate({
        page: data.pagination.page + 1,
        pageSize,
      });
    }
  });

  return (
    <div>
      <TableExchangeRate
        listMonthlyExchangeRate={data?.data}
        isFetching={isFetching}
      />
    </div>
  );
};
