import { MeshStandardMaterial } from "three";

// How blue the material tint should be when selecting an object
export const SELECTED_TINT_INTENSITY = 0.2;

// Static materials
import WhiteMaterial from "@/materials/White";
import GreyMaterial from "@/materials/Grey";
import BlackMaterial from "@/materials/Black";

interface MaterialEntry {
  color: string;
  material: MeshStandardMaterial;
}

export const MATERIALS: Record<string, MaterialEntry> = {
  "WHITE_FABRIC": {color: "#ffffff", material: WhiteMaterial},
  "GREY_FABRIC": {color: "#bbbbbb", material: GreyMaterial},
  "BLACK_FABRIC": {color: "#000000", material: BlackMaterial},
};

export const DEFAULT_MATERIAL = "WHITE_FABRIC";