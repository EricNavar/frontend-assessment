import { Pokemon, PokemonDetail } from 'src/hooks/useGetPokemons';
import { PokemonStatEnum } from 'src/types';

export const bulbasaurSummary: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  types: ['Grass'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
};

export const bulbasaurDetails: PokemonDetail = {
  id: 1,
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  captureRate: 45,
  weight: 69,
  height: 69,
  stats: [
    {
      statName: PokemonStatEnum.HP,
      baseStat: 45,
    },
    {
      statName: PokemonStatEnum.ATTACK,
      baseStat: 49,
    },
    {
      statName: PokemonStatEnum.DEFENSE,
      baseStat: 49,
    },
    {
      statName: PokemonStatEnum.SPEC_ATTACK,
      baseStat: 65,
    },
    {
      statName: PokemonStatEnum.SPEC_DEFENSE,
      baseStat: 65,
    },
    {
      statName: PokemonStatEnum.SPEED,
      baseStat: 45,
    },
  ],
};

export const charizardSummary: Pokemon = {
  id: 6,
  name: 'Charizard',
  types: ['Fire'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
};

export const mockPokemonList: Pokemon[] = [bulbasaurSummary, charizardSummary];
