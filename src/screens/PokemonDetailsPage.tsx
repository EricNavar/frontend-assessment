import React from 'react';
import { useParams } from 'react-router-dom';
import { PokemonListPage } from './PokemonListPage';

export const PokemonDetailsPage = () => {
  const params = useParams();
  const pokemonId = Number(params.id);

  return <PokemonListPage pokemonId={pokemonId} />;
};
