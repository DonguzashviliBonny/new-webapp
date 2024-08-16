import { create } from "zustand";
import { preferencesSoreStoreT } from "./types/preferenceStoreT";
import { setCookie } from "@/utils/cookie";

const usePreferencesStore = create<preferencesSoreStoreT>()((set) => ({
  language: "en-US",
  theme: "dark",
  setLanguage: (language) => {
    set(() => ({
      language,
    }));
    setCookie("language", language);
    document.documentElement.setAttribute("lang", language);
  },
  setTheme: (theme) => {
    set(() => ({
      theme,
    }));
    setCookie("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  },
}));

export default usePreferencesStore;
