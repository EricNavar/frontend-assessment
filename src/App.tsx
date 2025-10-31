import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PokemonListPage } from './screens/PokemonListPage';
import { LayoutWrapper } from './LayoutWrapper';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { HomePage } from './screens/HomePage';
import { PokemonDetailsPage } from './screens/PokemonDetailsPage';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.pokeapi.co/v1beta2',
  }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<PokemonListPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
