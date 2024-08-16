export type PreferencesDataT = {
  language: {
    id: number;
    code: string;
    name: string;
    logoUrl: string;
  };
  currency: {
    id: number;
    code: string;
    name: string;
    logoUrl: string;
  };
  theme: {
    id: number;
    name: "Dark Mode" | "Light Mode";
  };
  notification: boolean;
};
