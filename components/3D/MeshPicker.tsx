import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { toggleSelectedMesh, clearSelectedMeshes } from '@/stores/app-store';
import * as THREE from 'three';

const MeshPicker = () => {
  const { camera, scene, gl } = useThree();

  const isDragging = useRef(false);
  const initialMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Create a raycaster and mouse vector. Again this could
    // be optimised by reusing the same instances
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Store where the mouse was when clicked
    const handleMouseDown = (event: MouseEvent): void => {
      isDragging.current = false;
      initialMousePosition.current.x = event.clientX;
      initialMousePosition.current.y = event.clientY;
    };

    // Calculate the distance the mouse has moved since clicked
    // If it's above the threshold, we know the user is dragging
    const handleMouseMove = (event: MouseEvent): void => {
      const dx = event.clientX - initialMousePosition.current.x;
      const dy = event.clientY - initialMousePosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const dragThreshold = 5;

      if (distance > dragThreshold) {
        isDragging.current = true;
      }
    };

    const handleMouseUp = (event: MouseEvent): void => {
      if (isDragging.current) return;

      // Grab normalized mouse coordinates from the raw event
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Cast a ray from the camera to the mouse position
      raycaster.setFromCamera(mouse, camera);

      // Check for any objects that are hit 
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        // If the user clicked on a hoodie mesh, toggle its selection.
        // Also if the user clicked on the floor, clear the selection (same as clicking empty space)
        const selectedObject = intersects[0].object as THREE.Mesh;
        if (!selectedObject.userData.isHoodie) {
          clearSelectedMeshes();
          return;
        }
        toggleSelectedMesh(selectedObject);
        console.log('Toggled selection for:', selectedObject);
      } else {
        // If the user clicked on empty space, clear their selection
        clearSelectedMeshes();
      }
    };

    // Set the events
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Clean up the events
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, scene, gl, toggleSelectedMesh, clearSelectedMeshes]);

  return null;
};

export default MeshPicker;