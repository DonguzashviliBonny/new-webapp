import { useTransactionFaqReq } from "@/api/requests/transactions";
import TransactionLayout from "@/components/layout/transactions/TransactionsLayout";
import { useOidc } from "@/oidc/oidc";
import { Outlet, useParams } from "react-router-dom";

const staticData = {
  deposit: {
    crypto: {
      title: "Deposit",
      subtitle: "Experience seamless transactions with our secure process.",
    },
    fiat: {
      title: "Deposit",
      subtitle: "Experience seamless transactions with our secure process.",
    },
  },
  withdraw: {
    crypto: {
      title: "Withdraw",
      subtitle: "Experience seamless transactions with our secure process.",
    },
    fiat: {
      title: "Withdraw",
      subtitle: "Experience seamless transactions with our secure process.",
    },
  },
};

const Transactions = () => {
  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });
  const { action, type } = useParams();

  const { data: faqData } = useTransactionFaqReq(oidcTokens.accessToken, action as string, type as string);

  return (
    <TransactionLayout
      title={action as string}
      subtitle="Experience seamless transactions with our secure process."
      cryptoFaqData={faqData?.data}
    >
      <Outlet />
    </TransactionLayout>
  );
};

export default Transactions;
