import { useQuery } from "@tanstack/react-query";

// ** services
import { getUserInitialPreferences } from "../service/user";

export const useUserInitialPreferencesReq = (token: string) => {
  const data = useQuery({
    queryKey: ["useUserInitialPreferencesReq", token],
    queryFn: () => getUserInitialPreferences(token),
    enabled: !!token,
  });
  const response = { ...data, data: data.data?.data };
  return response;
};
