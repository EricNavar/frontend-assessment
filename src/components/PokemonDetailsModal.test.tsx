import React from 'react';
import { useGetPokemonDetails } from '../hooks/useGetPokemons';
import { render } from '../test-utils';
import { PokemonDetailsModal } from './PokemonDetailsModal';
import { bulbasaurDetails } from 'src/__mocks__/mock-pokemon';

jest.mock('../hooks/useGetPokemons', () => ({
  ...jest.requireActual('../hooks/useGetPokemons'),
  useGetPokemonDetails: jest.fn(),
}));

const useGetPokemonDetailsMock = useGetPokemonDetails as jest.MockedFunction<
  typeof useGetPokemonDetails
>;

describe('PokemonDetailsModal', () => {
  it('should render successfully', () => {
    useGetPokemonDetailsMock.mockReturnValue({
      data: bulbasaurDetails,
      error: undefined,
      loading: false,
    });
    const { getByText } = render(<PokemonDetailsModal handleClose={jest.fn()} pokemonId={1} />);
    getByText('Bulbasaur');
    getByText('Base Stats');
  });

  it('should render a loading indicator while endpoint is pending', () => {
    useGetPokemonDetailsMock.mockReturnValue({
      data: null,
      error: undefined,
      loading: true,
    });
    const { getByText, queryByText } = render(
      <PokemonDetailsModal handleClose={jest.fn()} pokemonId={1} />,
    );
    getByText('Loading...');
    expect(queryByText('Base Stats')).toBeNull();
  });

  it('should render an error message if endpoint fails', () => {
    useGetPokemonDetailsMock.mockReturnValue({
      data: null,
      error: new Error('Request failed with status code 500'),
      loading: false,
    });
    const { getByText, queryByText } = render(
      <PokemonDetailsModal handleClose={jest.fn()} pokemonId={1} />,
    );
    getByText('There was an error loading the Pokémon details.');
    expect(queryByText('Base Stats')).toBeNull();
  });

  it('should render a message if endpoint does not return an error but also does not produce any data', () => {
    useGetPokemonDetailsMock.mockReturnValue({
      data: null,
      error: undefined,
      loading: false,
    });
    const { getByText, queryByText } = render(
      <PokemonDetailsModal handleClose={jest.fn()} pokemonId={1} />,
    );
    getByText('Could not load Pokémon details.');
    expect(queryByText('Base Stats')).toBeNull();
  });
});
