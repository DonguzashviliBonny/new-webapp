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
  footer: {
    GetFooterContent: `footer/content`,
  },
};

export const socketUrlMap = {
  notification: "/hubs/alert-notifications",
  orderbook: "/hubs/orderbook",
};
