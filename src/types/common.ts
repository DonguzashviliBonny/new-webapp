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
  id: number;
  attributes: T;
};

export interface SocketUrlMap {
  notification: string;
  orderbook: string;
}

export type SignalrHookT = (url: keyof SocketUrlMap, token?: string, testEnv?: string) => HubConnection | null;
