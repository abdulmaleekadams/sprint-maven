import { create } from "zustand";

type ToolbarModalStore = {
  type?: string;
  isOpen: boolean;
  onOpen: (type: string) => void;
  onClose: () => void;
};

export const useToolbarModal = create<ToolbarModalStore>((set) => ({
  type: undefined,
  isOpen: false,
  onOpen: (type: string) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: undefined }),
}));
