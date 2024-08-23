import { useQuery } from "@tanstack/react-query";
import {
  getCryptoAddressService,
  getCryptoNetworksService,
  getTransactionAssetService,
  GetTransactionFaqService,
  getTransactionTableService,
} from "../service/transactions";
import { GetTransactionTableReqT } from "../types/requests/transaction";
import { AxiosError, AxiosResponse } from "axios";
import { GetDepositCryptoAddress } from "../types/responses/transactions";

export const useTransactionFaqReq = (token: string, type: string, action: string) => {
  const response = useQuery({
    queryKey: ["useTransactionFaqReq", `${action}-${type}`],
    queryFn: () => GetTransactionFaqService({ token, type, action }),
    enabled: !!token,
  });
  return response;
};

export const useTransactionTableReq = ({ token, type, action, pagination }: GetTransactionTableReqT) => {
  const { data, ...rest } = useQuery({
    queryKey: ["useTransactionTableReq", `${action}-${type}`],
    queryFn: () => getTransactionTableService({ token, type, action, pagination }),
    enabled: !!token,
  });
  return { data: data?.data, ...rest };
};

export const useTransactionAssetReq = (token: string, type: string, action: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["useDepositCryptoReq", token],
    queryFn: () => getTransactionAssetService({ token, type, action }),
  });

  return { data: data?.data, ...rest };
};

export const useCryptoNetworksReq = (token: string, asset: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["useCryptoNetworksReq", `${token}-${asset}`],
    queryFn: () => getCryptoNetworksService(token, asset),
    enabled: !!asset,
  });

  return { data: data?.data, ...rest };
};

export const useCryptoAddressReq = (
  token: string,
  network: string,
  method: "get" | "post" = "get",
  confirm?: boolean
) => {
  const { data, ...rest } = useQuery<AxiosResponse<GetDepositCryptoAddress>, { response: AxiosError }>({
    queryKey: ["useCryptoAddressReq", network, method],
    queryFn: () => getCryptoAddressService(token, network, method),
    enabled: method === "post" ? confirm : !!network,
  });

  return { data: data?.data, ...rest };
};
