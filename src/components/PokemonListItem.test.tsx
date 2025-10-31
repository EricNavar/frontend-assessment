import React from 'react';
import { render } from '../test-utils';
import { PokemonListItem } from './PokemonListItem';
import { bulbasaurSummary } from '../__mocks__/mock-pokemon';

describe('PokemonListItem', () => {
  test('it renders', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<PokemonListItem data={bulbasaurSummary} onClick={onClickMock} />);
    getByText('Bulbasaur');
  });
  test.todo('hover on list item');
  test.todo('renders pokemon with two types');
  test.todo('renders pokemon with undefined types');
  test.todo('renders pokemon with no sprite');
  test.todo('clicking on pokemon opens modal');
});
