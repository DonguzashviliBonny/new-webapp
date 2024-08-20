import { BalanceI, sortT, StrapiT } from "../../common";

export interface DashboardAssetI {
  readonly rank: number;
  readonly code: string;
  readonly quoteAssetCode: string;
  readonly name: string;
  readonly balance: number;
  readonly quoteBalance: number;
  readonly logoUrl: string;
  readonly price: number;
  readonly percentChange_24h: number;
  readonly volume_24h: string;
  readonly marketCap: string;
}

export interface PieChartI {
  readonly top: {
    readonly asset: string;
    readonly balance: number;
    readonly percentage: number;
  }[];

  readonly other: {
    readonly percentage: number;
    readonly balance: number;
  };
}

export interface PortfolioChartI {
  readonly date: string;
  readonly balance: number;
}

export type DashboardHeaderProps = {
  readonly estBalance?: BalanceI;
  readonly cryptoAsset: string;
  readonly handleHide: () => void;
  readonly hide: boolean;
  readonly userDetails: { readonly avatarUri: string; readonly userName: string; readonly publicId: number | null };
};

export type DashboardPortfolioProps = {
  readonly hovered: number | null;
  readonly setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  readonly lineChartData?: { time: string; value: number }[];
  readonly pieChartData?: pieChartDataType[];
  readonly handleMouseOver: (_: React.MouseEvent<Element, MouseEvent>, id: number) => void;
};

export type lineChartDataType = {
  readonly time: string;
  readonly value: number;
};

export type pieChartDataType = {
  readonly balance: number;
  readonly asset: string;
};

export type DonutChartProps = {
  readonly hovered: number | null;
  readonly setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  readonly handleMouseOver: (mouseover: React.MouseEvent<Element, MouseEvent>, dataIndex: number) => void;
  readonly data: pieChartDataType[] | null;
};

export type LineChartProps = {
  readonly data: { readonly time: string; readonly value: number }[];
  readonly bgColor?: string;
};

export type ClickedColumnsT = {
  readonly name: number;
  readonly rank: number;
  readonly quoteBalance: number;
  readonly price: number;
  readonly percentChange_24h: number;
  readonly volume_24h: number;
  readonly marketCap: number;
};

export type DashboardAssetsUIProps<T> = {
  readonly tableData?: T[];
  readonly value: string;
  readonly debouncedValue?: string;
  readonly open?: boolean;
  readonly sortObj: sortT | undefined;
  readonly setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  readonly handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleColumnSort: (e: keyof ClickedColumnsT) => void;
  readonly hide: string[];
  readonly setHide: (data: string[]) => void;
  readonly handleHide: (id: string) => void;
};

export type DashboardAssetsColumnsProps = {
  readonly setHide: (data: string[]) => void;
  readonly hide: string[];
  readonly sortObj: sortT | undefined;
  readonly handleColumnSort: (e: keyof ClickedColumnsT) => void;
  readonly handleHide: (id: string) => void;
  readonly tableData: DashboardTableDataT[];
};

export type TableTitleProps = {
  readonly tableData: DashboardTableDataT[];
  readonly setHide: (state: string[]) => void;
  readonly hide: string[];
  readonly setHoldingsSort?: (state: boolean) => void;
};

export type DashboardTableDataT = {
  actions: string[];
} & DashboardAssetI;

export type HoldingsColumnProps = {
  readonly id: string;
  readonly balance: string;
  readonly quoteBalance: string;
  readonly onClick: () => void;
  readonly hide: string[];
};

export type DashboardAnnouncementsProps = {
  announcementsData?: AnnouncementDataT[];
};

export type AnnouncementDataT = StrapiT<{
  Title: string;
  Description: string;
  publishedAt: string;
  ReadingTime: number;
  tags: {
    data: StrapiT<{ Name: string }>[];
  };
  Body: string;
}>;
