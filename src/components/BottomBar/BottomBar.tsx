import React from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styles from './styles';
import { BottomBarTabs } from './BottomBarTabs/BottomBarTabs';

type BottomBarProps = BottomTabBarProps & {
  onTabLongPress?: (routeName: string, index: number) => void;
};

export const BottomBar = ({ descriptors, onTabLongPress }: BottomBarProps) => {
  const translationX = useSharedValue(0);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animatedContainer, indicatorAnimatedStyle]}
      />
      <BottomBarTabs
        descriptors={descriptors}
        onTabLongPress={onTabLongPress}
        translationX={translationX}
      />
    </View>
  );
};
