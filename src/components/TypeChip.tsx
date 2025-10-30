import React from 'react';
import { tss } from 'src/tss';
import { TypeName } from 'src/types';

export const TypeChip = (props: { typeName: string }) => {
  const { typeName } = props;
  const { classes } = useStyles({ typeName: typeName as TypeName });
  return <span className={classes.typeChip}>{typeName}</span>;
};

const useStyles = tss.withParams<{ typeName: TypeName }>().create(({ theme, typeName }) => ({
  typeChip: {
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 1,
    backgroundColor: theme.color.types[typeName],
    color: theme.color.text.primary,
    textTransform: 'uppercase',
    textShadow: '1px 1px black', // TODO: don't hardcode the color black
  },
}));
