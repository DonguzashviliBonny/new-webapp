import { useOidc } from "@/oidc/oidc";
import { Router } from "@/router/router";
import usePreferencesStore from "@/store/preferencesStore";
import { getCookie } from "@/utils/cookie";
import { ThemeT } from "@/types/common";
import { useUserInitialPreferencesReq } from "./api/requests/user";
import { useCallback, useEffect } from "react";

function App() {
  const { setTheme, setLanguage } = usePreferencesStore();
  const { oidcTokens } = useOidc();
  const cookieTheme = getCookie("theme");
  const cookieLanguage = getCookie("language");

  const { data: userPreferences } = useUserInitialPreferencesReq(oidcTokens ? oidcTokens.accessToken : "");

  const setSystemPreferenceTheme = useCallback(() => {
    const systemTheme: ThemeT =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark Mode" : "Light Mode";
    setTheme(systemTheme);
  }, [setTheme]);

  useEffect(() => {
    if (!cookieTheme) setSystemPreferenceTheme();
    else setTheme(cookieTheme as ThemeT);

    if (!cookieLanguage) setLanguage("en-US");
    else setLanguage(cookieLanguage);

    if (!userPreferences?.data) return;
    const { theme, language } = userPreferences.data;

    if (theme.name !== cookieTheme) setTheme(theme.name);
    if (language.code !== cookieLanguage) setLanguage(language.code);
  }, [cookieTheme, cookieLanguage, setLanguage, setSystemPreferenceTheme, setTheme, userPreferences]);

  return <Router />;
}

export default App;
