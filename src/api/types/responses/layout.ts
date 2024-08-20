import { footerCertificatesT, footerChannelsT } from "@/types";

export interface FooterContentResT {
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
