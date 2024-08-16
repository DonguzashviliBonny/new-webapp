import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/app/appLayout";
import { ReactNode, useEffect, useState } from "react";
import { getOidc, useOidc } from "@/oidc/oidc";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<AppLayout />} />} />
    </Routes>
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
