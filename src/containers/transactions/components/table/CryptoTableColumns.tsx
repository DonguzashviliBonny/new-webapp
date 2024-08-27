import {
  AmountColumn,
  DateColumn,
  StatusColumn,
  TableTitle,
  TransactionIdColumn,
  WalletAddressColumn,
} from "@/components/reusables/columns/TableColumns";
import { useResponsive } from "@/hooks";
import { TransactionCryptoHistoryT } from "@/types/components/transactions/transactionProps";
import { createColumnHelper } from "@tanstack/react-table";
import { Flex, TextView } from "nordom-ui";

const CryptoTableColumns = () => {
  const columnHelper = createColumnHelper<TransactionCryptoHistoryT>();

  const columns = [
    columnHelper.accessor("date", {
      header: () => <TableTitle title={"Date"} />,
      cell: ({ row }) => <DateColumn date={row.original.date} />,
    }),
    columnHelper.accessor("asset", {
      header: () => <TableTitle title={"Asset"} />,
      cell: ({ row }) => <TextView size={14}>{row.original.asset}</TextView>,
    }),
    columnHelper.accessor("amount", {
      header: () => <TableTitle title={"Amount"} />,
      cell: ({ row }) => <AmountColumn amount={row.original?.amount ? row.original?.amount : 0} />,
    }),
    columnHelper.accessor("address", {
      header: () => <TableTitle title={"Address"} />,
      cell: ({ row }) => <WalletAddressColumn walletAddress={row.original?.address ? row.original?.address : "0"} />,
    }),
    columnHelper.accessor("transactionId", {
      header: () => <TableTitle title={"Transaction ID"} />,
      cell: ({ row }) => (
        <TransactionIdColumn transactionId={row.original?.transactionId ? row.original?.transactionId : "0"} />
      ),
    }),
    columnHelper.accessor("status", {
      header: () => (
        <Flex justify="center">
          <TableTitle title={"Status"} />
        </Flex>
      ),
      cell: ({ row }) => <StatusColumn status={row.original?.status} />,
    }),
  ];

  const tabletColumns = columns.filter((e: { accessorKey: string }) => e.accessorKey !== "transactionId");
  const mobileColumns = tabletColumns.filter(
    (e: { accessorKey: string }) => e.accessorKey !== "coin" && e.accessorKey !== "amount" && e.accessorKey !== "asset"
  );

  const result = useResponsive({ mobile: mobileColumns, tablet: tabletColumns, laptop: columns });

  return result;
};

export default CryptoTableColumns;
