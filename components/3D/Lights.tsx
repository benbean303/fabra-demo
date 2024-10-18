import React from 'react';

// Pretty self explanatory, creating lights and also a shader catcher plane on the floor
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.125}/> 
      <directionalLight 
        position={[0.5, 1, 0.5]} 
        intensity={0.2} 
        castShadow 
        shadow-bias={-0.1}
        shadow-camera-near={0.1}
        shadow-camera-far={5}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
      <pointLight position={[-0.25, 0, 0.5]} intensity={0.35} color="#fae2c5"/>
      <pointLight position={[0.25, 0, -0.5]} intensity={0.25} color="#96befa" />

      <mesh castShadow receiveShadow position={[0, -0.375, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial attach='material' opacity={0.3} color="black"/>
      </mesh>
    </>
  );
};

export default Lights;