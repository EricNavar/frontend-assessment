import React, { useMemo, useState } from 'react';
import { tss } from '../tss';
import { Pokemon, useGetPokemons } from 'src/hooks/useGetPokemons';
import { PokemonListItem } from 'src/components/PokemonListItem';
import { IndeterminateProgressIndicator } from 'src/components/IndeterminateProgressIndicator';
import { PokemonDetailsModal } from 'src/components/PokemonDetailsModal';
import { useNavigate } from 'react-router-dom';

// filters based on name
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
const filterPokemonData = (data: Pokemon[], searchString: string) => {
  // TODO: simplify. maybe just use simple indexOf
  const regex = new RegExp(searchString.trim(), 'i');
  return data.filter((pokemon) => regex.test(pokemon.name));
};

interface IPokemonListPage {
  // I did specify a default value but I was still getting a lint error so I disabled the error
  // eslint-disable-next-line react/require-default-props
  pokemonId?: number;
}

export const PokemonListPage = ({ pokemonId = -1 }: IPokemonListPage) => {
  const { classes } = useStyles();
  const [searchString, setSearchString] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(pokemonId !== -1);
  const [selectedPokemon, setSelectedPokemon] = useState<number>(pokemonId);
  const { data, loading, error } = useGetPokemons();
  const navigate = useNavigate();

  const filteredData = useMemo(() => filterPokemonData(data, searchString), [data, searchString]);

  const onChangeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value);
  };

  const onClickButton = (id: number) => {
    navigate(`/pokemon/${id}`);
    console.log(id);
    setModalOpen(true);
    setSelectedPokemon(id);
  };

  const closeModal = () => {
    setModalOpen(false);
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
      {modalOpen && <PokemonDetailsModal handleClose={closeModal} pokemonId={selectedPokemon} />}
      <input type="text" value={searchString} onChange={onChangeSearchString} />
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
  },
  listItem: {
    listStyle: 'none',
  },
}));
