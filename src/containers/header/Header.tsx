import HeaderUI from "@/components/header/HeaderUI";
import { useOidc } from "@/oidc/oidc";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import UnAuthentificatedHeader from "./components/UnAuthenticatedHeader";
import { burgerMenuLoggedInData, burgerMenuLoggedOutData } from "@/assets/data/header";
import MobileHeaderUI from "@/components/header/components/MobileHeaderUI/MobileHeaderUI";

const Header = () => {
  const { oidcTokens, logout, login, isUserLoggedIn } = useOidc();

  const authHandler = (registration?: boolean) => {
    if (!login) return;
    login({ doesCurrentHrefRequiresAuth: true, extraQueryParams: { goto_registration: `${!!registration}` } });
  };

  const logoutHandler = () => {
    if (!logout) return;
    logout({ redirectTo: "home" });
  };

  const mobileData = isUserLoggedIn ? burgerMenuLoggedInData : burgerMenuLoggedOutData;

  return (
    <HeaderUI>
      {oidcTokens?.accessToken ? (
        <AuthenticatedHeader token={oidcTokens.accessToken} />
      ) : (
        <UnAuthentificatedHeader login={authHandler} signUp={() => authHandler(true)} />
      )}
      <MobileHeaderUI login={authHandler} logout={logoutHandler} data={mobileData} isUserLoggedIn={isUserLoggedIn} />
    </HeaderUI>
  );
};

export default Header;
