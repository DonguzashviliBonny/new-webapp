import { useQuery } from "@tanstack/react-query";

// ** services
import {
  getUserInformationService,
  getUserInitialPreferencesService,
  getUserSettingsVerificationLevelService,
} from "../service/user";

export const useUserInitialPreferencesReq = (token: string) => {
  const data = useQuery({
    queryKey: ["useUserInitialPreferencesReq", token],
    queryFn: () => getUserInitialPreferencesService(token),
    enabled: !!token,
  });
  const response = { ...data, data: data.data?.data };
  return response;
};

export const useUserInformationReq = (token: string) => {
  const data = useQuery({
    queryKey: ["useUserInformationReq", token],
    queryFn: () => getUserInformationService(token),
    enabled: !!token,
  });
  const response = { ...data, data: data.data?.data.data };
  return response;
};

export const useUserSettingsVerificationLevelReq = (token: string) => {
  const data = useQuery({
    queryKey: ["useUserSettingsVerificationLevelReq", token],
    queryFn: () => getUserSettingsVerificationLevelService(token),
    enabled: !!token,
  });
  const response = { ...data, data: data.data?.data.data };
  return response;
};
