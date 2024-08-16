export interface FooterContentT {
  readonly data: {
    readonly attributes: {
      readonly Title: string;
      readonly Subtitle: string;
      readonly TitleSignUp: string;
      readonly TitleSignIn: string;
      readonly TitleChannels: string;
      readonly channels: {
        readonly data: footerChannelsT[];
      };
      readonly certificates: {
        data: footerCertificatesT[];
      };
    };
  };
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
