'use client';

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import Lights from "@/components/Lights";
import Hoodie from "@/models/Hoodie";

export default function Scene() {
  return (
    <Canvas shadows camera={{fov: 20, position: [0, 0, 3]}} style={{ background: "white" }}>
      <Environment preset="studio" environmentIntensity={0.1}/>
      <OrbitControls/>
      <Lights/>
      <Hoodie />
    </Canvas>
  );
}