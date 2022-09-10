import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router location={history.location} navigator={history}>
        {component}
      </Router>
    ),
    history
  };
};
