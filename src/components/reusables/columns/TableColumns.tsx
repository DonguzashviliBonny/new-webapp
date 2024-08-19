import { InvisibleIcon, VisibleIcon } from "@/assets/svg";
import { useDesktop, useMobile, useTablet } from "@/hooks";
import { DashboardTableDataT, HoldingsColumnProps, TableTitleProps } from "@/types/components/dashboard";
import { getFormattedUnhiddenAmount } from "@/utils";
import { Flex, TextView } from "nordom-ui";

export const TableHidableTitle: React.FC<TableTitleProps> = ({ setHide, hide, setHoldingsSort, tableData }) => {
  const isMobile = useMobile();
  const handleHideAll = (arr: DashboardTableDataT[]) => {
    const newArr = arr.map((e) => e.rank.toString()).sort();
    const str1 = newArr;
    const str2 = hide.sort();
    if (JSON.stringify(str1) === JSON.stringify(str2)) {
      setHide([]);
    } else {
      setHide(newArr);
    }
  };

  const isHiddenAll = (arr1: string[], arr2: DashboardTableDataT[]) => {
    const newArr1 = arr1.sort();
    const newArr2 = arr2.map((e) => e.rank?.toString()).sort();

    return JSON.stringify(newArr1) === JSON.stringify(newArr2);
  };

  return (
    <Flex gap={8} align="center">
      <span
        onClick={() => handleHideAll(tableData)}
        onMouseEnter={() => setHoldingsSort && setHoldingsSort(false)}
        onMouseLeave={() => setHoldingsSort && setHoldingsSort(true)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        role="button"
      >
        {isHiddenAll(hide, tableData) ? <InvisibleIcon /> : <VisibleIcon />}
      </span>
      <TextView size={isMobile ? 12 : 14}>Holdings</TextView>
    </Flex>
  );
};

export const HoldingsColumn: React.FC<HoldingsColumnProps> = ({ id, balance, quoteBalance, onClick, hide }) => {
  const isTablet = useTablet();
  const isDesktop = useDesktop();

  return (
    <Flex align={isTablet ? "flex-start" : "center"} gap={2} direction={isDesktop ? "row" : "column"}>
      <Flex align={"center"} gap={6}>
        <span
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClick}
          role="button"
        >
          {hide.includes(id) ? <InvisibleIcon /> : <VisibleIcon />}
        </span>
        <TextView size={isTablet ? 14 : 16} weight="400">
          {hide.includes(id)
            ? "*".repeat(getFormattedUnhiddenAmount(balance).length)
            : getFormattedUnhiddenAmount(balance)}
        </TextView>
      </Flex>
      <TextView size={isTablet ? 14 : 16} weight="400" color="nord500">
        ≈{" "}
        {hide.includes(id)
          ? "*".repeat(getFormattedUnhiddenAmount(quoteBalance).length)
          : getFormattedUnhiddenAmount(quoteBalance)}
        $
      </TextView>
    </Flex>
  );
};
