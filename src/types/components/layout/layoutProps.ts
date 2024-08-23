import { FooterContentResT } from "@/api/types/responses/layout";
import { StrapiImageT, StrapiT } from "@/types/common";
import { footerChannelsT, GetCryptoFaqData } from "./layoutTypes";
import { Dispatch } from "react";

export type FooterUIProps = {
  readonly data: FooterContentResT;
};

export type CommunityChannelsProps = {
  readonly data: footerChannelsT[];
  readonly TitleChannels: string;
};

export interface AuthenticatedFooterProps {
  data: StrapiT<{ Name: string; Image: StrapiImageT }>[];
}

export type MobileHeaderUIProps = {
  data: {
    title: string;
    Icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
      }
    >;
    link: string;
  }[];
  login: () => void;
  logout: () => void;
  isUserLoggedIn: boolean;
};

export type TransactionLayoutProps = {
  children: React.ReactNode;
  cryptoFaqData?: GetCryptoFaqData;
  title: string;
  subtitle: string;
};

export type TransactionFaqDrawerProps = {
  cryptoFaqData?: GetCryptoFaqData;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};
