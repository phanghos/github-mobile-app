import React, { useEffect } from 'react';
import { useBottomSheetAnimation } from './useBottomSheetAnimation';

type BottomSheetProps = {
  isVisible: boolean;
  height?: number;
  children: React.ReactNode;
  onClose: () => void;
};

export const BottomSheet = ({
  isVisible,
  height = 400,
  children,
  onClose,
}: BottomSheetProps) => {
  const { Overlay, Component, show, hide } = useBottomSheetAnimation({
    height,
    onClose,
  });

  useEffect(() => {
    if (isVisible) {
      show();
    } else {
      hide();
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Overlay />
      <Component>{children}</Component>
    </>
  );
};
