import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { I18nProvider } from '@modules/I18nProvider/I18nProvider';
import { AppNavigator } from '@utils/routes';
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
