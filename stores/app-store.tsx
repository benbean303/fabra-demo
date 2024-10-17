import { create } from 'zustand';
import { Material } from 'three';

// Import your material definitions
import BlackMaterial from '@/materials/Black';
import GreyMaterial from '@/materials/Grey';
import WhiteMaterial from '@/materials/White';

// Define the structure of each part of the hoodie
interface Sleeve {
  sleeve: Material;
  cuff: Material;
}

interface Arms {
  left: Sleeve;
  right: Sleeve;
}

interface Torso {
  front: Material;
  back: Material;
  band: Material;
  pocket: Material;
}

interface Hoodie {
  torso: Torso;
  arms: Arms;
  hood: Material;
}

interface AppState {
  hoodie: Hoodie;
}

const initialMaterial: Material = WhiteMaterial;

export const useAppStore = create<AppState>((set) => ({
  hoodie: {
    torso: {
      front: initialMaterial,
      back: initialMaterial,
      band: initialMaterial,
      pocket: initialMaterial,
    },
    arms: {
      left: {
        sleeve: initialMaterial,
        cuff: initialMaterial,
      },
      right: {
        sleeve: initialMaterial,
        cuff: initialMaterial,
      },
    },
    hood: initialMaterial,
  },
}));