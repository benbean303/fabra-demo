import React, { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib/controls/OrbitControls';
import { useAppStore } from '@/stores/app-store';
import { Mesh, Box3, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

export default function CameraController() {
  // Reference to orbit controls
  const controlsRef = useRef<ThreeOrbitControls>(null);

  // Grab current selection from the app store
  const selectedMeshes = useAppStore((state) => state.selectedMeshes);

  // Default target for when no meshes are selected
  const defaultTarget = new Vector3(0, 0.1, 0);

  // Ref for the target position
  const targetPositionRef = useRef<Vector3>(defaultTarget.clone());

  useEffect(() => {
    if (selectedMeshes.length > 0) {
      // Initialize a new bounding box to encompass all selected meshes
      // This could be optimized by initializing the box once and updating when needed
      const combinedBoundingBox = new Box3();

      // Combine all meshes bounding boxes
      selectedMeshes.forEach((mesh: Mesh) => {
        if (mesh && mesh.isMesh) {
          const meshBoundingBox = new Box3().setFromObject(mesh);
          combinedBoundingBox.union(meshBoundingBox);
        }
      });

      // Calculate the center of the combined bounding box
      const center = new Vector3();
      combinedBoundingBox.getCenter(center);

      // Update the target position reference
      targetPositionRef.current.copy(center);
    } else {
      // If the user has deselected everything, revert back to the default target
      targetPositionRef.current.copy(defaultTarget);
    }
  }, [selectedMeshes, defaultTarget]);

  useFrame((_, delta) => {
    if (controlsRef.current) {
      // Smoothly interpolate the target position
      // I'm using delta here to ensure it's not dependant on frame rate
      controlsRef.current.target.lerp(targetPositionRef.current, 10 * delta);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      target={targetPositionRef.current}
      enableDamping
      dampingFactor={0.1}
    />
  );
}