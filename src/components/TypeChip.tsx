import React from 'react';
import { tss } from '../tss';
import { PokemonType } from '../types';

export const TypeChip = (props: { typeName: string }) => {
  const { typeName } = props;
  const { classes } = useStyles({ typeName: typeName as PokemonType });
  return <span className={classes.typeChip}>{typeName}</span>;
};

const useStyles = tss.withParams<{ typeName: PokemonType }>().create(({ theme, typeName }) => ({
  typeChip: {
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 1,
    backgroundColor: theme.color.type[typeName],
    color: theme.color.text.primary,
    textTransform: 'uppercase',
    textShadow: '1px 1px black',
    display: 'inline-flex',
    textAlign: 'center',
    minWidth: 75,
    justifyContent: 'center',
  },
}));
