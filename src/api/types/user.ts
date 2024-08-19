export type PreferencesDataT = {
  readonly data: {
    readonly language: {
      readonly id: number;
      readonly code: string;
      readonly name: string;
      readonly logoUrl: string;
    };
    readonly currency: {
      readonly id: number;
      readonly code: string;
      readonly name: string;
      readonly logoUrl: string;
    };
    readonly theme: {
      readonly id: number;
      readonly name: "Dark Mode" | "Light Mode";
    };
    readonly notification: boolean;
  };
};
