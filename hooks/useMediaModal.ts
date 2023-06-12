import { movieProps, serieProps } from '@/types/types';
import {create} from 'zustand';

interface MediaModalStore {
    isOpen?: boolean;
    onOpen: () => void;
    onClose: () => void;
    setMedia: (media:movieProps |serieProps | undefined) => void;
    media: movieProps | serieProps | undefined
};

const useMediaModal = create<MediaModalStore>((set) => ({
    media: undefined,
    isOpen: false,
    setMedia: (media) => set({media:media}),
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false}),
}))

export default useMediaModal
