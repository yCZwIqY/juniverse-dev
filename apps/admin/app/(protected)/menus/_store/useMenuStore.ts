import { create } from 'zustand';
import { MenuData, SelectedMenuData } from 'apis';

const defaultSelectedMenuData: SelectedMenuData = {
  id: 0,
  depth: 0,
  seqNo: 0,
  name: '',
  children: [],
  parent: undefined,
};

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
