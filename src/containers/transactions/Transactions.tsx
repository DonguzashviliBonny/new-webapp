import { useTransactionFaqReq } from "@/api/requests/transactions";
import TransactionLayout from "@/components/layout/transactions/TransactionsLayout";
import { useOidc } from "@/oidc/oidc";
import { Outlet, useLocation } from "react-router-dom";
import TransactionsTable from "./components/table/TransactionsTable";

const Transactions = () => {
  const location = useLocation();
  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });

  const params = location.pathname
    .split("/")
    .filter((el) => el.length > 0 && !el.toLowerCase().includes("transactions"));

  const [action, type] = params;

  const { data: faqData } = useTransactionFaqReq(oidcTokens.accessToken, action as string, type as string);

  return (
    <>
      <TransactionLayout
        title={action as string}
        subtitle="Experience seamless transactions with our secure process."
        cryptoFaqData={faqData?.data}
      >
        <Outlet />
      </TransactionLayout>
      <TransactionsTable token={oidcTokens.accessToken} action={action} type={type} />
    </>
  );
};

export default Transactions;
