import { Starship } from '@/app/types/Starship';
import { generateNodePrimaryCoordinates } from './generateNodePrimaryCoordinates';
import { Node, Position } from 'reactflow';
import { Axis } from '@/app/types/Axis';

/**
 * This function generates an array of nodes for the given starships. Each node represents a starship in the graph.
 *
 * @param {Starship[]} starships - An array of starships for which nodes are to be generated.
 * @param {number} primaryStartCoordinate - The start coordinate on the primary axis (either 'x' or 'y') for the nodes.
 * @param {Axis} primaryAxis - The primary axis (either 'x' or 'y') for the nodes.
 * @param {Axis} secondaryAxis - The secondary axis (either 'x' or 'y') for the nodes.
 * @param {number} stepBetweenSecondary - The distance between the coordinates on the secondary axis of two consecutive nodes.
 *
 * @returns {Node[]} An array of nodes for the starships. Each node includes an id, a position, a label, a source position, and a target position.
 * The id of a node is 'starship-' followed by the id of the starship.
 * The position of a node is determined by the start coordinates, the primary axis, the secondary axis, and the index of the starship in the starships array.
 * The label of a node is the name of the starship.
 * The source position and the target position of a node are determined by the primary axis.
 *
 * The function uses the `generateNodePrimaryCoordinates` function to generate the coordinates on the secondary axis for the nodes.
 */
export const generateStarshipsNodes = (
  starships: Starship[],
  primaryStartCoordinate: number,
  primaryAxis: Axis,
  secondaryAxis: Axis,
  stepBetweenSecondary: number
): Node[] => {
  const coordinates = generateNodePrimaryCoordinates(
    starships.length,
    stepBetweenSecondary
  );

  const nodesForShips = starships.map((starship, index) => {
    const node: Node = {
      id: `starship-${starship.id}`,
      position: { x: 0, y: 0 },
      data: { label: starship.name },
      sourcePosition: primaryAxis === 'x' ? Position.Right : Position.Bottom,
      targetPosition: primaryAxis === 'x' ? Position.Left : Position.Top,
    };

    node.position[secondaryAxis] = coordinates[index];
    node.position[primaryAxis] = primaryStartCoordinate;

    return node;
  });

  return nodesForShips;
};
