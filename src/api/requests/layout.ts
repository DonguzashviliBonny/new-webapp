import { useQuery } from "@tanstack/react-query";
import { getFooterContentService } from "../service/layout";

export const useFooterContentReq = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["useFooterContentReq"],
    queryFn: () => getFooterContentService(),
    enabled: true,
  });
  return { data: data?.data.data, isLoading, error };
};
