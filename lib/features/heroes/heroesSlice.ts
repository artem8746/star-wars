import { Hero } from '@/app/types/Hero';
import { createAppSlice } from '@/lib/createAppSlice';
import * as api from './heroesAPI';

export interface HeroesSliceState {
  next: string | undefined;
  heroes: Hero[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: HeroesSliceState = {
  next: undefined,
  heroes: [],
  status: 'idle',
};

export const heroesSlice = createAppSlice({
  name: 'heroes',
  initialState,
  reducers: (create) => ({
    // This thunk fetches a specified amount of pages with heroes
    fetchHeroes: create.asyncThunk(
      // This function fetches the heroes and returns an object
      // that includes the next URL and the fetched heroes
      async (amount = 1, thunkAPI) => {
        // @ts-ignore
        const {
          heroes: { next },
        } = thunkAPI.getState() as { heroes: HeroesSliceState };

        const result = {
          next,
          results: [] as Hero[],
        };

        // Fetch the heroes and store them in the result object
        for (let i = 0; i < amount; i++) {
          const res = (
            await api.fetchHeroes(
              (result.next || process.env.NEXT_PUBLIC_HEROES_INIT_FETCH_URL) as string
            )
          ).data as api.HeroesResponse;

          result.next = res.next;
          result.results.push(...res.results);
        }

        return result;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.heroes.push(...action.payload.results);
          state.next = action.payload.next;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      }
    ),
  }),
  selectors: {
    selectHeroes: (heroes) => heroes.heroes,
    selectStatus: (heroes) => heroes.status,
  },
});

export const actions = heroesSlice.actions;

export const { selectHeroes, selectStatus } = heroesSlice.selectors;
