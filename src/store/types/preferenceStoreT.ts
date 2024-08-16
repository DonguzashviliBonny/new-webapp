export type preferencesSoreStoreT = {
  language: string;
  theme: string;
  setLanguage: (language: string) => void;
  setTheme: (theme: "Dark Mode" | "Light Mode") => void;
};
