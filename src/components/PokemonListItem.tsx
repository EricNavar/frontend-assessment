import React from 'react';
import { Pokemon } from '../hooks/useGetPokemons';
import { tss } from '../tss';
import { TypeChip } from './TypeChip';

interface IPokemonListItem {
  data: Pokemon;
  onClick: (id: number) => void;
}

export const PokemonListItem = (props: IPokemonListItem) => {
  const { classes } = useStyles();
  const { data, onClick } = props;

  return (
    <button className={classes.itemCard} onClick={() => onClick(data.id)}>
      <div>
        <span className={classes.idNo}>No. {data.id}</span>
        <h2 style={{ marginTop: 8 }}>{data.name}</h2>
        {data.types?.map((t) => <TypeChip key={t} typeName={t} />)}
      </div>
      <img src={data.sprite} alt={data.name} width="200px" height="200px" />
    </button>
  );
};

const useStyles = tss.create(({ theme }) => ({
  itemCard: {
    borderStyle: 'solid',
    borderColor: theme.color.text.primary,
    color: theme.color.text.primary,
    borderWidth: 1,
    borderRadius: 2,
    margin: 8,
    padding: 8,
    ':hover': {
      background: '#222222',
    },
    backgroundColor: '#000000',
    textAlign: 'left',
  },
  idNo: {
    color: theme.color.text.secondary,
  },
}));
