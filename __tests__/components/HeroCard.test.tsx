import { render, fireEvent } from '@testing-library/react';
import { HeroCard } from '@/app/components/HeroCard'; // Update with your actual import path
import { Hero } from '@/app/types/Hero';

describe('HeroCard', () => {
  it('renders correctly and responds to click events', () => {
    const mockHero = {
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
    };

    const mockOnCardClick = jest.fn();

    const { getByText } = render(
      <HeroCard hero={mockHero as Hero} onCardClick={mockOnCardClick} />
    );

    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Gender: male')).toBeInTheDocument();
    expect(getByText('Birth: 19BBY')).toBeInTheDocument();

    fireEvent.click(getByText('Luke Skywalker'));

    expect(mockOnCardClick).toHaveBeenCalledWith(mockHero);
  });
});
