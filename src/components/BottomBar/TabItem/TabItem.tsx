import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { withTiming } from 'react-native-reanimated';
import { BottomTabDescriptor } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Text } from '@components/Text/Text';
import { tabWidth } from 'consts/navigationConsts';
import styles from './styles';

type TabItemProps = {
  translationX: Animated.SharedValue<number>;
  descriptor: BottomTabDescriptor;
  index: number;
  onTabLongPress?: (routeName: string, index: number) => void;
};

export const TabItem = ({
  translationX,
  descriptor,
  index,
  onTabLongPress,
}: TabItemProps) => (
  <TouchableOpacity
    onPress={() => {
      descriptor.navigation.jumpTo(descriptor.route.name);
      translationX.value = withTiming(tabWidth * index);
    }}
    onLongPress={() => onTabLongPress?.(descriptor.route.name, index)}
  >
    <View style={styles.container}>
      <Text style={styles.text} fontStyle="regular">
        {descriptor.options.title || descriptor.route.name}
      </Text>
    </View>
  </TouchableOpacity>
);
