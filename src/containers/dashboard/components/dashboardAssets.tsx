// ** service
import { useDashboardAssetsReq } from "@/api/requests/dashboard";

// ** types
import { sortT } from "@/types/common";

// ** components
import DashboardAssetsUI from "@/components/dashboard/components/table/dashboardAssetsUI";
import { ClickedColumnsT, DashboardAssetsUIProps, DashboardTableDataT } from "@/types/components/dashboard";

// ** hooks
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";

const DashboardAssets = ({ token }: { token: string }) => {
  const [searchAssets, setSearchAssets] = useState<string>("");
  const [sortObj, setSortObj] = useState<sortT>();
  const [debouncedSearch] = useDebounce<string>(searchAssets, 800);
  const [hide, setHide] = useState<string[]>([]);
  const [, setClickedColumns] = useState<ClickedColumnsT>({
    name: 0,
    rank: 0,
    price: 0,
    quoteBalance: 0,
    percentChange_24h: 0,
    volume_24h: 0,
    marketCap: 0,
  });

  const assetsParams = {
    Search: debouncedSearch,
    SortColumn: sortObj?.key,
    SortOrder: sortObj?.sort,
  };

  const data = useDashboardAssetsReq(token, assetsParams);

  const handleColumnSort = useCallback((val: keyof ClickedColumnsT) => {
    setClickedColumns((prev) => {
      const filterKeys = Object.keys(prev) as (keyof ClickedColumnsT)[];

      const newClickedColumns = filterKeys.reduce((acc, key) => {
        const res = { ...acc };
        res[key] = key === val ? (prev[key] >= 2 ? 0 : prev[key] + 1) : 0;
        return acc;
      }, {} as ClickedColumnsT);

      setSortObj(
        newClickedColumns[val] === 0 ? undefined : { key: val, sort: newClickedColumns[val] % 2 ? "asc" : "desc" }
      );

      return newClickedColumns;
    });
  }, []);

  const handleHide = (id: string) => {
    setHide((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  const tableData = data.data?.items.map((e) => ({
    ...e,
    actions: ["Trade", "Deposit"],
  }));

  const dashboardAssetsUIProps: DashboardAssetsUIProps<DashboardTableDataT> = {
    value: searchAssets,
    tableData,
    handleChange: (e) => setSearchAssets(e.currentTarget.value),
    handleColumnSort,
    sortObj,
    hide,
    setHide,
    handleHide,
  };

  return <DashboardAssetsUI {...dashboardAssetsUIProps} />;
};

export default DashboardAssets;
