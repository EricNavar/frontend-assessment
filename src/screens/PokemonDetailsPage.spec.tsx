import React from 'react';
import { useGetPokemonDetails, useGetPokemons } from '../hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonDetailsPage } from './PokemonDetailsPage';
import { fireEvent, render } from '../test-utils';
import { bulbasaurDetails, bulbasaurSummary } from 'src/__mocks__/mock-pokemon';

jest.mock('src/hooks/useGetPokemons', () => ({
  ...jest.requireActual('src/hooks/useGetPokemons'),
  useGetPokemons: jest.fn().mockReturnValue({ data: [{ id: '1', name: 'Bulbasaur' }] }),
  useGetPokemonDetails: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const useGetPokemonsMock = useGetPokemons as jest.MockedFunction<typeof useGetPokemons>;

const useGetPokemonDetailsMock = useGetPokemonDetails as jest.MockedFunction<
  typeof useGetPokemonDetails
>;

const useParamsMock = useParams as jest.MockedFunction<typeof useParams>;

const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>;

describe('PokemonDetailsPage', () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(() => jest.fn());
  });

  test('Should render open modal of valid pokemon when valid id is used', () => {
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
    useParamsMock.mockReturnValue({ id: '1' });
    const { getByText, queryByText } = render(<PokemonDetailsPage />);
    getByText('Pokedex');
    getByText('Base Stats');
    fireEvent.click(getByText('Close'));
    getByText('Pokedex');
    expect(queryByText('Base Stats')).toBeFalsy();
  });

  test('Should render open modal with error message when invalid id is used', () => {
    useGetPokemonsMock.mockReturnValue({
      data: [bulbasaurSummary],
      error: undefined,
      loading: false,
    });
    useParamsMock.mockReturnValue({ id: 'bulbasaur' });
    const { getByText, queryByText } = render(<PokemonDetailsPage />);
    getByText('Pokedex');
    getByText('Pokemon does not exist.');
    fireEvent.click(getByText('Close'));
    getByText('Pokedex');
    expect(queryByText('Base Stats')).toBeFalsy();
  });
});
