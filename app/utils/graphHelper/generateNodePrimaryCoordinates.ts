/**
 * This function generates an array of primary coordinates for a given number of nodes.
 * The coordinates are relative to a given number and are evenly spaced apart.
 *
 * @param {number} n - The number of nodes for which coordinates are to be generated.
 * @param {number} step - The distance between the coordinates of two consecutive nodes.
 *
 * @returns {number[]} An array of primary coordinates for the nodes.
 * The coordinates are generated in such a way that the nodes are centered around the relativeCoordinate.
 * The first coordinate is calculated by subtracting half the total length of the nodes from the relativeCoordinate.
 * The total length of the nodes is calculated as (n - 1) * step.
 * Each subsequent coordinate is calculated by adding the step to the previous coordinate.
 *
 * The function first calculates the half of the number of nodes and the start coordinate.
 * Then it initializes an empty array for the coordinates.
 * Then it iterates over the number of nodes, and for each node, it calculates the coordinate by adding the product of the index and the step to the start coordinate, and pushes the coordinate to the array.
 * Finally, it returns the array of coordinates.
 */
export const generateNodePrimaryCoordinates = (n: number, step: number) => {
  const halfCount = Math.floor(n / 2);
  const start = -halfCount * step;

  let coordinates = [];
  for (let i = 0; i < n; i++) {
    coordinates.push(start + i * step);
  }

  return coordinates;
};
