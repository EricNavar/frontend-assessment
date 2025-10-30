import React from 'react';
import { tss } from '../tss';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonListItem } from 'src/components/PokemonListItem';
import { IndeterminateProgressIndicator } from 'src/components/IndeterminateProgressIndicator';

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();

  if (loading) {
    return (
      <div className={classes.root}>
        <IndeterminateProgressIndicator />
      </div>
    );
  }
  if (error) {
    return <div className={classes.root}>There was an error.</div>;
  }
  if (!data?.length) {
    return <div className={classes.root}>There is no data.</div>;
  }
  return (
    <div className={classes.root}>
      <ul>
        {data.map((d) => (
          <PokemonListItem key={d.id} data={d} />
        ))}
      </ul>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
  },
}));
