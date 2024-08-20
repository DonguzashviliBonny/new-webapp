import { useQuery } from "@tanstack/react-query";
import {
  DashboardHeaderDetailsResT,
  GetDashboardAnnouncementsResI,
  GetDashboardAssetsResT,
} from "../types/responses/dashboard";
import {
  getDashboardAnnouncementsService,
  getDashboardAssetsService,
  getDashboardDetailsService,
} from "../service/dashboard";
import { QueryPaginationI } from "@/types/common";

export const useDashboardHeaderReq = (token: string) => {
  const { data, isLoading, error, ...rest } = useQuery<DashboardHeaderDetailsResT, Error>({
    queryKey: ["useDashboardHeaderServiceReq"],
    queryFn: () => getDashboardDetailsService(token),
  });
  return { data: data?.data, isLoading, error, rest };
};

export const useDashboardAssetsReq = (token: string, params: QueryPaginationI) => {
  const { data, isLoading, error, ...rest } = useQuery<GetDashboardAssetsResT, Error>({
    queryKey: ["useDashboardAssetsServiceReq", params],
    queryFn: () => getDashboardAssetsService({ token, params }),
  });
  return { data: data?.data, isLoading, error, rest };
};

export const useDashboardAnnouncementsReq = () => {
  return useQuery<GetDashboardAnnouncementsResI, Error>({
    queryKey: ["useDashboardAnnouncementsServiceReq"],
    queryFn: () => getDashboardAnnouncementsService(),
  });
};
