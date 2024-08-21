import { axiosPrivateGateWay } from "../client";

export const GetTransactionFaqService = (token: string, type: string, action: string) => {
  const httpRequest = axiosPrivateGateWay(token).get(`${action}/${type}/faq`);
  return httpRequest;
};
