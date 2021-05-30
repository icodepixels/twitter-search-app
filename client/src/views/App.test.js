import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../store/store';

import App from './App';

const HASHTAGS = [
    "coding",
    "Python",
    "ComputerScience",
    "gitmergememes",
    "Engineering"
];

test('Titles render to the UI.', () => {
  render(<Provider store={store}><App /></Provider>);
  const title = screen.getByText(/Tweet Feed/i);
  const filter = screen.getByText(/Filter by hashtag/i);

  expect(title).toBeInTheDocument();
  expect(filter).toBeInTheDocument();
});

test('Input field should allow users to type.', () => {
  render(<Provider store={store}><App /></Provider>);
  const input = screen.getByPlaceholderText('Search by keyword');
  userEvent.type(screen.getByPlaceholderText('Search by keyword'), 'usa');

  expect(screen.getByPlaceholderText('Search by keyword')).toHaveValue('usa');
  expect(input).toBeInTheDocument();
});

