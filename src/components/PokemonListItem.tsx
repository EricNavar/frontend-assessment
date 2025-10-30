import React from 'react';
import { Pokemon } from 'src/hooks/useGetPokemons';
import { tss } from '../tss';
import { TypeChip } from './TypeChip';

export const PokemonListItem = (props: { data: Pokemon }) => {
  const { classes } = useStyles();
  const { data } = props;
  return (
    <div className={classes.itemCard}>
      <div>
        <h2>{data.name}</h2>
        <p>No. {data.id}</p>
        {data.types?.map((t) => <TypeChip key={t} typeName={t} />)}
      </div>
      <img src={data.sprite} alt="" width="200px" />
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  itemCard: {
    borderStyle: 'solid',
    borderColor: theme.color.text.primary,
    borderWidth: 1,
    borderRadius: 2,
    margin: 4,
    padding: 8,
  },
}));
