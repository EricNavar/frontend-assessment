import React from 'react';
import { Stat, useGetPokemonDetails } from 'src/hooks/useGetPokemons';
import { TypeChip } from './TypeChip';
import { IndeterminateProgressIndicator } from './IndeterminateProgressIndicator';
import { tss } from 'src/tss';
import { PokemonStatEnum } from 'src/types';

interface IPokemonDetailsModal {
  handleClose: () => void;
  pokemonId: number;
}

const StatBar = (props: Stat) => {
  const { statName, baseStat } = props;
  const { classes } = useStatBarStyles({ statName, baseStat });
  return (
    <tr key={statName}>
      <td style={{ textAlign: 'right' }}>
        {statName}: {baseStat}
      </td>
      <td className={classes.statBar} aria-label={String(baseStat)} />
    </tr>
  );
};

const useStatBarStyles = tss
  .withParams<{ statName: PokemonStatEnum; baseStat: number }>()
  .create(({ theme, statName, baseStat }) => ({
    statBar: {
      height: 20,
      width: baseStat * 2,
      backgroundColor: theme.color.stat[statName],
      display: 'inline-block',
      marginBottom: 4,
      marginLeft: 8,
    },
  }));

export const PokemonDetailsModal = (props: IPokemonDetailsModal) => {
  const { handleClose, pokemonId } = props;
  const { data, loading, error } = useGetPokemonDetails(pokemonId);
  const { classes } = useStyles();
  const getDialogContents = () => {
    if (loading) {
      // todo: make loading icon slightly bigger and center it
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
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <button onClick={handleClose}>Close</button>
        </div>
        <div>
          <h2>{data.name}</h2>
          <p>No. {data.id}</p>
          {data.types?.map((t) => <TypeChip key={t} typeName={t} />)}
        </div>
        <img src={data.sprite} alt={data.name} width="200px" height="200px" />
        <p>Capture rate: {data.captureRate}</p>
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        <p>
          <b>Base Stats</b>
        </p>
        <table>
          <tbody>
            {data.stats.map((stat) => (
              <StatBar statName={stat.statName} baseStat={stat.baseStat} key={stat.statName} />
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <dialog open className={classes.dialog}>
      {getDialogContents()}
    </dialog>
  );
};

const useStyles = tss.create(({ theme }) => ({
  dialog: {
    color: theme.color.text.primary,
    backgroundColor: 'black',
    minWidth: 400,
  },
}));
