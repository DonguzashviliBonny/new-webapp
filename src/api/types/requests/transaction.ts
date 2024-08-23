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
