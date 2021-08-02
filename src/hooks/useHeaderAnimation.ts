import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

const getPositiveScrollY = (value: number) => {
  'worklet';
  return interpolate(
    value,
    [-300, 0, Number.MAX_SAFE_INTEGER],
    [0, 0, Number.MAX_SAFE_INTEGER],
    Extrapolate.CLAMP,
  );
};

export const useHeaderAnimation = () => {
  const posY = useSharedValue(0);
  const clampedValue = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler<{ prevY: number }>({
    onBeginDrag: ({ contentOffset: { y } }, context) => {
      context.prevY = getPositiveScrollY(y);
    },
    onScroll: ({ contentOffset: { y } }, context) => {
      const positiveY = getPositiveScrollY(y);

      posY.value = positiveY;

      const diff = positiveY - context.prevY;

      clampedValue.value = clamp(clampedValue.value + diff, 0, 48);

      translationY.value = interpolate(
        clampedValue.value,
        [0, 48],
        [0, -48],
        Extrapolate.CLAMP,
      );

      context.prevY = positiveY;
    },
  });
  const opacity = useDerivedValue(() =>
    interpolate(
      posY.value,
      [0, 12, 24, Number.MAX_SAFE_INTEGER],
      [0, 0.5, 1, 1],
      Extrapolate.CLAMP,
    ),
  );

  return { posY, translationY, opacity, scrollHandler };
};
