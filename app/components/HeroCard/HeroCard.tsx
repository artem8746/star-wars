import { Hero } from '@/app/types/Hero';
import React from 'react';

interface Props {
  hero: Hero;
  onCardClick: (hero: Hero) => void;
}

export const HeroCard: React.FC<Props> = ({ hero, onCardClick }) => {
  return (
    <button
      data-testid={`hero-${hero.id}`}
      onClick={() => onCardClick(hero)}
      className='block min-h-44 rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
    >
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {hero.name}
      </h5>
      <ul>
        <li className='text-start tracking-tight text-gray-900 dark:text-white'>
          Gender: {hero.gender}
        </li>

        <li className='text-start tracking-tight text-gray-900 dark:text-white'>
          Birth: {hero.birth_year}
        </li>
      </ul>
    </button>
  );
};
