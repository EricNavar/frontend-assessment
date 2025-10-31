import React from 'react';
import { act, fireEvent, render } from '../test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';
import { useGetPokemonDetails, useGetPokemons } from '../hooks/useGetPokemons';
import { bulbasaurSummary, bulbasaurDetails, charizardSummary } from '../__mocks__/mock-pokemon';

jest.mock('../hooks/useGetPokemons', () => ({
  ...jest.requireActual('../hooks/useGetPokemons'),
  useGetPokemons: jest.fn().mockReturnValue({ data: [{ id: '1', name: 'Bulbasaur' }] }),
  useGetPokemonDetails: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const useGetPokemonsMock = useGetPokemons as jest.MockedFunction<typeof useGetPokemons>;

const useGetPokemonDetailsMock = useGetPokemonDetails as jest.MockedFunction<
  typeof useGetPokemonDetails
>;

const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe('PokemonListPage', () => {
  test('it renders', () => {
    useGetPokemonsMock.mockReturnValue({
      data: [bulbasaurSummary],
      error: undefined,
      loading: false,
    });
    const { getByText } = render(<PokemonListPage />);
    getByText('Bulbasaur');
  });
  test('clicking on a pokemon calls navigate', async () => {
    useGetPokemonsMock.mockReturnValue({
      data: [bulbasaurSummary],
      error: undefined,
      loading: false,
    });
    useGetPokemonDetailsMock.mockReturnValue({
      data: bulbasaurDetails,
      error: undefined,
      loading: false,
    });
    const mockNavigate = jest.fn();
    useNavigateMock.mockReturnValue(mockNavigate);
    const { getByText, user } = render(<PokemonListPage />);

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
  });

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

  test('typing in the search bar filters the results', async () => {
    useGetPokemonsMock.mockReturnValue({
      data: [bulbasaurSummary, charizardSummary],
      error: undefined,
      loading: false,
    });

    const { getByText, getByLabelText, queryByText } = render(<PokemonListPage />);

    getByText('Bulbasaur');
    getByText('Charizard');
    fireEvent.change(getByLabelText('Pokémon Search'), { target: { value: 'Bulbasaur' } });
    getByText('Bulbasaur');
    expect(queryByText('Charizard')).toBeNull();
    fireEvent.change(getByLabelText('Pokémon Search'), { target: { value: '' } });
    getByText('Bulbasaur');
    getByText('Charizard');
  });
});
