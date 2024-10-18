// Used for generating random colours for the different designs. 
// Ideally this would be a render of the design with the colour applied
export const generateRandomColour = () => {
  const letters = '0123456789ABCDEF';
  let colour = '#';
  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}