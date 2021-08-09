import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type UseBottomSheetAnimationProps = {
  height: number;
};

export const useBottomSheetAnimation = ({
  height,
}: UseBottomSheetAnimationProps) => {
  const translationY = useSharedValue(height);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: _ => {},
    onActive: event => {
      translationY.value = interpolate(
        event.translationY,
        [-300, 0, Number.MAX_SAFE_INTEGER],
        [0, 0, Number.MAX_SAFE_INTEGER],
        Extrapolate.CLAMP,
      );
    },
    onEnd: () => {
      if (translationY.value > 0) {
        if (translationY.value > height / 3) {
          translationY.value = withTiming(height, { duration: 400 });
        } else {
          translationY.value = withSpring(0, { damping: 15 });
        }
      } else if (translationY.value > -height / 3) {
        translationY.value = withTiming(0, { duration: 400 });
      } else {
        // translationY.value = Dimensions.get('screen').height - 400
      }
    },
  });

  const bottomSheetStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: translationY.value }],
    }),
    [translationY],
  );

  const overlayStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(
      translationY.value,
      [0, height],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity: opacityValue,
      zIndex: opacityValue > 0.1 ? 1 : 0,
    };
  }, [translationY]);

  const overlay = () => (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          // height: Dimensions.get('screen').height,
          backgroundColor: 'rgba(0, 0, 0, .5)',
        },
        overlayStyle,
      ]}
    />
  );

  const show = () => (translationY.value = withSpring(0, { damping: 15 }));

  const hide = () =>
    (translationY.value = withTiming(height, {
      duration: 400,
    }));

  return {
    bottomSheetStyle,
    /* overlayStyle, */ Overlay: overlay,
    gestureHandler: panGestureHandler,
    show,
    hide,
  };
};
