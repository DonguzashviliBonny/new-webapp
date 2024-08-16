import { AxiosResponse } from "axios";
import { getAxiosClient } from "../client";
import { endpoints } from "../endpoints";

// ** types
import { PreferencesDataT } from "../types/user";

export const getUserInitialPreferences = (token: string): Promise<AxiosResponse<PreferencesDataT>> => {
  const { preferences } = endpoints.user;
  const httpRequest = getAxiosClient(token).get(preferences);
  return httpRequest;
};
