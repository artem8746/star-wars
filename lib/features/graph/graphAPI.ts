import { get } from '@/app/utils/fetchClient';

export const fetchHeroStarships = async (id: number) => {
  return get(`${process.env.NEXT_PUBLIC_STARSHIPS_FETCH_URL}?pilots=${id}`);
};

export const fetchHeroFilms = async (id: number) => {
  return get(`${process.env.NEXT_PUBLIC_FILMS_FETCH_URL}?pilots=${id}`);
};
