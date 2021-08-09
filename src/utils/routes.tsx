import React from 'react';
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
import { useSelector } from 'react-redux';
import { userSelector } from '@features/auth/auth.selectors';
import { View } from 'react-native';
import {
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
  SearchIcon,
} from 'assets/icons';
import { useBottomSheetAnimation } from '@hooks/useBottomSheetAnimation';
import { AccountsBottomSheet } from '@components/AccountsBottomSheet/AccountsBottomSheet';

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
  headerBackTitleVisible: false,
};

const AppStack = createStackNavigator();

const bottomSheetHeight = 400;

const HomeNavigator = () => {
  const { formatMessage } = useIntl();
  const user = useSelector(userSelector);

  return (
    <AppStack.Navigator>
      {!user && (
        <AppStack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          options={{ ...defaultScreenOptions }}
        />
      )}
      <AppStack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          ...defaultScreenOptions,
          title: formatMessage({ id: 'global.home' }),
        }}
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
      <AppStack.Screen
        name={SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          ...defaultScreenOptions,
        }}
      />
      <AppStack.Screen
        name={SEARCH_RESULTS_SCREEN}
        component={SearchResultsScreen}
        options={{
          ...defaultScreenOptions,
        }}
      />
    </AppStack.Navigator>
  );
};

const BottomBar = createBottomTabNavigator();

const ScreenStub = () => <View />;

// const BottomBarTitle = ({ text }: { text: string }) => {
//   return null;
// };

const iconProps = { width: 30, height: 30 };

export const AppNavigator = () => {
  const { gestureHandler, bottomSheetStyle, Overlay, show, hide } =
    useBottomSheetAnimation({ height: bottomSheetHeight });

  return (
    <>
      <Overlay />
      <AccountsBottomSheet
        height={bottomSheetHeight}
        style={bottomSheetStyle}
        gestureHandler={gestureHandler}
        hide={hide}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <BottomBar.Navigator
          screenListeners={{
            tabLongPress: event => {
              if (event.target?.includes('rofile')) {
                show();
              }
            },
          }}
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              // height: 48,
              height: 56,
            },
            tabBarItemStyle: {},
          }}
        >
          <BottomBar.Screen
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
          <BottomBar.Screen
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
          <BottomBar.Screen
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
          <BottomBar.Screen
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
        </BottomBar.Navigator>
      </SafeAreaView>
    </>
  );
};
