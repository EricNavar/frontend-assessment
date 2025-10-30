import React from 'react';
import { Pokemon } from 'src/hooks/useGetPokemons';
import { tss } from '../tss';

export const PokemonListItem = (props: { data: Pokemon }) => {
  const { classes } = useStyles();
  const { data } = props;
  return (
    <div className={classes.itemCard}>
      <h2>
        {data.id}: {data.name}
      </h2>
      <p>{data.types?.map((t) => <span key={t}>{t}</span>)}</p>
      <img src={data.sprite} alt="" width="200px" />
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  itemCard: {
    borderStyle: 'solid',
    borderColor: theme.color.text.primary,
    borderWidth: 1,
    margin: 1,
    padding: 1,
  },
}));
