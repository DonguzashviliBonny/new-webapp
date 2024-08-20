import { AxiosResponse } from "axios";
import { getAxiosClient } from "../client";
import { endpoints } from "../endpoints";

// ** types
import { PreferencesResT, userInformationResT, VerificationLevelResT } from "../types/responses/user";

export const getUserInitialPreferencesService = (token: string): Promise<AxiosResponse<PreferencesResT>> => {
  const { GetPreferences } = endpoints.user;
  const httpRequest = getAxiosClient(token).get(GetPreferences);
  return httpRequest;
};

export const getUserInformationService = (token: string): Promise<AxiosResponse<userInformationResT>> => {
  const { GetInformation } = endpoints.user;
  const httpRequest = getAxiosClient(token).get(GetInformation);
  return httpRequest;
};

export const getUserSettingsVerificationLevelService = (
  token: string
): Promise<AxiosResponse<VerificationLevelResT>> => {
  const { GetSettingsVerificationLevel } = endpoints.user;
  const httpRequest = getAxiosClient(token).get(GetSettingsVerificationLevel);
  return httpRequest;
};
