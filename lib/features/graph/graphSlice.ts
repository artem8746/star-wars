import { Hero } from '@/app/types/Hero';
import { createAppSlice } from '@/lib/createAppSlice';
import * as api from './graphAPI';
import { PayloadAction } from '@reduxjs/toolkit';
import { Starship } from '@/app/types/Starship';
import { Film } from '@/app/types/Film';

export interface GraphSliceState {
  hero: Hero | undefined;
  films: Film[];
  starships: Starship[];
  status: 'idle' | 'loading' | 'failed';
}

export interface FetchGraphInfoResult {
  films: Film[];
  starships: Starship[];
}

const initialState: GraphSliceState = {
  hero: undefined,
  films: [],
  starships: [],
  status: 'idle',
};

export const graphSlice = createAppSlice({
  name: 'graph',
  initialState,
  reducers: (create) => ({
    // Sets the hero in the state and clears the starships and films arrays
    setHero: create.reducer((state, action: PayloadAction<Hero>) => {
      state.hero = action.payload;
      state.starships = [];
      state.films = [];
    }),
    // This thunk fetches the films and starships related to a hero
    fetchGraphInfo: create.asyncThunk(
      async (hero: Hero) => {
        const result: FetchGraphInfoResult = {
          films: [],
          starships: [],
        };

        // Fetch the films and starships related to the hero and store them in the result object
        result.films = (await api.fetchHeroFilms(hero.id)).data.results;
        result.starships = (await api.fetchHeroStarships(hero.id)).data.results;

        return result;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.starships = action.payload.starships;
          state.films = action.payload.films;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      }
    ),
  }),
  selectors: {
    selectStarships: (graph) => graph.starships,
    selectStatus: (graph) => graph.status,
    selectHero: (graph) => graph.hero,
    selectFilms: (graph) => graph.films,
  },
});

export const actions = graphSlice.actions;

export const { selectStarships, selectHero, selectStatus, selectFilms } =
  graphSlice.selectors;
