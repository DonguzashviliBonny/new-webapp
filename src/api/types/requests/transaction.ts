import { QueryPaginationI } from "@/types";

export type GetTransactionTableReqT = {
  readonly pagination?: QueryPaginationI;
  readonly token: string;
  readonly type: string;
  readonly action: string;
};

export type GetTransactionFaqReqT = {
  readonly token: string;
  readonly type: string;
  readonly action: string;
};

export type PostWithdrawReqT = {
  readonly network: string;
  readonly asset: string;
  readonly address: string;
  readonly amount: number;
};
