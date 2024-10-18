import { create } from 'zustand';
import { Mesh } from 'three';

import { DEFAULT_MATERIAL } from '@/static/constants';
export interface Hoodie {
  torsoBack: string;
  torsoBand: string;
  torsoFront: string;
  leftSleeve: string;
  rightSleeve: string;
  leftCuff: string;
  rightCuff: string;
  hood: string;
}

interface AppState {
  hoodie: Hoodie;
  selectedMeshes: Mesh[];
}

export const useAppStore = create<AppState>((set) => ({
  hoodie: {
    torsoFront: DEFAULT_MATERIAL,
    torsoBack: DEFAULT_MATERIAL,
    torsoBand: DEFAULT_MATERIAL,
    leftSleeve: DEFAULT_MATERIAL,
    rightSleeve: DEFAULT_MATERIAL,
    leftCuff: DEFAULT_MATERIAL,
    rightCuff: DEFAULT_MATERIAL,
    hood: DEFAULT_MATERIAL,
  },
  selectedMeshes: [],
}));

// If mesh is currently selected, remove it. Otherwise add it
export const toggleSelectedMesh = (mesh: Mesh) => {
  useAppStore.setState((state) => {
    const isSelected = state.selectedMeshes.includes(mesh);
    return {
      selectedMeshes: isSelected
        ? state.selectedMeshes.filter((m) => m !== mesh)
        : [...state.selectedMeshes, mesh],
    };
  });
}

// Clear all selected meshes
export const clearSelectedMeshes = () => {
  useAppStore.setState({ selectedMeshes: [] });
}

// Set the material name for all selected meshes
export const setMaterial = (name: string) => {
  useAppStore.setState((state) => {
    const updatedHoodie = { ...state.hoodie };

    type HoodieParts = keyof typeof updatedHoodie; // Corrected type

    state.selectedMeshes.forEach((mesh: Mesh) => {
      const partName = mesh.name as string;
      
      // Check if partName is a valid key in updatedHoodie
      if (partName && updatedHoodie.hasOwnProperty(partName)) {
        updatedHoodie[partName as HoodieParts] = name; // Explicitly cast to HoodieParts

        delete mesh.userData.originalColor;
      }
    });

    return {
      hoodie: updatedHoodie,
      selectedMeshes: [],
    };
  });
};

// Update the app store based on the incoming design from the database
export const setDesignFromDB = (design: Record<string, string>) => {
  useAppStore.setState((state) => {
    const updatedHoodie = { ...state.hoodie };

    type HoodieParts = keyof typeof updatedHoodie; // Extract the valid keys for hoodie parts

    Object.entries(design).forEach(([partName, materialIndex]) => {
      if (partName in updatedHoodie) {
        updatedHoodie[partName as HoodieParts] = materialIndex; // Cast partName as a valid key
      }
    });

    return { hoodie: updatedHoodie };
  });
};