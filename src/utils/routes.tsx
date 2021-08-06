import React from 'react';
import { useIntl } from 'react-intl';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from '@screens/HomeScreen/HomeScreen';
import { IssuesScreen } from '@screens/IssuesScreen/IssuesScreen';
import { RepositoriesScreen } from '@screens/RepositoriesScreen/RepositoriesScreen';
import { PullRequestsScreen } from '@screens/PullRequestsScreen/PullRequestsScreen';
import {
  HOME_SCREEN,
  ISSUES_SCREEN,
  PULL_REQUESTS_SCREEN,
  REPOSITORIES_SCREEN,
} from 'consts/navigationConsts';

const AppStack = createStackNavigator();

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  headerBackTitleVisible: false,
};

export const AppNavigator = () => {
  const { formatMessage } = useIntl();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppStack.Navigator>
        <AppStack.Screen
          name={HOME_SCREEN}
          component={HomeScreen}
          options={{ title: formatMessage({ id: 'global.home' }) }}
        />
        <AppStack.Screen
          name={ISSUES_SCREEN}
          component={IssuesScreen}
          options={{
            ...defaultScreenOptions,
            title: formatMessage({ id: 'global.issues' }),
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
        <AppStack.Screen
          name={REPOSITORIES_SCREEN}
          component={RepositoriesScreen}
          options={{
            ...defaultScreenOptions,
            title: formatMessage({ id: 'global.repos' }),
          }}
        />
      </AppStack.Navigator>
    </SafeAreaView>
  );
};
