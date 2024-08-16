import { AxiosResponse } from "axios";
import { endpoints } from "../endpoints";
import { FooterContentT } from "../types/layout";
import { getAxiosClient } from "../client";

export const getFooterContentService = (): Promise<AxiosResponse<FooterContentT>> => {
  const { GetFooterContent } = endpoints.footer;
  const httpRequest = getAxiosClient().get(GetFooterContent);
  return httpRequest;
};
