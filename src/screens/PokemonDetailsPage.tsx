import React from 'react';
import { useParams } from 'react-router-dom';
import { PokemonListPage } from './PokemonListPage';

export const PokemonDetailsPage = () => {
  const params = useParams();
  const pokemonId = Number(params.id);

  // todo: improve error message
  if (Number.isNaN(pokemonId)) {
    return <p>Ooops!</p>;
  }

  return <PokemonListPage pokemonId={pokemonId} />;
};
