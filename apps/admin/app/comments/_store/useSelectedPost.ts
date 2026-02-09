import { create } from 'zustand';
import { PostData } from '@/app/posts/_models/posts';

interface UseSelectedPostStore {
  selectedPost: PostData | null;
  setSelectedPost: (selectedPost: PostData) => void;
}

export const useSelectedPost = create<UseSelectedPostStore>((set) => ({
  selectedPost: null,
  setSelectedPost: (selectedPost: PostData) => set({ selectedPost }),
}));