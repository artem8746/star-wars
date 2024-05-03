import { Hero } from '@/app/types/Hero';
import React from 'react';
import { HeroCard } from '../HeroCard';

interface Props {
  heroes: Hero[];
  onHeroCardClick: (hero: Hero) => void;
}

export const HeroList: React.FC<Props> = ({ heroes, onHeroCardClick }) => (
  <div className='grid gap-1 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
    {heroes.map((hero) => (
      <HeroCard onCardClick={onHeroCardClick} hero={hero} key={hero.id} />
    ))}
  </div>
);
