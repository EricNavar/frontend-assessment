import React from 'react';
import { Pokemon } from 'src/hooks/useGetPokemons';
import { tss } from '../tss';
import { TypeChip } from './TypeChip';

interface IPokemonListItem {
  data: Pokemon;
  onClick: (id: string) => void;
}

export const PokemonListItem = (props: IPokemonListItem) => {
  const { classes } = useStyles();
  const { data, onClick } = props;

  return (
    <button className={classes.itemCard} onClick={() => onClick(data.id)}>
      <div>
        <h2>{data.name}</h2>
        <p>No. {data.id}</p>
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
    borderWidth: 1,
    borderRadius: 2,
    margin: 4,
    padding: 8,
    ':hover': {
      background: 'rgba(255,255,255,.08)',
      cursor: 'pointer',
    },
  },
}));
