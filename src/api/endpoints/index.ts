export const endpoints = {
  user: {
    preferences: "user/initial-preferences",
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
