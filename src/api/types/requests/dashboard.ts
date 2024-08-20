import { QueryPaginationI } from "@/types";

export type GetDashboardAssetsReqT = {
  readonly token: string;
  readonly params: QueryPaginationI;
};
