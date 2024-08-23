import { StrapiT } from "@/types/common";

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

export type GetCryptoFaqData = {
  readonly data: StrapiT<{
    readonly Title: string;
    readonly Subtitle: string;
    readonly createdAt: string;
    readonly locale: string;
    readonly localizations: {
      readonly data: [];
    };
    readonly publishedAt: string;
    readonly updatedAt: string;
    readonly questions: {
      readonly data: StrapiT<{
        readonly Title: string;
        readonly Subtitle: string;
        readonly createdAt: string;
        readonly locale: string;
        readonly publishedAt: string;
        readonly updatedAt: string;
      }>[];
    };
  }>;
};
