import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { lazy, ReactNode, Suspense, useEffect, useState } from "react";
import { getOidc, useOidc } from "@/oidc/oidc";

// ** components
import AppLayout from "../components/layout/app/AppLayout";
import Loader from "@/components/reusables/loader/Loader";
import WithdrawCrypto from "@/containers/transactions/components/withdraw/withdrawCrypto/WithdrawCrypto";
import TransactionTabsLayout from "@/components/layout/transactions/components/TransactionTabs";

// ** lazy loads
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Settings = lazy(() => import("@/pages/Settings"));
const Transactions = lazy(() => import("@/containers/transactions/Transactions"));
const DepositCrypto = lazy(() => import("@/containers/transactions/components/deposit/depositCrypto/DepositCrypto"));
const WithdrawConfirm = lazy(
  () => import("@/containers/transactions/components/withdraw/WithdrawConfirm/WithdrawConfirm")
);

export const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<ProtectedRoute children={<AppLayout />} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {/* ** Transactions */}
          <Route path="transactions" element={<Transactions />}>
            <Route path="send" element={<>send</>}>
              <Route path=":id" element={<>send id</>} />
            </Route>

            <Route path="withdraw/crypto/confirm/:id" element={<WithdrawConfirm />} />

            <Route path="withdraw" element={<TransactionTabsLayout />}>
              <Route path="crypto/:currency" element={<WithdrawCrypto />} />
              <Route path="fiat/:currency" element={<>withdraw/fiat</>} />
            </Route>

            <Route path="deposit" element={<TransactionTabsLayout />}>
              <Route path="crypto/:currency" element={<DepositCrypto />} />
              <Route path="fiat/:currency" element={<>deposit/fiat</>} />
            </Route>

            <Route path="withdraw/fiat/:currency" element={<>withdraw/fiat</>}>
              <Route path=":id" element={<>transaction overview</>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { login } = useOidc();

  useEffect(() => {
    (async () => {
      const oidc = await getOidc();

      if (!oidc.isUserLoggedIn && login) {
        await login({ doesCurrentHrefRequiresAuth: true });
      } else {
        setIsLoading(false);
      }
    })();
  }, [location, navigate]);

  if (isLoading) {
    return <>loader.....</>;
  }

  return children;
};
