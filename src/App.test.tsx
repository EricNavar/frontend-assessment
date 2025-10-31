import React from 'react';
import { render, waitFor } from './test-utils';
import App from './App';

jest.mock('../README.md', () => ({
  text: jest.fn().mockResolvedValue('hello world'),
}));

test('renders home page', async () => {
  const { getByTestId } = await waitFor(() => render(<App />));
  expect(getByTestId('MockReactMarkdown')).toBeInTheDocument();
});
