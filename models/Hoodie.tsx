import { useMemo, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, Material, Group} from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { useAppStore } from '@/stores/app-store';

import { MATERIALS } from '@/static/constants';

// Define GLTF result type with dynamic records for nodes and materials
type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};

export default function Model(props: any) {
  const gltf = useGLTF('/models/hoodie-single-material-c.glb') as unknown as GLTFResult;
  const { nodes } = gltf;

  const groupRef = useRef<Group>();

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof Mesh) {
          child.userData.isHoodie = true;
        }
      });
    }
  }, [groupRef.current]);

  const { hoodie } = useAppStore((state) => state);

  // Memoize the materials to prevent unnecessary re-renders and clones
  // These should only update when the app store hoodie changes
  const materials = useMemo(() => ({
    torsoBack: MATERIALS[hoodie.torsoBack].material.clone(),
    torsoBand: MATERIALS[hoodie.torsoBand].material.clone(),
    torsoFront: MATERIALS[hoodie.torsoFront].material.clone(),
    leftSleeve: MATERIALS[hoodie.leftSleeve].material.clone(),
    rightSleeve: MATERIALS[hoodie.rightSleeve].material.clone(),
    leftCuff: MATERIALS[hoodie.leftCuff].material.clone(),
    rightCuff: MATERIALS[hoodie.rightCuff].material.clone(),
    hood: MATERIALS[hoodie.hood].material.clone(),
  }), [
    hoodie.torsoBack,
    hoodie.torsoBand,
    hoodie.torsoFront,
    hoodie.leftSleeve,
    hoodie.rightSleeve,
    hoodie.leftCuff,
    hoodie.rightCuff,
    hoodie.hood,
  ]);

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <mesh
        name="torsoBack"
        castShadow
        receiveShadow
        geometry={nodes.torso_back.geometry}
        material={materials.torsoBack}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="torsoBand"
        castShadow
        receiveShadow
        geometry={nodes.torso_band.geometry}
        material={materials.torsoBand}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="torsoFront"
        castShadow
        receiveShadow
        geometry={nodes.torso_front.geometry}
        material={materials.torsoFront}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="leftSleeve"
        castShadow
        receiveShadow
        geometry={nodes.arms_left_sleeve.geometry}
        material={materials.leftSleeve}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="rightSleeve"
        castShadow
        receiveShadow
        geometry={nodes.arms_right_sleeve.geometry}
        material={materials.rightSleeve}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="leftCuff"
        castShadow
        receiveShadow
        geometry={nodes.arms_left_cuff.geometry}
        material={materials.leftCuff}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="rightCuff"
        castShadow
        receiveShadow
        geometry={nodes.arms_right_cuff.geometry}
        material={materials.rightCuff}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        name="hood"
        castShadow
        receiveShadow
        geometry={nodes.hood.geometry}
        material={materials.hood}
        position={[0, -1.195, 0.072]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload('/models/hoodie-single-material-c.glb');