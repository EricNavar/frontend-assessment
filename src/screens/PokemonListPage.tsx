import React, { useMemo, useState } from 'react';
import { tss } from '../tss';
import { Pokemon, useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonListItem } from 'src/components/PokemonListItem';
import { IndeterminateProgressIndicator } from 'src/components/IndeterminateProgressIndicator';
import { PokemonDetailsModal } from 'src/components/PokemonDetailsModal';
import { useNavigate } from 'react-router-dom';
import { ErrorModal } from 'src/components/ErrorModal';

// filters based on name
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
const filterPokemonData = (data: Pokemon[], searchString: string) =>
  data.filter((pokemon) => pokemon.name.toLowerCase().includes(searchString.toLocaleLowerCase()));

interface IPokemonListPage {
  // eslint-disable-next-line react/require-default-props
  pokemonId?: number;
}

export const PokemonListPage = ({ pokemonId }: IPokemonListPage) => {
  const { classes } = useStyles();
  const [searchString, setSearchString] = useState<string>('');
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(pokemonId !== undefined);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(Number.isNaN(pokemonId));
  const [selectedPokemon, setSelectedPokemon] = useState<number>(pokemonId ?? -1);
  const { data, loading, error } = useGetPokemons();
  const navigate = useNavigate();

  const filteredData = useMemo(() => filterPokemonData(data, searchString), [data, searchString]);

  const onChangeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value);
  };

  const onClickButton = (id: number) => {
    navigate(`/pokemon/${id}`);
    setDetailsModalOpen(true);
    setSelectedPokemon(id);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedPokemon(-1);
    navigate(`/list`);
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
    setSelectedPokemon(-1);
    navigate(`/list`);
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
      <li className={classes.listItem} key={d.id}>
        <PokemonListItem data={d} onClick={onClickButton} />
      </li>
    ));
  };

  return (
    <div className={classes.root}>
      {errorModalOpen && <ErrorModal handleClose={closeErrorModal} />}
      {detailsModalOpen && selectedPokemon > 0 && (
        <PokemonDetailsModal handleClose={closeDetailsModal} pokemonId={selectedPokemon} />
      )}
      <h1>Pokedex</h1>
      <label htmlFor="search-bar">
        Pokemon Search
        <br />
        <input
          className={classes.searchBar}
          id="search-bar"
          type="text"
          value={searchString}
          onChange={onChangeSearchString}
          aria-label="Pokemon search"
        />
      </label>
      <ul className={classes.list}>{generateSearchResults()}</ul>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    flexDirection: 'row',
    paddingLeft: 0,
  },
  listItem: {
    listStyle: 'none',
  },
  searchBar: {
    padding: 12,
    marginTop: 8,
  },
}));
