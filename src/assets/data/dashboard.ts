import { ConvertIcon, DepositIcon, SendIcon, WithdrawIcon } from "../svg";

export const navigateData = [
  {
    Icon: DepositIcon,
    title: "Deposit",
    href: "/transactions/deposit",
  },
  {
    Icon: WithdrawIcon,
    title: "Withdraw",
    href: "/transactions/withdraw",
  },
  {
    Icon: ConvertIcon,
    title: "Convert",
    href: "/exchange/conversion",
  },
  {
    Icon: SendIcon,
    title: "Send",
    href: "/transactions/send",
  },
];
