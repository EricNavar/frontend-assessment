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

  const onErrorLoadingImage = () => console.log('jddnjk');

  return (
    <button className={classes.itemCard} onClick={() => onClick(data.id)}>
      <div>
        <span className={classes.idNo}>No. {data.id}</span>
        <h2 className={classes.pokemonName}>{data.name}</h2>
        {data.types?.map((t) => <TypeChip key={t} typeName={t} />)}
      </div>
      <div className={classes.imgWrapper}>
        <img
          src={data.sprite}
          alt={data.name}
          width="200px"
          height="200px"
          onError={onErrorLoadingImage}
        />
      </div>
    </button>
  );
};

const useStyles = tss.create(({ theme }) => ({
  itemCard: {
    borderStyle: 'solid',
    borderColor: theme.color.card.border,
    color: theme.color.text.primary,
    backgroundColor: theme.color.card.primary,
    borderWidth: 1,
    borderRadius: 2,
    margin: 8,
    padding: 8,
    ':hover': {
      background: theme.color.card.hover,
    },
    textAlign: 'left',
  },
  idNo: {
    color: theme.color.text.secondary,
    marginTop: 8,
  },
  pokemonName: {
    marginTop: 8,
  },
  imgWrapper: {
    width: 200,
    height: 200,
  },
}));
