import { PaymentMolDataT, SecurityDataT, VerificationDataT, VerificationT } from "@/types";

export type PreferencesResT = {
  readonly data: {
    readonly language: {
      readonly id: number;
      readonly code: string;
      readonly name: string;
      readonly logoUrl: string;
    };
    readonly currency: {
      readonly id: number;
      readonly code: string;
      readonly name: string;
      readonly logoUrl: string;
    };
    readonly theme: {
      readonly id: number;
      readonly name: "Dark Mode" | "Light Mode";
    };
    readonly notification: boolean;
  };
};

export type userInformationResT = {
  readonly data: {
    readonly verification: VerificationDataT;
    readonly payment: PaymentMolDataT;
    readonly preferences: PreferencesResT;
    readonly security: SecurityDataT;
    readonly accounts: [];
  };
};

export type VerificationLevelResT = {
  readonly data: {
    readonly userVerificationLevelId: 1 | 2 | 3;
    readonly verificationLevels: VerificationT[];
  };
};
