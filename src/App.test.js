import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./Firebase', () => ({ db: {} }));

jest.mock('firebase/firestore', () => ({
  collection: () => null,
  onSnapshot: () => () => {},
}));

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
