import { create } from "zustand";

import usePreferencesStore from "./preferencesStore";

const useGlobalStore = create(() => ({
  ...usePreferencesStore,
}));

export default useGlobalStore;
