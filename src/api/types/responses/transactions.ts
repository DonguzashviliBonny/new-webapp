import { AddressI, NetworksT, PaginationI, StatusT } from "@/types";
import { GetCryptoFaqData } from "@/types/components/layout/layoutTypes";
import { withdrawTransactionT, transactionAssetType } from "@/types/components/transactions/transactionTypes";

export type GetTransactionsFaqResT = GetCryptoFaqData;

export type GetTransactionsTableResT = {
  readonly data: GetTransactionsCryptoTableResI | GetTransactionsFiatTableResI;
};

export interface GetTransactionsCryptoTableResI extends PaginationI {
  readonly items: {
    readonly address: string;
    readonly amount: number;
    readonly asset: string;
    readonly date: Date;
    readonly id: string;
    readonly status: StatusT;
    readonly transactionId?: string;
    readonly type: "Withdraw" | "Deposit";
  }[];
}

export interface GetTransactionsFiatTableResI extends PaginationI {
  readonly items: {
    readonly amount: number;
    readonly currency: string;
    readonly date: Date;
    readonly paymentMethod: string;
    readonly status: StatusT;
    readonly transactionId?: string;
  }[];
}

export interface getTransactionAssetResI {
  readonly data: transactionAssetType[];
}

export interface getCryptoNetworksResI {
  readonly data: NetworksT[];
}

export interface GetDepositCryptoAddressResI {
  readonly data: AddressI;
}

export interface PostWithdrawCryptoResI {
  readonly data: withdrawTransactionT;
}
