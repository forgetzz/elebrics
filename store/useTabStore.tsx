// src/store/tabStore.ts
import { create } from "zustand";
import { TabKey } from "@/constant/Tabkey";

interface TabStore {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
