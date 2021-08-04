import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@utils/routes';
import { I18nProvider } from '@modules/I18nProvider/I18nProvider';
import { store } from 'store';

export const App = () => (
  <Provider store={store}>
    <I18nProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </I18nProvider>
  </Provider>
);
