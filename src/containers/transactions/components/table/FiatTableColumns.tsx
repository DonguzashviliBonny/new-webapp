import {
  AmountColumn,
  DateColumn,
  PaymentMethodColumn,
  StatusColumn,
  TableTitle,
  TransactionIdColumn,
} from "@/components/reusables/columns/TableColumns";
import { useResponsive } from "@/hooks";
import { TransactionFiatHistoryT } from "@/types/components/transactions/transactionProps";
import { createColumnHelper } from "@tanstack/react-table";
import { TextView } from "nordom-ui";

const FiatTableColumns = () => {
  const columnHelper = createColumnHelper<TransactionFiatHistoryT>();
  const columns = [
    columnHelper.accessor("date", {
      header: () => <TableTitle title={"Date"} />,
      cell: ({ row }) => <DateColumn date={row.original.date} />,
    }),
    columnHelper.accessor("paymentMethod", {
      header: () => <TableTitle title={"Payment Method"} />,
      cell: ({ row }) => <PaymentMethodColumn paymentMethod={row.original.paymentMethod} />,
    }),
    columnHelper.accessor("currency", {
      header: () => <TableTitle title={"Currency"} />,
      cell: ({ row }) => (
        <TextView size={14} weight="400" color="nord400">
          {row.original.currency}
        </TextView>
      ),
    }),
    columnHelper.accessor("amount", {
      header: () => <TableTitle title={"Amount"} />,
      cell: ({ row }) => {
        // solving mutating side effect
        let amount;
        if (!row.original || !row.original.amount) amount = 0;
        else if (typeof row.original.amount === "number") amount = row.original.amount;
        else amount = row.original.amount.amount;
        return <AmountColumn amount={amount} />;
      },
    }),
    columnHelper.accessor("transactionId", {
      header: () => <TableTitle title={"Transaction ID"} />,
      cell: ({ row }) => (
        <TransactionIdColumn transactionId={row.original?.transactionId ? row.original?.transactionId : "0"} />
      ),
    }),
    columnHelper.accessor("status", {
      header: () => <TableTitle title={"Status"} />,
      cell: ({ row }) => <StatusColumn status={row.original?.status} />,
    }),
  ];
  const tabletColumns = columns.filter((e: { accessorKey: string }) => e.accessorKey !== "transactionId");
  const mobileColumns = tabletColumns.filter(
    (e: { accessorKey: string }) =>
      e.accessorKey !== "coin" && e.accessorKey !== "amount" && e.accessorKey !== "currency"
  );

  const result = useResponsive({ mobile: mobileColumns, tablet: tabletColumns, laptop: columns });
  return result;
};

export default FiatTableColumns;
