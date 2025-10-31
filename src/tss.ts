import { createTss } from 'tss-react';

// hex values for pokemon type colors: https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3

function useContext() {
  const theme = {
    color: {
      surface: '#000E1C',
      card: {
        primary: '#001a33',
        hover: '#08223b',
        border: '#000922',
      },
      text: {
        primary: '#FAFAFA',
        secondary: '#AAAAAA',
      },
      type: {
        Normal: '#A8A77A',
        Fire: '#EE8130',
        Water: '#6390F0',
        Electric: '#F7D02C',
        Grass: '#7AC74C',
        Ice: '#96D9D6',
        Fighting: '#C22E28',
        Poison: '#A33EA1',
        Ground: '#E2BF65',
        Flying: '#A98FF3',
        Psychic: '#F95587',
        Bug: '#A6B91A',
        Rock: '#B6A136',
        Ghost: '#735797',
        Dragon: '#6F35FC',
        Dark: '#705746',
        Steel: '#B7B7CE',
        Fairy: '#D685AD',
      },
      stat: {
        HP: '#69dc12',
        Attack: '#efcc18',
        Defense: '#e86412',
        'Special Attack': '#14c3f1',
        'Special Defense': '#4a6adf',
        Speed: '#d51dad',
      },
    },
  };

  return { theme };
}

export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
