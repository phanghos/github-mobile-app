import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { TabItem } from '../TabItem/TabItem';
import styles from './styles';

type BottomBarTabsProps = {
  descriptors: BottomTabDescriptorMap;
  translationX: Animated.SharedValue<number>;
  onTabLongPress?: (routeName: string, index: number) => void;
};

export const BottomBarTabs = ({
  descriptors,
  translationX,
  onTabLongPress,
}: BottomBarTabsProps) => (
  <View style={styles.container}>
    {Object.values(descriptors).map((descriptor, index) => {
      return (
        <TabItem
          key={descriptor.route.name}
          descriptor={descriptor}
          index={index}
          translationX={translationX}
          onTabLongPress={onTabLongPress}
        />
      );
    })}
  </View>
);
