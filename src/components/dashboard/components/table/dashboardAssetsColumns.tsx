// ** icons
import { SortAscIcon, SortDefaultIcon, SortDescIcon } from "@/assets/svg";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "@/assets/svg/arrows";

// ** hooks
import { useDesktop, useResponsive, useTablet } from "@/hooks";

// ** types
import { DashboardAssetI, DashboardAssetsColumnsProps } from "@/types/components/dashboard";

// ** helpers
import { toFixedNoRound } from "@/utils";
import { createColumnHelper } from "@tanstack/react-table";

// ** components
import { ButtonSecondary, Flex, TextView } from "nordom-ui";
import { Link } from "react-router-dom";
import { HoldingsColumn, TableHidableTitle } from "@/components/reusables/columns/TableColumns";

// ** style
import classes from "./dashboardAssetsUI.module.scss";

export const DashboardAssetsColumns = ({
  sortObj,
  handleColumnSort,
  hide,
  setHide,
  tableData,
  handleHide,
}: DashboardAssetsColumnsProps) => {
  const isTablet = useTablet();
  const isDesktop = useDesktop();

  const columnHelper = createColumnHelper<{ actions: string[] } & DashboardAssetI>();

  const sortIconRenderer = (val: string) => {
    if (!sortObj || sortObj.key !== val) return <SortDefaultIcon />;
    if (sortObj.sort === "asc") return <SortAscIcon />;
    return <SortDescIcon />;
  };

  const columns = [
    columnHelper.accessor("name", {
      header: () => (
        <Flex align="center" gap={4} onClick={() => handleColumnSort("name")}>
          <TextView size={isTablet ? 14 : 12}>Name</TextView>
          {sortIconRenderer("name")}
        </Flex>
      ),
      cell: ({ row }) => (
        <Flex gap={isDesktop ? 12 : 8} align="center">
          <img src={row.original?.logoUrl} alt={row.original?.name + "-icon"} width={32} height={32} />
          <Flex
            direction={isDesktop ? "row" : "column-reverse"}
            gap={isDesktop ? 2 : undefined}
            align={isDesktop ? "flex-end" : "flex-start"}
            wrap
          >
            <TextView size={isDesktop ? 16 : 10} weight="400" color={!isDesktop ? "nord400" : undefined}>
              {row.original?.name}
            </TextView>
            <TextView
              size={isDesktop ? 12 : 14}
              color={isDesktop ? "nord400" : undefined}
              weight={isDesktop ? "400" : "500"}
            >
              {isDesktop ? `(${row.original?.code})` : `${row.original?.code}`}
            </TextView>
          </Flex>
        </Flex>
      ),
      size: 200,
    }),
    columnHelper.accessor("quoteBalance", {
      header: () => (
        <Flex align="center" gap={4}>
          <TableHidableTitle hide={hide} setHide={setHide} tableData={tableData} />
          <Flex align="center" onClick={() => handleColumnSort("quoteBalance")}>
            {sortIconRenderer("quoteBalance")}
          </Flex>
        </Flex>
      ),
      cell: ({ row }) => (
        <HoldingsColumn
          id={row.original.rank?.toString()}
          balance={row.original.balance.toString()}
          quoteBalance={row.original.quoteBalance.toString()}
          onClick={() => handleHide(row.original.rank?.toString())}
          hide={hide}
        />
      ),
      size: isTablet ? 190 : undefined,
    }),
    columnHelper.accessor("price", {
      header: () => (
        <Flex align="center" gap={4} onClick={() => handleColumnSort("price")}>
          <TextView size={isTablet ? 14 : 12}>price</TextView>
          {sortIconRenderer("price")}
        </Flex>
      ),
      cell: ({ row }) => (
        <Flex direction="column">
          <TextView
            size={isTablet ? 14 : 12}
            color={isDesktop ? (row.original?.percentChange_24h > 0 ? "success" : "error") : undefined}
          >
            $ {toFixedNoRound(row.original?.price, row.original?.price > 10 ? 2 : 6)}
          </TextView>

          {!isDesktop && (
            <Flex align="center" gap={8}>
              <TextView size={14} color={row.original?.percentChange_24h > 0 ? "success" : "error"} weight="500">
                {Math.sign(row.original?.percentChange_24h) === 1 && "+"}
                {toFixedNoRound(row.original?.percentChange_24h, 2)}%{" "}
              </TextView>
            </Flex>
          )}
        </Flex>
      ),
      size: isTablet ? 190 : undefined,
    }),
    columnHelper.accessor("percentChange_24h", {
      header: () => (
        <Flex align="center" gap={4} onClick={() => handleColumnSort("percentChange_24h")}>
          <TextView size={isTablet ? 14 : 12}>24h Change</TextView>
          {sortIconRenderer("percentChange_24h")}
        </Flex>
      ),
      cell: ({ row }) => (
        <Flex align="center" gap={8}>
          <TextView size={14} color={row.original?.percentChange_24h > 0 ? "success" : "error"} weight="500">
            {Math.sign(row.original?.percentChange_24h) === 1 && "+"}
            {toFixedNoRound(row.original?.percentChange_24h, 2)}%{" "}
          </TextView>
          {Math.sign(row.original?.percentChange_24h) === 1 ? (
            <ArrowUpRightIcon className={classes.upIcon} />
          ) : (
            <ArrowDownRightIcon className={classes.downIcon} />
          )}
        </Flex>
      ),
      size: isTablet ? 190 : undefined,
    }),
    columnHelper.accessor("volume_24h", {
      header: () => (
        <Flex align="center" gap={4} onClick={() => handleColumnSort("volume_24h")}>
          <TextView style={{ fontWeight: 500 }} size={isTablet ? 14 : 12}>
            24h Volume
          </TextView>
          {sortIconRenderer("volume_24h")}
        </Flex>
      ),
      cell: ({ row }) => (
        <TextView size={14} color="nord400" weight="400">
          $ {row.original?.volume_24h}
        </TextView>
      ),
      size: isTablet ? 190 : undefined,
    }),
    columnHelper.accessor("marketCap", {
      header: () => (
        <Flex align="center" gap={4} onClick={() => handleColumnSort("marketCap")}>
          <TextView style={{ fontWeight: 500 }} size={isTablet ? 14 : 12}>
            Market Cap
          </TextView>
          {sortIconRenderer("marketCap")}
        </Flex>
      ),
      cell: ({ row }) => (
        <TextView size={14} color="nord400" weight="400">
          {isDesktop ? `$ ${row.original?.marketCap}` : `$${row.original?.marketCap}`}
        </TextView>
      ),
      size: isTablet ? 190 : undefined,
    }),
    columnHelper.accessor("actions", {
      header: () => (
        <div style={{ width: "100%", textAlign: "center" }}>
          <TextView size={isTablet ? 14 : 12}>Actions</TextView>
        </div>
      ),
      cell: ({ row }) => (
        <Flex gap={8} justify="flex-end">
          <Link to={`/trade/spot-trading/${row.original?.code}_USDT`} style={{ textDecoration: "none" }}>
            <ButtonSecondary size="extraSmall">
              <TextView weight="500" size={isDesktop ? 14 : 12}>
                Trade
              </TextView>
            </ButtonSecondary>
          </Link>

          <Link to={`/transactions/deposit/crypto/${row.original?.code}`} style={{ textDecoration: "none" }}>
            <ButtonSecondary size="extraSmall">
              <TextView weight="500" size={isDesktop ? 14 : 12}>
                Deposit
              </TextView>
            </ButtonSecondary>
          </Link>
        </Flex>
      ),
      size: isTablet ? 180 : undefined,
    }),
  ];

  console.log(columns);

  const mobileColumns = columns.filter(
    (e: { accessorKey: string }) =>
      e.accessorKey !== "rank" &&
      e.accessorKey !== "volume_24h" &&
      e.accessorKey !== "actions" &&
      e.accessorKey !== "percentChange_24h" &&
      e.accessorKey !== "marketCap"
  );
  const tabletColumns = columns.filter((e) => e.accessorKey !== "volume_24h" && e.accessorKey !== "percentChange_24h");

  const laptopColumns = columns.filter((e) => e.accessorKey !== "percentChange_24h");

  const result = useResponsive({ mobile: mobileColumns, tablet: tabletColumns, laptop: laptopColumns });

  return result;
};
