import React from 'react';
import { Stat, useGetPokemonDetails } from '../hooks/useGetPokemons';
import { TypeChip } from './TypeChip';
import { IndeterminateProgressIndicator } from './IndeterminateProgressIndicator';
import { tss } from '../tss';
import { PokemonStatEnum } from '../types';
import { Modal } from 'antd';

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
      return <IndeterminateProgressIndicator />;
    }
    if (error) {
      return <p>There was an error loading the Pokemon details.</p>;
    }
    if (!data) {
      return <p>Could not load Pokemon details.</p>;
    }
    return (
      <>
        <div>
          <h2>
            <span className={classes.idNo}>No. {data.id}</span>&nbsp;&nbsp;{data.name}
          </h2>
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
    <Modal open onCancel={handleClose} footer={null}>
      {getDialogContents()}
    </Modal>
  );
};

const useStyles = tss.create(({ theme }) => ({
  idNo: {
    color: theme.color.text.secondary,
    fontSize: 16,
  },
}));
