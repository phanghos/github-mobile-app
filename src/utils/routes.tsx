import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginScreen } from '@screens/LoginScreen/LoginScreen';
import { HomeScreen } from '@screens/HomeScreen/HomeScreen';
import { IssuesScreen } from '@screens/IssuesScreen/IssuesScreen';
import { PullRequestsScreen } from '@screens/PullRequestsScreen/PullRequestsScreen';
import { RepositoriesScreen } from '@screens/RepositoriesScreen/RepositoriesScreen';
import { SearchScreen } from '@screens/SearchScreen/SearchScreen';
import { SearchResultsScreen } from '@screens/SearchResultsScreen/SearchResultsScreen';
import {
  HOME_SCREEN,
  ISSUES_SCREEN,
  LOGIN_SCREEN,
  PULL_REQUESTS_SCREEN,
  REPOSITORIES_SCREEN,
  SEARCH_RESULTS_SCREEN,
  SEARCH_SCREEN,
} from 'consts/navigationConsts';
import { userSelector } from '@features/auth/auth.selectors';
import { AccountsBottomSheet } from '@components/AccountsBottomSheet/AccountsBottomSheet';
import { BottomBar as BottomTabBar } from '@components/BottomBar/BottomBar';
import {
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
  SearchIcon,
} from 'assets/icons';

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  headerBackTitleVisible: false,
};

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  const { formatMessage } = useIntl();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.home' }),
        }}
      />
      <HomeStack.Screen
        name={ISSUES_SCREEN}
        component={IssuesScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.issues' }),
        }}
      />
      <HomeStack.Screen
        name={PULL_REQUESTS_SCREEN}
        component={PullRequestsScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.pullRequests' }),
        }}
      />
      <HomeStack.Screen
        name={REPOSITORIES_SCREEN}
        component={RepositoriesScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.repos' }),
        }}
      />
      <HomeStack.Screen
        name={SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          ...defaultScreenOptions,
        }}
      />
      <HomeStack.Screen
        name={SEARCH_RESULTS_SCREEN}
        component={SearchResultsScreen}
        options={{
          ...defaultScreenOptions,
        }}
      />
    </HomeStack.Navigator>
  );
};

const ScreenStub = () => <View />;

const iconProps = { width: 30, height: 30 };

const useHandleAccountsBottomSheet = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const show = () => setIsBottomSheetVisible(true);
  const onClose = () => setIsBottomSheetVisible(false);
  const user = useSelector(userSelector);

  const onTabLongPress = useCallback(
    (routeName: string) => {
      if (routeName === 'ProfileStack' && user) {
        show();
      }
    },
    [user],
  );

  return { onClose, isBottomSheetVisible, onTabLongPress };
};

const UnauthorizedStack = createStackNavigator();

const UnauthorizedNavigator = () => {
  return (
    <UnauthorizedStack.Navigator>
      <UnauthorizedStack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </UnauthorizedStack.Navigator>
  );
};

const AuthorizedStack = createBottomTabNavigator();

type AuthorizedNavigatorProps = Pick<
  ReturnType<typeof useHandleAccountsBottomSheet>,
  'onTabLongPress'
>;

const AuthorizedNavigator = ({ onTabLongPress }: AuthorizedNavigatorProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthorizedStack.Navigator
        tabBar={props => (
          <BottomTabBar {...props} onTabLongPress={onTabLongPress} />
        )}
        // screenListeners={{
        //   tabLongPress: event => {
        //     if (event.target?.includes('rofile') && user) {
        //       show();
        //     }
        //   },
        // }}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 56 },
          tabBarItemStyle: {},
        }}
      >
        <AuthorizedStack.Screen
          name={'HomeStack'}
          component={HomeNavigator}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: () => <HomeIcon {...iconProps} />,
            title: 'Home',
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              fontWeight: undefined,
            },
          }}
        />
        <AuthorizedStack.Screen
          name={'NotificationsStack'}
          component={ScreenStub}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: () => <NotificationsIcon {...iconProps} />,
            title: 'Notifications',
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              fontWeight: undefined,
            },
          }}
        />
        <AuthorizedStack.Screen
          name={'ExploreStack'}
          component={ScreenStub}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: () => <SearchIcon {...iconProps} />,
            title: 'Explore',
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              fontWeight: undefined,
            },
          }}
        />
        <AuthorizedStack.Screen
          name={'ProfileStack'}
          component={ScreenStub}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: () => <ProfileIcon {...iconProps} />,
            title: 'Profile',
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              fontWeight: undefined,
            },
          }}
        />
      </AuthorizedStack.Navigator>
    </SafeAreaView>
  );
};

export const AppNavigator = () => {
  const { onClose, isBottomSheetVisible, onTabLongPress } =
    useHandleAccountsBottomSheet();
  const user = useSelector(userSelector);

  return (
    <>
      <AccountsBottomSheet isVisible={isBottomSheetVisible} onClose={onClose} />
      {!user ? (
        <UnauthorizedNavigator />
      ) : (
        <AuthorizedNavigator onTabLongPress={onTabLongPress} />
      )}
    </>
  );
};
