// ** icons
import { SearchIcon } from "@/assets/svg";

// ** hooks
import { useMobile, useResponsive, useTablet } from "@/hooks";

// ** 3rd party
import { getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";

// ** style
import classes from "./dashboardAssetsUI.module.scss";

// ** components
import { ContainerLayout, Flex, Input, Table, TextView } from "nordom-ui";
import { DashboardAssetsUIProps, DashboardTableDataT } from "@/types/components/dashboard/dashboardProps";
import { DashboardAssetsColumns } from "./DashboardTableColumns";
import DashboardAssetsUISkeleton from "./DashboardTableUI-skeleton";

const DashboardAssetsUI = ({
  value,
  tableData,
  handleChange,
  handleColumnSort,
  sortObj,
  hide,
  setHide,
  handleHide,
}: DashboardAssetsUIProps<DashboardTableDataT>) => {
  const isTablet = useTablet();
  const isMobile = useMobile();

  const columns = DashboardAssetsColumns({
    sortObj,
    handleColumnSort,
    hide,
    setHide,
    tableData: tableData || [],
    handleHide,
  });

  const table = useReactTable({
    data: tableData || [],
    columns: columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const containerLayoutPaddingInline = useResponsive({ laptop: 32, tablet: 24, mobile: 16 });

  const tableRenderer = () => {
    // if (tableData?.length === 0 && value.trim() !== "") return <EmptyComponent text="Coin Not Found" />;

    if (tableData?.length === 0) return <DashboardAssetsUISkeleton />;

    return <Table table={table} />;
  };

  return (
    <Flex direction="column">
      <ContainerLayout
        border_right
        border_left
        border_top
        child_bg_color="nord950"
        padding={{ top: 32, bottom: 32, right: containerLayoutPaddingInline, left: containerLayoutPaddingInline }}
      >
        <Flex
          justify="space-between"
          align={isTablet ? "center" : "flex-start"}
          direction={isTablet ? "row" : "column"}
          gap={16}
          style={{ width: "100%" }}
        >
          <TextView size={isMobile ? 20 : 24} weight="700" upperCase>
            My Assets
          </TextView>

          <div className={classes.inputDiv}>
            <Input
              inputType="primary"
              startIcon={
                <div style={{ width: 24, height: 24 }}>
                  <SearchIcon />
                </div>
              }
              value={value}
              placeholder="Search Coin"
              onChange={handleChange}
            />
          </div>
        </Flex>
      </ContainerLayout>

      <ContainerLayout borders>
        <Flex align="flex-start" justify="center">
          {tableRenderer()}
        </Flex>
      </ContainerLayout>
    </Flex>
  );
};

export default DashboardAssetsUI;
