import { Film } from '@/app/types/Film';
import { Starship } from '@/app/types/Starship';
import { Edge } from 'reactflow';

/**
 * This function generates an array of edges between films and starships. Each edge represents a relationship between a film and a starship in the graph.
 *
 * @param {Film[]} films - An array of films for which edges are to be generated. Each film should have an array of starship IDs.
 * @param {Starship[]} starships - An array of starships for which edges are to be generated. Each starship should have an ID.
 *
 * @returns {Edge[]} An array of edges between the films and the starships. Each edge includes an id, a source, and a target.
 * The id of an edge is 'film-' followed by the id of the film, '-starship-', and the id of the starship.
 * The source of an edge is 'film-' followed by the id of the film.
 * The target of an edge is 'starship-' followed by the id of the starship.
 *
 * The function only generates an edge between a film and a starship if the starship is included in the starships array.
 */
export const generateFilmStarshipEdges = (
  films: Film[],
  starships: Starship[]
): Edge[] => {
  const edges: Edge[] = [];

  for (const film of films) {
    for (const starshipId of film.starships) {
      if (!starships.some((starship) => starship.id === starshipId)) {
        continue;
      }

      const edge: Edge = {
        id: `film-${film.id}-starship-${starshipId}`,
        source: `film-${film.id}`,
        target: `starship-${starshipId}`,
      };

      edges.push(edge);
    }
  }

  return edges;
};
