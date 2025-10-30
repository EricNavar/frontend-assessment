import { Pokemon } from 'src/hooks/useGetPokemons';

export const bulbasaur: Pokemon = {
  id: '1',
  name: 'Bulbasaur',
  types: ['Grass'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
};

export const charizard: Pokemon = {
  id: '6',
  name: 'Charizard',
  types: ['Fire'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
};

export const mockPokemonList: Pokemon[] = [bulbasaur, charizard];
