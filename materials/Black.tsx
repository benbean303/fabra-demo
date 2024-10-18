// Static black material for the hoodie

import * as THREE from 'three';

const loader = new THREE.TextureLoader();

// Load textures
const baseTexture = loader.load('/textures/black/base.jpg');
const displacementTexture = loader.load('/textures/black/displacement.jpg');
const normalTexture = loader.load('/textures/black/normal.jpg');
const roughnessTexture = loader.load('/textures/black/roughness.jpg');

baseTexture.wrapS = THREE.RepeatWrapping;
baseTexture.wrapT = THREE.RepeatWrapping;
baseTexture.repeat.set(25, 25);

displacementTexture.wrapS = THREE.RepeatWrapping;
displacementTexture.wrapT = THREE.RepeatWrapping;
displacementTexture.repeat.set(25, 25);

normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
normalTexture.repeat.set(25, 25);

roughnessTexture.wrapS = THREE.RepeatWrapping;
roughnessTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.repeat.set(25, 25);

const BlackMaterial = new THREE.MeshStandardMaterial({
  color: '#aaaaaa',
  map: baseTexture,
  displacementMap: displacementTexture,
  displacementScale: 0.5,
  normalMap: normalTexture,
  roughnessMap: roughnessTexture,
  metalness: 0,
  roughness: 1,
});

export default BlackMaterial;