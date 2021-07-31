import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@utils/routes';
import { I18nProvider } from '@modules/I18nProvider/I18nProvider';

export const App = () => (
  <I18nProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </I18nProvider>
);
