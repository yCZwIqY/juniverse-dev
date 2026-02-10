import { create } from 'zustand';
import { defaultSelectedMenuData, MenuData, SelectedMenuData } from 'apis';

interface UseMenuStore {
  selectedMenu?: SelectedMenuData;

  select: (data: MenuData) => void;
  add: (parent: MenuData) => void;
  addRoot: () => void;
}

export const useMenuStore = create<UseMenuStore>((set) => ({
  select: (data: MenuData) => set({ selectedMenu: data }),
  add: (parent: MenuData) =>
    set({
      selectedMenu: {
        ...defaultSelectedMenuData,
        parent,
      },
    }),
  addRoot: () => set({ selectedMenu: { ...defaultSelectedMenuData } }),
}));
