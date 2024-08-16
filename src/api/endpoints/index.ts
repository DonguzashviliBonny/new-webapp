export const endpoints = {
  user: {
    preferences: "user/initial-preferences",
  },
  footer: {
    GetFooterContent: `footer/content`,
  },
};

export const socketUrlMap = {
  notification: "/hubs/alert-notifications",
  orderbook: "/hubs/orderbook",
};
