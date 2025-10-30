import React from 'react';
import { act, fireEvent, render } from 'src/test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { bulbasaur } from 'src/__mocks__/mock-pokemon';

jest.mock('src/hooks/useGetPokemons', () => ({
  useGetPokemons: jest.fn().mockReturnValue({ data: [{ id: '1', name: 'Bulbasaur' }] }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const useGetPokemonsMock = useGetPokemons as jest.MockedFunction<typeof useGetPokemons>;

describe('PokemonListPage', () => {
  test('it renders', () => {
    useGetPokemonsMock.mockReturnValue({ data: [bulbasaur], error: undefined, loading: false });
    const { getByText } = render(<PokemonListPage />);
    getByText('Bulbasaur');
  });
  test('clicking on a pokemon calls navigate', async () => {
    useGetPokemonsMock.mockReturnValue({ data: [bulbasaur], error: undefined, loading: false });
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const { getByText, user } = render(<PokemonListPage />);

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith(/* The route to Bulbasaur */);
  });

  test.todo('typing in the search bar filters the results');

  test('loading state', () => {
    useGetPokemonsMock.mockReturnValue({
      data: [],
      error: undefined,
      loading: true,
    });

    const { queryByText, getByText } = render(<PokemonListPage />);
    getByText('Loading...');
    expect(queryByText('Bulbasaur')).toBeNull();
  });

  test('error state', () => {
    useGetPokemonsMock.mockReturnValue({
      data: [],
      error: new Error('Request failed with status code 500'),
      loading: false,
    });

    const { queryByText, getByText } = render(<PokemonListPage />);
    getByText('There was an error.');
    expect(queryByText('Bulbasaur')).toBeNull();
  });

  test('no data state', () => {
    useGetPokemonsMock.mockReturnValue({
      data: [],
      error: undefined,
      loading: false,
    });

    const { queryByText, getByText } = render(<PokemonListPage />);
    getByText('There is no data.');
    expect(queryByText('Bulbasaur')).toBeNull();
  });
});
