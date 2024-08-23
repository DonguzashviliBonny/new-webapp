import { ArrowRightIcon } from "@/assets/svg/arrows";
import { useResponsive } from "@/hooks";
import { ContainerLayout, Flex, Table, TextView } from "nordom-ui";
import { Link, useNavigate } from "react-router-dom";
import classes from "./TransactionsTable.module.scss";
import { useTransactionTableReq } from "@/api/requests/transactions";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import CryptoTableColumns from "./CryptoTableColumns";
import FiatTableColumns from "./FiatTableColumns";
import TransactionsTableSkeleton from "./TransactionsTable-skeleton";

const TransactionsTable = ({ token, action, type }: { token: string; action: string; type: string }) => {
  const navigate = useNavigate();
  const { data: tableData, isLoading } = useTransactionTableReq({
    token,
    action: action as string,
    type: type as string,
    pagination: {
      PageNumber: 1,
      PageSize: 10,
    },
  });

  const allTransactions = useResponsive({ mobile: "View All", tablet: "All Transactions" });
  const columns = type === "crypto" ? CryptoTableColumns() : FiatTableColumns();

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data: tableData ? tableData.data.items : [],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (type?.toLowerCase() !== "fiat" && type?.toLowerCase() !== "crypto") navigate(`/404`);
  if (action?.toLowerCase() !== "withdraw" && action?.toLowerCase() !== "deposit") navigate("/404");

  if (isLoading) return <TransactionsTableSkeleton />;

  return (
    <Flex direction="column">
      <ContainerLayout borders className={classes.headerWrapper} child_bg_color="nord950">
        <Flex justify="space-between" align="center" className={classes.header}>
          <TextView size={16} weight="700" upperCase>
            Last Transactions
          </TextView>
          <Link to={`/transaction-history/${action}`}>
            {allTransactions} <ArrowRightIcon />
          </Link>
        </Flex>
      </ContainerLayout>
      <ContainerLayout border_left border_right border_bottom className={classes.tableLayout}>
        <Flex className="maxWidth" direction="column" gap={24} data-testId="transaction-crypto-table">
          <Table table={table} className={classes.transactionTable} />
        </Flex>
      </ContainerLayout>
    </Flex>
  );
};

export default TransactionsTable;
