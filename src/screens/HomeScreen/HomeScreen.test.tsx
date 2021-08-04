import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from './HomeScreen';

describe('HomeScreen', () => {
  test('Renders correctly', () => {
    const tree = render(<HomeScreen />);

    expect(tree).toMatchSnapshot();
  });
});
