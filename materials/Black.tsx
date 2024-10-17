// src/materials/Black.js

import * as THREE from 'three';

// Initialize the TextureLoader
const loader = new THREE.TextureLoader();

// Load the textures
const baseTexture = loader.load('/textures/black/base.jpg');
const displacementTexture = loader.load('/textures/black/displacement.jpg');
const normalTexture = loader.load('/textures/black/normal.jpg');
const roughnessTexture = loader.load('/textures/black/roughness.jpg');

// Optionally, set texture properties for better performance and appearance
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

// Create the MeshStandardMaterial with the loaded textures
const BlackMaterial = new THREE.MeshStandardMaterial({
  color: '#000000', // Base color set to black
  map: baseTexture, // Base color map
  displacementMap: displacementTexture, // Displacement map
  displacementScale: 0.5, // Adjust based on your model's needs
  normalMap: normalTexture, // Normal map
  roughnessMap: roughnessTexture, // Roughness map
  metalness: 0, // Adjust metalness as needed
  roughness: 0.9, // Base roughness
  envMapIntensity: 0,
  // Additional properties can be added here
});

export default BlackMaterial;