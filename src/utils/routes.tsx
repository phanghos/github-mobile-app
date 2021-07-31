import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RepositoriesScreen } from '@screens/RepositoriesScreen/RepositoriesScreen';
import { REPOSITORIES_SCREEN } from 'consts/navigation';
import { useIntl } from 'react-intl';

const AppStack = createStackNavigator();

export const AppNavigator = () => {
  const { formatMessage } = useIntl();

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={REPOSITORIES_SCREEN}
        component={RepositoriesScreen}
        options={{ title: formatMessage({ id: 'global.repos' }) }}
      />
    </AppStack.Navigator>
  );
};
