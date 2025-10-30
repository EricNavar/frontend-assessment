import React from 'react';
import { tss } from '../tss';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonListItem } from 'src/components/PokemonListItem';

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data } = useGetPokemons();

  return (
    <div className={classes.root}>
      <ul>{data?.map((d) => <PokemonListItem key={d.id} data={d} />)}</ul>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
  },
}));
