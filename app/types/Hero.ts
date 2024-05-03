import { Gender } from './Gender';

export interface Hero {
  id: number;
  birth_year: string;
  eye_color: string;
  films: number[];
  gender: Gender;
  hair_color: string;
  height: string;
  homeworld: number;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: number[];
  starships: number[];
  url: string;
  vehicles: number[];
}
