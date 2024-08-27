export const endpoints = {
  user: {
    GetInformation: "user",
    GetPreferences: "user/initial-preferences",
    GetSettingsVerificationLevel: "user/verification-levels",
  },
  dashboard: {
    GetDashboardProfile: "dashboard/profile",
    GetDashboardAssets: "dashboard/my-assets",
    GetDashboardAnnouncements: "dashboard/announcements",
  },
  transactions: {
    GetTransactionFaq: (action: string, type: string) => `${action}/${type}/faq`,
    GetTransactionTable: (action: string, type: string) => `${type}/${action}/transactions`,
    GetTransactionAssets: (action: string, type: string) => `${type}/${action}/assets`,
    GetNetworks: (network: string) => `crypto/networks/${network}`,
    PostGetDepositAddress: (network: string) => `crypto/deposit/addresses/${network}`,
    PostWithdraw: "crypto/withdraw",
    PostConfirmWithdraw: "crypto/withdraw/confirm",
  },
  footer: {
    GetFooterContent: `footer/content`,
  },
};

export const socketUrlMap = {
  notification: "/hubs/alert-notifications",
  orderbook: "/hubs/orderbook",
};
