import React from 'react';
import { useIntl } from 'react-intl';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@screens/HomeScreen/HomeScreen';
import { RepositoriesScreen } from '@screens/RepositoriesScreen/RepositoriesScreen';
import { PullRequestsScreen } from '@screens/PullRequestsScreen/PullRequestsScreen';
import {
  HOME_SCREEN,
  PULL_REQUESTS_SCREEN,
  REPOSITORIES_SCREEN,
} from 'consts/navigation';

const AppStack = createStackNavigator();

const defaultScreenOptions = { headerBackTitleVisible: false };

export const AppNavigator = () => {
  const { formatMessage } = useIntl();

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{ title: formatMessage({ id: 'global.home' }) }}
      />
      <AppStack.Screen
        name={REPOSITORIES_SCREEN}
        component={RepositoriesScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.repos' }),
        }}
      />
      <AppStack.Screen
        name={PULL_REQUESTS_SCREEN}
        component={PullRequestsScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.pullRequests' }),
        }}
      />
    </AppStack.Navigator>
  );
};
