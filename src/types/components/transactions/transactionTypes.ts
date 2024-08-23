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
