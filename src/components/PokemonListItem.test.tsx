import React from 'react';
import { render } from 'src/test-utils';
import { PokemonListItem } from './PokemonListItem';
import { bulbasaur } from 'src/__mocks__/mock-pokemon';

describe('PokemonListItem', () => {
  test('it renders', () => {
    const { getByText } = render(<PokemonListItem data={bulbasaur} />);
    getByText('Bulbasaur');
  });
  test.todo('hover on list item');
  test.todo('renders pokemon with two types');
  test.todo('renders pokemon with undefined types');
  test.todo('renders pokemon with no sprite');
  test.todo('clicking on pokemon opens modal');
});
