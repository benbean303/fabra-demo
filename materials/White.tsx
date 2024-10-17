// src/materials/Black.js

import * as THREE from 'three';

// Initialize the TextureLoader
const loader = new THREE.TextureLoader();

// Load the textures
const baseTexture = loader.load('/textures/white/base.jpg');
const displacementTexture = loader.load('/textures/white/displacement.jpg');
const normalTexture = loader.load('/textures/white/normal.jpg');
const roughnessTexture = loader.load('/textures/white/roughness.jpg');

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
const WhiteMaterial = new THREE.MeshStandardMaterial({
  color: '#ffffff', // Base color set to black
  map: baseTexture, // Base color map
  // emissive: '#ffffff', // Emissive color set to white
  // emissiveIntensity: 0.05,
  displacementMap: displacementTexture, // Displacement map
  displacementScale: 0.5, // Adjust based on your model's needs
  normalMap: normalTexture, // Normal map
  roughnessMap: roughnessTexture, // Roughness map
  metalness: 0, // Adjust metalness as needed
  roughness: 0.9, // Base roughness
  // Additional properties can be added here
});

export default WhiteMaterial;