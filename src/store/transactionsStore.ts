import { create } from "zustand";
import { transactionStoreT } from "./types/transactionStoreT";

const useTransactionsStore = create<transactionStoreT>()((set) => ({
  withdrawCryptoData: null,
  setWithdrawCryptoData: (data) => set({ withdrawCryptoData: data }),
}));

export default useTransactionsStore;
