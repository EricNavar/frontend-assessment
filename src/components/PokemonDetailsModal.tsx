import React from 'react';
import { useGetPokemonDetails } from 'src/hooks/useGetPokemons';
import { TypeChip } from './TypeChip';
import { IndeterminateProgressIndicator } from './IndeterminateProgressIndicator';

interface IPokemonDetailsModal {
  handleClose: () => void;
  pokemonId: number;
}

export const PokemonDetailsModal = (props: IPokemonDetailsModal) => {
  const { handleClose, pokemonId } = props;
  const { data, loading, error } = useGetPokemonDetails(pokemonId);
  const getDialogContents = () => {
    if (loading) {
      return <IndeterminateProgressIndicator />;
    }
    if (error) {
      return <p>Could not load data.</p>;
    }
    if (!data) {
      return <p>Could not load data.</p>;
    }
    return (
      <>
        <div>
          <h2>{data.name}</h2>
          <p>No. {data.id}</p>
          {data.types?.map((t) => <TypeChip key={t} typeName={t} />)}
        </div>
        <p>Capture rate: {data.captureRate}</p>
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        {data.stats.map((stat) => (
          <p key={stat.statName}>
            {stat.statName}: {stat.baseStat}
          </p>
        ))}
        <img src={data.sprite} alt={data.name} width="200px" height="200px" />
        <button onClick={handleClose}>Close</button>
      </>
    );
  };

  return <dialog open>{getDialogContents()}</dialog>;
};
