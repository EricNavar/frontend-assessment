import React, { useMemo, useState } from 'react';
import { tss } from '../tss';
import { Pokemon, useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonListItem } from 'src/components/PokemonListItem';
import { IndeterminateProgressIndicator } from 'src/components/IndeterminateProgressIndicator';
import { PokemonDetailsModal } from 'src/components/PokemonDetailsModal';

// filters based on name
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
const filterPokemonData = (data: Pokemon[], searchString: string) => {
  // TODO: simplify. maybe just use simple indexOf
  const regex = new RegExp(searchString.trim(), 'i');
  return data.filter((pokemon) => regex.test(pokemon.name));
};

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const [searchString, setSearchString] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<number>(-1);
  const { data, loading, error } = useGetPokemons();

  const filteredData = useMemo(() => filterPokemonData(data, searchString), [data, searchString]);

  const onChangeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value);
  };

  const onClickButton = (id: number) => {
    console.log(id);
    setModalOpen(true);
    setSelectedPokemon(id);
  };

  const generateSearchResults = () => {
    if (loading) {
      return <IndeterminateProgressIndicator />;
    }
    if (error) {
      return <p>There was an error.</p>;
    }
    if (!filteredData?.length) {
      return <p>There is no data.</p>;
    }
    return filteredData.map((d) => (
      <li style={{ listStyle: 'none' }} key={d.id}>
        <PokemonListItem data={d} onClick={onClickButton} />
      </li>
    ));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.root}>
      {modalOpen && <PokemonDetailsModal handleClose={closeModal} pokemonId={selectedPokemon} />}
      <input type="text" value={searchString} onChange={onChangeSearchString} />
      <ul>{generateSearchResults()}</ul>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
  },
}));
