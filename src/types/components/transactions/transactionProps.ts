import { PaymentT, StatusT } from "@/types/common";

export type TransactionCryptoHistoryT = {
  date: Date;
  asset?: string;
  amount?: number;
  address: string;
  transactionId?: string;
  status: StatusT;
};

export type TransactionFiatHistoryT = {
  date: Date;
  paymentMethod: PaymentT;
  currency?: string;
  amount?:
    | {
        currency: string;
        amount: number;
      }
    | number;
  transactionId?: string;
  status: StatusT;
};
