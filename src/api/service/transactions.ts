import customParamsSerializer from "@/utils/format/customSerializer";
import { axiosPrivateGateWay } from "../client";
import { endpoints } from "../endpoints";
import { GetTransactionFaqReqT, GetTransactionTableReqT, PostWithdrawReqT } from "../types/requests/transaction";
import { AxiosResponse } from "axios";
import {
  getCryptoNetworksResI,
  GetDepositCryptoAddressResI,
  getTransactionAssetResI,
  GetTransactionsFaqResT,
  GetTransactionsTableResT,
  PostWithdrawCryptoResI,
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
): Promise<AxiosResponse<GetDepositCryptoAddressResI>> => {
  const { PostGetDepositAddress } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token)[method](PostGetDepositAddress(network));
  return httpRequest;
};

export const postWithdrawCryptoService = (
  token: string,
  data: PostWithdrawReqT
): Promise<AxiosResponse<PostWithdrawCryptoResI>> => {
  const { PostWithdraw } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token).post(PostWithdraw, data);
  return httpRequest;
};

export const postWithdrawConfirmService = (
  token: string,
  data: PostWithdrawReqT
): Promise<AxiosResponse<PostWithdrawCryptoResI>> => {
  const { PostConfirmWithdraw } = endpoints.transactions;
  const httpRequest = axiosPrivateGateWay(token).post(PostConfirmWithdraw, data);
  return httpRequest;
};
