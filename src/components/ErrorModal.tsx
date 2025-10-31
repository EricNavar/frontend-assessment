import React from 'react';
import { tss } from 'src/tss';

interface IErrorModal {
  handleClose: () => void;
}

export const ErrorModal = (props: IErrorModal) => {
  const { handleClose } = props;
  const { classes } = useStyles();

  return (
    <dialog open className={classes.dialog}>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <button onClick={handleClose}>Close</button>
      </div>
      Pokemon does not exist.
    </dialog>
  );
};

const useStyles = tss.create(({ theme }) => ({
  dialog: {
    color: theme.color.text.primary,
    backgroundColor: 'black',
    minWidth: 400,
  },
}));
