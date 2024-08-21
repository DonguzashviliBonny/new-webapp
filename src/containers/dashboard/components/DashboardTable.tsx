// ** service
import { useDashboardAssetsReq } from "@/api/requests/dashboard";

// ** types
import { sortT } from "@/types/common";

// ** components
import DashboardAssetsUI from "@/components/dashboard/components/table/DashboardTableUI";
import {
  ClickedColumnsT,
  DashboardAssetsUIProps,
  DashboardTableDataT,
} from "@/types/components/dashboard/dashboardProps";

// ** hooks
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";

/**
 * DashboardAssets component is responsible for rendering the assets table on the dashboard page.
 * It fetches the data from the server using the useDashboardAssetsReq hook and passes the necessary
 * props to the DashboardAssetsUI component.
 */
const DashboardAssets: React.FC<{ token: string }> = ({ token }) => {
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
    Search: debouncedSearch, // Search query
    SortColumn: sortObj?.key, // Column to sort by
    SortOrder: sortObj?.sort, // Sort order
  };

  const data = useDashboardAssetsReq(token, assetsParams);

  /**
   * Callback function to handle column sorting. It updates the clicked columns object and the sort object.
   * @param val - The key of the clicked column
   */
  const handleColumnSort = useCallback((val: keyof ClickedColumnsT) => {
    setClickedColumns((prev) => {
      // Get an array of the keys of the clicked columns object
      const filterKeys = Object.keys(prev) as (keyof ClickedColumnsT)[];

      // Create a new object to hold the updated clicked columns values
      const newClickedColumns = filterKeys.reduce((acc, key) => {
        const res = { ...acc };
        // If the current key is the same as the clicked key, update the value
        // Otherwise, set the value to 0
        res[key] = key === val ? (prev[key] >= 2 ? 0 : prev[key] + 1) : 0;
        return acc;
      }, {} as ClickedColumnsT);

      // Update the sort object based on the new clicked columns values
      setSortObj(
        newClickedColumns[val] === 0 ? undefined : { key: val, sort: newClickedColumns[val] % 2 ? "asc" : "desc" }
      );

      return newClickedColumns;
    });
  }, []);

  /**
   * Callback function to handle hiding of assets. It toggles the visibility of an asset based on its id.
   * @param id - The id of the asset to hide
   */
  const handleHide = (id: string) => {
    setHide((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  // Map the fetched assets data and add an actions array to each item
  const tableData = data.data?.items.map((e) => ({
    ...e,
    actions: ["Trade", "Deposit"],
  }));

  // Object to hold the props for the DashboardAssetsUI component
  const dashboardAssetsUIProps: DashboardAssetsUIProps<DashboardTableDataT> = {
    value: searchAssets, // Search input value
    tableData, // Assets data
    handleChange: (e) => setSearchAssets(e.currentTarget.value), // Callback to handle search input change
    handleColumnSort, // Callback to handle column sorting
    sortObj, // Current sort object
    hide, // Array of hidden asset ids
    setHide, // Callback to update the array of hidden asset ids
    handleHide, // Callback to handle hiding of assets
  };

  // Render the DashboardAssetsUI component with the passed props
  return <DashboardAssetsUI {...dashboardAssetsUIProps} />;
};

export default DashboardAssets;
