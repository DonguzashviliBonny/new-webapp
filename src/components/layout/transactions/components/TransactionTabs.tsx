import { Flex, TabsPrimary } from "nordom-ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTransactionAssetReq } from "@/api/requests/transactions";
import { useOidc } from "@/oidc/oidc";

const urlObj = {
  crypto: "fiat",
  fiat: "crypto",
};

const TransactionTabsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });

  const url = location.pathname;
  const [action, type, asset] = url
    .split("/")
    .filter((el) => el.length > 0 && !el.toLowerCase().includes("transactions"));
  const { data, isLoading } = useTransactionAssetReq(oidcTokens.accessToken, type, action);

  const handleTabChange = (key: string) => {
    const oldValue = urlObj[key as keyof typeof urlObj];

    if (oldValue)
      navigate(url.replace(oldValue, key), {
        replace: true,
      });
  };

  return (
    <Flex direction="column" align="stretch" style={{ width: "100%" }}>
      <TabsPrimary
        size="small"
        onChange={handleTabChange}
        active_tab={type}
        tabs={[
          {
            title: "Crypto",
            key: "crypto",
          },
          {
            key: "fiat",
            title: "Fiat",
          },
        ]}
      />
      <Outlet
        context={{
          action,
          type,
          asset,
          token: oidcTokens.accessToken,
          assets: {
            data,
            loading: isLoading,
          },
        }}
      />
    </Flex>
  );
};

export default TransactionTabsLayout;
