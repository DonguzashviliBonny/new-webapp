import { withdrawTransactionT } from "@/types/components/transactions/transactionTypes";

export type transactionStoreT = {
  withdrawCryptoData: withdrawTransactionT | null;
  setWithdrawCryptoData: (data: withdrawTransactionT) => void;
};
