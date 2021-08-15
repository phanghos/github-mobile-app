import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styles from './styles';

type UseBottomSheetAnimationProps = {
  height: number;
  closeOnClickOutside?: boolean;
  animationDuration?: number;
  onClose: () => void;
};

const damping = 16;

const defaultAnimationDuration = 16;

export const useBottomSheetAnimation = ({
  height,
  closeOnClickOutside = true,
  animationDuration = defaultAnimationDuration,
  onClose,
}: UseBottomSheetAnimationProps) => {
  const translationY = useSharedValue(height);

  const show = () => (translationY.value = withSpring(0, { damping }));

  const hide = () =>
    (translationY.value = withTiming(
      height,
      {
        duration: animationDuration,
      },
      isFinished => {
        if (isFinished) {
          runOnJS(onClose)();
        }
      },
    ));

  const panGestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      translationY.value = interpolate(
        event.translationY,
        [-300, 0, Number.MAX_SAFE_INTEGER],
        [0, 0, Number.MAX_SAFE_INTEGER],
        Extrapolate.CLAMP,
      );
    },
    onEnd: () => {
      if (translationY.value > height / 3) {
        runOnJS(hide)();
      } else {
        runOnJS(show)();
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
    <TouchableWithoutFeedback onPress={closeOnClickOutside ? hide : undefined}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, .5)',
          },
          overlayStyle,
        ]}
      />
    </TouchableWithoutFeedback>
  );

  const bottomSheet = ({ children }: { children: React.ReactNode }) => (
    <PanGestureHandler onHandlerStateChange={panGestureHandler}>
      <Animated.View
        style={[
          {
            ...styles.container,
            height,
          },
          bottomSheetStyle,
        ]}
      >
        <View style={styles.line} />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {children}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );

  return {
    Overlay: overlay,
    Component: bottomSheet,
    show,
    hide,
  };
};
