import React from 'react';
import { act, fireEvent, render } from 'src/test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';

jest.mock('src/hooks/useGetPokemons', () => ({
  useGetPokemons: jest.fn().mockReturnValue({ data: [{ id: '1', name: 'Bulbasaur' }] }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PokemonListPage', () => {
  // Working test
  test('it renders', () => {
    const { getByText } = render(<PokemonListPage />);
    getByText('Bulbasaur');
  });
  // Broken test. Fix this one
  test('clicking on a pokemon calls navigate', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const { getByText, user } = render(<PokemonListPage />);

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith(/* The route to Bulbasaur */);
  });
  // Fill out this test when you've added the functionality
  test.todo('typing in the search bar filters the results');
});
