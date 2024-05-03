import { Film } from '@/app/types/Film';
import { Edge } from 'reactflow';

/**
 * This function generates an array of edges between a hero and the given films. Each edge represents a relationship between the hero and a film in the graph.
 *
 * @param {Film[]} films - An array of films for which edges are to be generated. Each film should have an ID.
 *
 * @returns {Edge[]} An array of edges between the hero and the films. Each edge includes an id, a source, and a target.
 * The id of an edge is 'hero-film-' followed by the id of the film.
 * The source of an edge is 'hero'.
 * The target of an edge is 'film-' followed by the id of the film.
 *
 * The function generates an edge for each film in the films array.
 */
export const generateHeroFilmEdges = (films: Film[]): Edge[] => {
  const edges: Edge[] = [];

  for (const film of films) {
    const edge: Edge = {
      id: `hero-film-${film.id}`,
      source: 'hero',
      target: `film-${film.id}`,
    };

    edges.push(edge);
  }

  return edges;
};
