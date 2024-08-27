import { getTransactionAssetResI } from "@/api/types/responses/transactions";
import { StatusT } from "@/types/common";

export type StatusColumnProps = {
  status: StatusT | undefined;
};

export type TransactionTabsOutletContextType = {
  readonly token: string;
  readonly action: string;
  readonly asset: string;
  readonly type: string;
  readonly assets: {
    readonly loading: boolean;
    readonly data: getTransactionAssetResI;
  };
};

export type transactionAssetType = {
  readonly balance?: number;
  readonly code: string;
  readonly displayDecimalPoints: number;
  readonly name: string;
  readonly logoUrl: string;
};

export type withdrawTransactionT = {
  readonly asset: string;
  readonly address: string;
  readonly network: string;
  readonly amount: number;
  readonly rate: number;
  readonly fee: number;
  readonly displayDecimalPoints: number;
};
