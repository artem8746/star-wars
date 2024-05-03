import { fireEvent, render } from '@testing-library/react';
import { HeroList } from '@/app/components/HeroList';
import { Hero } from '@/app/types/Hero';

const heroes: Hero[] = [
  { id: 1, name: 'Darth Vader' } as Hero,
  { id: 2, name: 'Darth Vader' } as Hero,
  { id: 3, name: 'Darth Vader' } as Hero,
];

describe('HeroList', () => {
  it('renders a list of heroes', () => {
    const { getByTestId } = render(
      <HeroList heroes={heroes} onHeroCardClick={() => {}} />
    );
    heroes.forEach((hero) => {
      expect(getByTestId(`hero-${hero.id}`)).toBeInTheDocument();
    });
  });

  it('calls onHeroCardClick handler when a hero is clicked', () => {
    const onHeroCardClick = jest.fn();
    const { getByTestId } = render(
      <HeroList heroes={heroes} onHeroCardClick={onHeroCardClick} />
    );
    heroes.forEach((hero) => {
      fireEvent.click(getByTestId(`hero-${hero.id}`));
      expect(onHeroCardClick).toHaveBeenCalledWith(hero);
    });
  });
});
