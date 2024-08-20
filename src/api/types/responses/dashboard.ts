import { PaginationI, StrapiT } from "@/types/common";
import { DashboardAssetI, PieChartI, PortfolioChartI } from "@/types/components/dashboard/dashboardProps";

export interface DashboardHeaderDetailsResT {
  readonly data?: {
    readonly portfolioDetails: {
      readonly totalBalance: {
        readonly fiatBalance: number;
        readonly cryptoBalance: number;
      };
      readonly pieChart: PieChartI;
      readonly portfolioChart: PortfolioChartI[];
    };
    readonly publicId: number;
    readonly avatarUri: string;
    readonly userName: string;
  };
}

export interface GetDashboardAssetsResT extends PaginationI {
  readonly data: DashboardAssetsRes;
}

export interface DashboardAssetsRes extends PaginationI {
  readonly items: DashboardAssetI[];
}

export interface GetDashboardAnnouncementsResI {
  readonly data?: StrapiT<{
    readonly Title: string;
    readonly Description: string;
    readonly publishedAt: string;
    readonly ReadingTime: number;
    readonly tags: {
      readonly data: StrapiT<{ Name: string }>[];
    };
    readonly Body: string;
  }>[];
}
