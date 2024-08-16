import { useOidc } from "@/oidc/oidc";
import { Router } from "@/router/router";
import usePreferencesStore from "@/store/preferencesStore";
import { getCookie } from "@/utils/cookie";
import { ThemeT } from "@/types/common";
import { useUserInitialPreferencesReq } from "./api/requests/user";

function App() {
  const { setTheme, setLanguage } = usePreferencesStore();
  const { isUserLoggedIn, oidcTokens, login } = useOidc();
  const cookieTheme = getCookie("theme");
  const cookieLanguage = getCookie("language");

  const data = useUserInitialPreferencesReq(oidcTokens ? oidcTokens.accessToken : "");

  const setSystemPreferenceTheme = () => {
    const systemTheme: ThemeT =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark Mode" : "Light Mode";
    setTheme(systemTheme);
  };

  return <Router />;
}

export default App;
