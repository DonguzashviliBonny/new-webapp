export type VerificationDataT = {
  readonly userId: string;
  readonly publicId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
  readonly avatarUrl: string;
  readonly verificationLevel: {
    readonly id: number;
    readonly name: string;
  };
};

export type PaymentMolDataT = {
  readonly bankAccounts: {
    readonly id: string;
    readonly iban: string;
    readonly swift: string;
    readonly mobileBankAddress: string;
    readonly receiverName: string;
    readonly bankName: string;
    readonly logoUri: string;
  }[];
  readonly creditCards: {
    readonly maskedNumber: string;
    readonly nickname: string;
    readonly type: string;
    readonly id: string;
    readonly expiryDate: string;
    readonly logoUri: string;
  }[];
};

export type SecurityDataT = {
  readonly email: string;
  readonly phoneNumber: string;
  readonly authenticatorApp: boolean;
};

export type VerificationT = {
  readonly id: number;
  readonly requiredActions: string[];
  readonly name: string;
  readonly limits: LimitsT[];
};

export type LimitsT = {
  readonly id: number;
  readonly amount: number;
  readonly type: "FiatDeposit" | "FiatWithdrawal" | "CryptoDeposit" | "CryptoWithdrawal" | "P2PTransaction";
};
