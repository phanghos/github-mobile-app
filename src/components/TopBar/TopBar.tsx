import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { SearchIcon } from 'assets/icons';
import { SEARCH_SCREEN } from 'consts/navigationConsts';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type TopBarProps = {
  showBack?: boolean;
  showSearch?: boolean;
  showBottomLine?: boolean;
  onBackPress?: () => void;
  opacity?: Animated.SharedValue<number>;
};

type ParamsList = {
  [SEARCH_SCREEN]: undefined;
};

type NavigationProp = BottomTabNavigationProp<ParamsList, keyof ParamsList>;

export const TopBar = ({
  showBack = true,
  showSearch = false,
  showBottomLine = true,
  onBackPress,
  opacity,
  children,
}: PropsWithChildren<TopBarProps>) => {
  const { goBack, navigate } = useNavigation<NavigationProp>();
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity?.value ?? 1,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: 48,
          backgroundColor: '#fff',
          zIndex: 1,
          justifyContent: 'center',
        },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 16,
          height: 48,
        }}
      >
        {showBack && (
          <HeaderBackButton
            labelVisible={false}
            onPress={onBackPress || goBack}
          />
        )}
        <View style={{ flex: 1 }}>{children}</View>
        {showSearch && (
          <TouchableOpacity
            onPress={() => {
              navigate(SEARCH_SCREEN);
            }}
          >
            <SearchIcon style={{ marginRight: 16 }} />
          </TouchableOpacity>
        )}
      </View>
      {showBottomLine && (
        <Animated.View
          style={[
            {
              width: '100%',
              height: 1,
              backgroundColor: '#E8E8E8',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
            opacityStyle,
          ]}
        />
      )}
    </Animated.View>
  );
};
