import React from 'react';

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5}/> 
      <directionalLight position={[0.5, 0.5, 0.5]} castShadow shadow-bias={-0.00006} />
      <pointLight position={[-0.25, 0, 0.5]} castShadow intensity={0.25} />
      <pointLight position={[0.25, 0, -0.5]} castShadow intensity={0.175} />
    </>
  );
};

export default Lights;