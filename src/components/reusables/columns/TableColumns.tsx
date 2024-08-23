// ** icons
import { CopyIcon, InvisibleIcon, VisibleIcon } from "@/assets/svg";

// ** hooks
import { useDesktop, useMobile, useTablet } from "@/hooks";

// ** components
import { DashboardTableDataT, HoldingsColumnProps, TableTitleProps } from "@/types/components/dashboard/dashboardProps";
import { StatusColumnProps } from "@/types/components/transactions/transactionTypes";

// ** helpers
import { getFormattedUnhiddenAmount } from "@/utils";
import {
  formatString,
  formatZerosToChar,
  getStatusBackgroundColor,
  getStatusTextColor,
  hideWithMask,
} from "@/utils/columnHelpers/columnHelpers";

// ** components
import { Copy, Flex, Tag, TextView } from "nordom-ui";

// ** style
import classes from "./TableColumns.module.scss";
import { format } from "date-fns";

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

export const StatusColumn: React.FC<StatusColumnProps> = ({ status }) => {
  return (
    <Flex justify="center">
      <Tag paddingInline="8" paddingBlock="6" bg_color={getStatusBackgroundColor(status)}>
        <TextView size={12} color={getStatusTextColor(status)}>
          {status}
        </TextView>
      </Tag>
    </Flex>
  );
};

export const TableTitle = ({ title }: { title: string }) => {
  const isMobile = useMobile();

  return <TextView size={isMobile ? 12 : 14}>{title}</TextView>;
};

export const TransactionIdColumn: React.FC<{ transactionId: string }> = ({ transactionId }) => {
  const formattedString = formatString(transactionId, 4);
  return (
    <Flex gap={8}>
      <TextView size={14} weight="400" color="nord400">
        {formattedString}
      </TextView>
      <Copy textToCopy={transactionId}>
        <CopyIcon className={classes.copyIcon} />
      </Copy>
    </Flex>
  );
};

export const WalletAddressColumn: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  const isMobile = useMobile();
  const formattedString = isMobile ? formatString(walletAddress, 4) : formatString(walletAddress, 8);
  return (
    <Flex gap={8}>
      <TextView size={isMobile ? 12 : 14} weight="400" color="nord400">
        {formattedString}
      </TextView>
      <Copy textToCopy={walletAddress}>
        <CopyIcon className={classes.copyIcon} />
      </Copy>
    </Flex>
  );
};

export const AmountColumn: React.FC<{ amount: number }> = ({ amount }) => {
  const formattedAmount = formatZerosToChar(amount);
  return (
    <TextView size={14} weight="400" color="nord400">
      {formattedAmount}
    </TextView>
  );
};

export const DateColumn: React.FC<{ date: Date }> = ({ date }) => {
  const isMobile = useMobile();

  return (
    <Flex>
      <TextView size={isMobile ? 12 : 14} weight="400" style={{ whiteSpace: "nowrap" }}>
        {format(date, "yyyy-MM-dd")}
      </TextView>
    </Flex>
  );
};

export const PaymentMethodColumn: React.FC<{ paymentMethod: string }> = ({ paymentMethod }) => {
  const isMobile = useMobile();

  const formattedMethod = hideWithMask(paymentMethod, isMobile);
  return (
    <TextView size={isMobile ? 12 : 14} weight="400">
      {formattedMethod}
    </TextView>
  );
};
