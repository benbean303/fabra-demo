// Static grey material for the hoodie

import * as THREE from 'three';

const loader = new THREE.TextureLoader();

// Load textures
const baseTexture = loader.load('/textures/grey/base.jpg');
const displacementTexture = loader.load('/textures/grey/displacement.jpg');
const normalTexture = loader.load('/textures/grey/normal.jpg');
const roughnessTexture = loader.load('/textures/grey/roughness.jpg');

baseTexture.wrapS = THREE.RepeatWrapping;
baseTexture.wrapT = THREE.RepeatWrapping;
baseTexture.repeat.set(22, 22);

displacementTexture.wrapS = THREE.RepeatWrapping;
displacementTexture.wrapT = THREE.RepeatWrapping;
displacementTexture.repeat.set(22, 22);

normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
normalTexture.repeat.set(22, 22);

roughnessTexture.wrapS = THREE.RepeatWrapping;
roughnessTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.repeat.set(22, 22);

const GreyMaterial = new THREE.MeshStandardMaterial({
  color: '#999999',
  map: baseTexture,
  displacementMap: displacementTexture, 
  displacementScale: 0.5,
  normalMap: normalTexture, 
  roughnessMap: roughnessTexture, 
  metalness: 0, 
  roughness: 1, 
});

export default GreyMaterial;