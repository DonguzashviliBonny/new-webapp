import { HubConnection } from "@microsoft/signalr";

export type ThemeT = "Dark Mode" | "Light Mode";

export type StrapiImageT = {
  readonly data: {
    readonly attributes: {
      readonly name: string;
      readonly url: string;
      readonly height: number;
      readonly width: number;
    };
  };
};

export type StrapiT<T> = {
  readonly id: number;
  readonly attributes: T;
};

export interface SocketUrlMap {
  readonly notification: string;
  readonly orderbook: string;
}

export type SignalrHookT = (url: keyof SocketUrlMap, token?: string, testEnv?: string) => HubConnection | null;

export interface PaginationI {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface QueryPaginationI {
  readonly Search?: string;
  readonly PageNumber?: number;
  readonly PageSize?: number;
  readonly SortColumn?: string;
  readonly SortOrder?: string;
}

export type sortT = {
  readonly key: string;
  readonly sort: "asc" | "desc";
};

export interface BalanceI {
  readonly fiatBalance: number;
  readonly cryptoBalance: number;
}

export interface ArticleBorderT {
  border_bottom?: "transparent" | "nord800";
  border_right?: "transparent" | "nord800";
}

export interface CombinedBlogsI {
  Title: string;
  Description: string;
  Author?: string;
  Body?:
    | {
        type: string;
        children: {
          text: string;
          type: string;
        }[];
      }[]
    | string;
  ReadingTime: number;
  updatedAt?: string;
  publishedAt: string;
  MainImage?: StrapiImageT;
  tags: {
    data: StrapiT<{ Name: string }>[];
  };
}
