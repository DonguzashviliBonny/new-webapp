import { useQuery } from "@tanstack/react-query";
import { GetTransactionFaqService } from "../service/transactions";

export const useTransactionFaqReq = (token: string, type: string, action: string) => {
  const response = useQuery({
    queryKey: ["useTransactionFaqReq", `${action}-${type}`],
    queryFn: () => GetTransactionFaqService(token, type, action),
    enabled: !!token,
  });
  return response;
};
