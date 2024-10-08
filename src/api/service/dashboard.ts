import { axiosPrivateGateWay, axiosPublicGateway } from "../client";
import { endpoints } from "../endpoints";
import {
  DashboardHeaderDetailsResT,
  GetDashboardAnnouncementsResI,
  GetDashboardAssetsResT,
} from "../types/responses/dashboard";
import { GetDashboardAssetsReqT } from "../types/requests/dashboard";

export const getDashboardDetailsService = async (token: string): Promise<DashboardHeaderDetailsResT> => {
  const { GetDashboardProfile } = endpoints.dashboard;
  const { data } = await axiosPrivateGateWay(token).get<DashboardHeaderDetailsResT>(GetDashboardProfile);
  return data;
};

export const getDashboardAssetsService = async ({
  token,
  params,
}: GetDashboardAssetsReqT): Promise<GetDashboardAssetsResT> => {
  const { data } = await axiosPrivateGateWay(token).get<GetDashboardAssetsResT>(
    endpoints.dashboard.GetDashboardAssets,
    {
      params,
    }
  );
  return data;
};

export const getDashboardAnnouncementsService = async (): Promise<GetDashboardAnnouncementsResI> => {
  const { data } = await axiosPublicGateway.get<GetDashboardAnnouncementsResI>(
    endpoints.dashboard.GetDashboardAnnouncements
  );
  return data;
};
