import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export interface Pokemon {
  id: number;
  name: string;
  types?: string[];
  sprite?: string;
}

export interface PokemonDetail extends Pokemon {
  captureRate: number;
  weight: number;
  height: number;
  stats: Stat[];
}

interface Stat {
  statName: string;
  baseStat: number;
}

export const GET_POKEMONS = gql`
  query GetPokemons($search: String) {
    pokemon(
      limit: 151
      order_by: { id: asc }
      where: {
        pokemonspecy: {
          pokemonspeciesnames: { language: { name: { _eq: "en" } }, name: { _regex: $search } }
        }
      }
    ) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
        capture_rate
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
      weight
      height
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;

// Search should be done client-side for the mid-level assessment. Uncomment for the senior assessment.
export const useGetPokemons = (/* search?: string */): {
  data: Pokemon[];
  loading: boolean;
  error: useQuery.Result['error'];
} => {
  const { data, loading, error } = useQuery<{
    pokemon: {
      id: number;
      pokemonspecy: { pokemonspeciesnames: { name: string }[] };
      pokemontypes: { type: { typenames: { name: string }[] } }[];
      pokemonsprites: { sprites: string }[];
    }[];
  }>(GET_POKEMONS, {
    variables: {
      search: '', // `.*${search}.*`,
    },
  });

  return {
    data:
      data?.pokemon?.map(
        (p): Pokemon => ({
          id: p.id,
          name: p.pokemonspecy?.pokemonspeciesnames?.[0]?.name,
          types: p.pokemontypes?.map(
            (t: { type: { typenames: { name: string }[] } }) => t?.type?.typenames?.[0]?.name,
          ),
          sprite: p.pokemonsprites?.[0]?.sprites,
        }),
      ) ?? [],
    loading,
    error,
  };
};

export const useGetPokemonDetails = (
  pokemonId: number,
): {
  data: PokemonDetail | null;
  loading: boolean;
  error: useQuery.Result['error'];
} => {
  const { data, loading, error } = useQuery<{
    pokemon: {
      pokemonstats: { stat: { name: any }; base_stat: any }[];
      weight: number;
      id: number;
      pokemonspecy: {
        capture_rate: number;
        pokemonspeciesnames: { name: string }[];
      };
      pokemontypes: { type: { typenames: { name: string }[] } }[];
      pokemonsprites: { sprites: string }[];
    }[];
  }>(GET_POKEMON_DETAILS, {
    variables: {
      id: pokemonId,
    },
  });

  return {
    data:
      data?.pokemon?.map(
        (p): PokemonDetail => ({
          id: p.id,
          name: p.pokemonspecy?.pokemonspeciesnames?.[0]?.name,
          types: p.pokemontypes?.map(
            (t: { type: { typenames: { name: string }[] } }) => t?.type?.typenames?.[0]?.name,
          ),
          sprite: p.pokemonsprites?.[0]?.sprites,
          captureRate: p.pokemonspecy.capture_rate,
          weight: p.weight,
          height: p.weight,
          stats:
            p.pokemonstats?.map((s) => ({
              statName: s.stat?.name,
              baseStat: s.base_stat,
            })) ?? [],
        }),
      )[0] ?? null,
    loading,
    error,
  };
};
