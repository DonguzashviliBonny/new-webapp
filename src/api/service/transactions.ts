import customParamsSerializer from "@/utils/format/customSerializer";
import { axiosPrivateGateWay } from "../client";
import { endpoints } from "../endpoints";
import { GetTransactionFaqReqT, GetTransactionTableReqT } from "../types/requests/transaction";
import { AxiosResponse } from "axios";
import {
  getCryptoNetworksResI,
  GetDepositCryptoAddress,
  getTransactionAssetResI,
  GetTransactionsFaqResT,
  GetTransactionsTableResT,
} from "../types/responses/transactions";

export const GetTransactionFaqService = ({
  token,
  type,
  action,
}: GetTransactionFaqReqT): Promise<AxiosResponse<GetTransactionsFaqResT>> => {
  const { GetTransactionFaq } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token).get(GetTransactionFaq(action, type));
  return httpRequest;
};

export const getTransactionTableService = ({
  token,
  type,
  action,
  pagination,
}: GetTransactionTableReqT): Promise<AxiosResponse<GetTransactionsTableResT>> => {
  const { GetTransactionTable } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token).get(GetTransactionTable(action, type), {
    params: pagination,
    paramsSerializer: (params) => {
      return customParamsSerializer(params);
    },
  });
  return httpRequest;
};

export const getTransactionAssetService = ({
  action,
  token,
  type,
}: GetTransactionFaqReqT): Promise<AxiosResponse<getTransactionAssetResI>> => {
  const { GetTransactionAssets } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token).get(GetTransactionAssets(action, type));
  return httpRequest;
};

export const getCryptoNetworksService = (
  token: string,
  asset: string
): Promise<AxiosResponse<getCryptoNetworksResI>> => {
  const { GetNetworks } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token).get(GetNetworks(asset.toUpperCase()));
  return httpRequest;
};

export const getCryptoAddressService = (
  token: string,
  network: string,
  method: "get" | "post"
): Promise<AxiosResponse<GetDepositCryptoAddress>> => {
  const { PostGetDepositAddress } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token)[method](PostGetDepositAddress(network));
  return httpRequest;
};
