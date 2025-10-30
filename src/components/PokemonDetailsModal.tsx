import React from 'react';

interface IPokemonDetailsModal {
  isVisible: boolean;
  handleClose: () => void;
  pokemonId: string;
}

export const PokemonDetailsModal = (props: IPokemonDetailsModal) => {
  const { isVisible, handleClose, pokemonId } = props;
  return (
    <dialog open={isVisible}>
      <h1>Pokemon #{pokemonId}</h1>
      <button onClick={handleClose}>Close</button>
    </dialog>
  );
};
