// Static white material for the hoodie

import * as THREE from 'three';

const loader = new THREE.TextureLoader();

// Load textures
const baseTexture = loader.load('/textures/white/base.jpg');
const displacementTexture = loader.load('/textures/white/displacement.jpg');
const normalTexture = loader.load('/textures/white/normal.jpg');
const roughnessTexture = loader.load('/textures/white/roughness.jpg');

baseTexture.wrapS = THREE.RepeatWrapping;
baseTexture.wrapT = THREE.RepeatWrapping;
baseTexture.repeat.set(30, 30);

displacementTexture.wrapS = THREE.RepeatWrapping;
displacementTexture.wrapT = THREE.RepeatWrapping;
displacementTexture.repeat.set(30, 30);

normalTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
normalTexture.repeat.set(30, 30);

roughnessTexture.wrapS = THREE.RepeatWrapping;
roughnessTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.repeat.set(30, 30);

const WhiteMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  map: baseTexture,
  displacementMap: displacementTexture,
  displacementScale: 0.5,
  normalMap: normalTexture,
  roughnessMap: roughnessTexture,
  metalness: 0,
  roughness: 0.9,
});

export default WhiteMaterial;