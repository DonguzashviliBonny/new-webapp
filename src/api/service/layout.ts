import { AxiosResponse } from "axios";
import { endpoints } from "../endpoints";
import { FooterContentResT } from "../types/responses/layout";
import { getAxiosClient } from "../client";

export const getFooterContentService = (): Promise<AxiosResponse<FooterContentResT>> => {
  const { GetFooterContent } = endpoints.footer;
  const httpRequest = getAxiosClient().get(GetFooterContent);
  return httpRequest;
};
