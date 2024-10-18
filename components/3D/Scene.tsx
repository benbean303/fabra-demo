'use client';

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Lights from "@/components/3D/Lights";
import Hoodie from "@/models/Hoodie";

import MeshPicker from "./MeshPicker";
import SelectedOutline from "./SelectedOutline";

import CameraController from "./CameraController";
import MaterialSelector from "../UI/MaterialSelector";
import Account from "../UI/Account";

export default function Scene() {
  return (
    <>
      <Account />
      <MaterialSelector />
      <Canvas shadows camera={{fov: 20, position: [0, 0, 3]}} style={{ background: "#131518" }} gl={{ antialias: true }} dpr={2}>
        <Environment preset="studio" environmentIntensity={0.075} backgroundIntensity={0.02}/>
        <CameraController />
        <Lights />
        <Hoodie position={[0, 0.1, 0]} />
        <MeshPicker />
        <SelectedOutline/>
      </Canvas>
    </>
  );
}