import { Hero } from '@/app/types/Hero';
import { get } from '@/app/utils/fetchClient';
import axios from 'axios';

export interface HeroesResponse {
  results: Hero[];
  next: string;
}

export const fetchHeroes = async (url: string) => {
  return get(url);
};
