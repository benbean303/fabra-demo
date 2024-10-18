import React, { useEffect, useRef } from 'react';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { EffectComposer as ThreeEffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { BlendFunction } from 'postprocessing';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '@/stores/app-store';
import { SELECTED_TINT_INTENSITY } from '@/static/constants';
import { Mesh, Material, MeshStandardMaterial, Color } from 'three';

const SelectedOutline = () => {
  const composer = useRef<ThreeEffectComposer>(null);

  const { selectedMeshes } = useAppStore((state) => state);

  // Use a ref to keep track of previously selected meshes
  const previousSelectedMeshesRef = useRef<Set<Mesh>>(new Set());

  // Render the effect on each frame
  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  useEffect(() => {
    // Convert selectedMeshes to a Set for efficient lookup
    const currentSelectedMeshes = new Set<Mesh>(selectedMeshes);

    // Handle meshes that are no longer selected
    previousSelectedMeshesRef.current.forEach((mesh) => {
      if (!currentSelectedMeshes.has(mesh)) {
        // Reset the material tint
        if (mesh instanceof Mesh && mesh.material instanceof Material) {
          const originalColor = mesh.userData.originalColor;
          if (originalColor) {
            (mesh.material as MeshStandardMaterial).color.copy(originalColor);
            delete mesh.userData.originalColor;
          }
        }
      }
    });

    // Handle newly selected meshes
    selectedMeshes.forEach((mesh: Mesh) => {
      if (!previousSelectedMeshesRef.current.has(mesh)) {
        // Apply the blue tint
        if (mesh instanceof Mesh && mesh.material instanceof Material) {
          const material = mesh.material as MeshStandardMaterial;

          // Store the original color if not already stored
          if (!mesh.userData.originalColor) {
            mesh.userData.originalColor = material.color;
          }

          // Apply a slight blue tint, tint intensity can be adjusted in constants
          material.color = material.color.clone().lerp(new Color(0x0000ff), SELECTED_TINT_INTENSITY);
        }
      }
    });

    // Update the previous selected meshes ref
    previousSelectedMeshesRef.current = currentSelectedMeshes;
  }, [selectedMeshes]);

  return (
    <>
      <EffectComposer ref={composer}>
        <Outline
          selection={selectedMeshes}
          blendFunction={BlendFunction.ALPHA}
          edgeStrength={2.5}
          visibleEdgeColor={0x4444ff}
          hiddenEdgeColor={0x9999bb}
          xRay={true}
        />
      </EffectComposer>
    </>
  );
};

export default SelectedOutline;