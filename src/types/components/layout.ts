import { StrapiT, StrapiImageT } from "../common";

export interface AuthenticatedFooterProps {
  data: StrapiT<{ Name: string; Image: StrapiImageT }>[];
}

export type footerChannelsT = {
  readonly id: number;
  readonly attributes: {
    readonly Image: {
      readonly data: {
        readonly attributes: {
          readonly name: string;
          readonly url: string;
          readonly height: number;
          readonly width: number;
        };
      };
    };
  };
};

export type footerCertificatesT = {
  readonly id: number;
  readonly attributes: {
    readonly Name: string;
    readonly Image: {
      readonly data: {
        readonly attributes: {
          readonly name: string;
          readonly url: string;
          readonly height: number;
          readonly width: number;
        };
      };
    };
  };
};
