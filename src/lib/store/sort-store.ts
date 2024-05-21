import { create } from 'zustand';

interface SortState {
  sort: string | null;
  setSort: (direction: 'desc' | 'asc') => void;
}

export const useSortStore = create<SortState>()((set) => ({
  sort: null,
  setSort: (direction) => set(() => ({ sort: direction })),
}));
