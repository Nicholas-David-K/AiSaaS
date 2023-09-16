import { create } from 'zustand';

type useProModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useProModal = create<useProModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useProModal;
