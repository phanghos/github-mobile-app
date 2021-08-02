import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export type TopBarProps = {
  showBack?: boolean;
  onBackPress?: () => void;
  opacity: Animated.SharedValue<number>;
};

export const TopBar = ({
  showBack = true,
  onBackPress,
  opacity,
  children,
}: PropsWithChildren<TopBarProps>) => {
  const { goBack } = useNavigation();
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
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
        style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}
      >
        {showBack && (
          <HeaderBackButton
            labelVisible={false}
            onPress={onBackPress || goBack}
          />
        )}
        {children}
      </View>
      <Animated.View
        style={[
          { width: '100%', height: 1, backgroundColor: '#E8E8E8' },
          opacityStyle,
        ]}
      />
    </Animated.View>
  );
};
