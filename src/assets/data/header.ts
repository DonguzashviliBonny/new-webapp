import {
  DashboardIcon,
  AccountIcon,
  TransactionHistoryIcon,
  SpotTradingIcon,
  LineChartIcon,
  ConvertIcon,
  CurrencyIcon,
  EducationIcon,
  SignOutIcon,
} from "@/assets/svg";

const landing = import.meta.env.VITE_BASE_LANDING_APP_URL;

export const headerLinks = {
  links: [
    { label: "Buy Crypto", to: "/exchange/buy-crypto" },
    {
      label: "Market",
      to: `${landing}/markets`,
    },
    { label: "Spot Trading", to: "/trade/spot-trading" },
    { label: "Convert", to: "/exchange/conversion" },
    {
      label: "Education",
      to: `${landing}/education`,
    },
  ],
};

export const burgerMenuLoggedInData = [
  {
    title: "Dashboard",
    Icon: DashboardIcon,
    link: "/",
  },
  {
    title: "Account",
    Icon: AccountIcon,
    link: "/dashboard/settings",
  },
  {
    title: "Transaction History",
    Icon: TransactionHistoryIcon,
    link: "/transaction-history",
  },
  {
    title: "Buy Crypto",
    Icon: CurrencyIcon,
    link: "/exchange/buy-crypto",
  },
  {
    title: "Market",
    Icon: LineChartIcon,
    link: `${landing}/markets`,
  },
  {
    title: "Spot Trading",
    Icon: SpotTradingIcon,
    link: "/trade/spot-trading",
  },
  {
    title: "Convert",
    Icon: ConvertIcon,
    link: "/exchange/conversion",
  },
  {
    title: "Education",
    Icon: EducationIcon,
    link: `${landing}/education`,
  },
  {
    title: "Log Out",
    Icon: SignOutIcon,
    link: "",
  },
];

export const burgerMenuLoggedOutData = [
  {
    title: "Buy Crypto",
    Icon: CurrencyIcon,
    link: "/exchange/buy-crypto",
  },
  {
    title: "Market",
    Icon: LineChartIcon,
    link: `${landing}/markets`,
  },
  {
    title: "Spot Trading",
    Icon: SpotTradingIcon,
    link: "/trade/spot-trading",
  },
  {
    title: "Convert",
    Icon: ConvertIcon,
    link: "/exchange/conversion",
  },
  {
    title: "Education",
    Icon: EducationIcon,
    link: `${landing}/education`,
  },
];
