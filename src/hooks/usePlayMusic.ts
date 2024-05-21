import { create } from 'zustand';

interface PlayMusicStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const usePlayMusic = create<PlayMusicStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

export default usePlayMusic;
