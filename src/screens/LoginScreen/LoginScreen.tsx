import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@components/Text/Text';
import { authActions } from '@features/auth/auth.reducer';
import { isUserLoggingInSelector } from '@features/auth/auth.selectors';
import styles from './styles';

type ButtonProps = {
  text: string;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
};

const Button = ({ text, backgroundColor, textColor, onPress }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ ...styles.buttonContainer, backgroundColor }}
  >
    <Text
      style={{ color: textColor, textAlign: 'center' }}
      fontStyle="semiBold"
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const isUserLoggingIn = useSelector(isUserLoggingInSelector);

  return (
    <View style={styles.container}>
      {isUserLoggingIn ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <>
          <Button
            text="SIGN IN WITH GITHUB"
            backgroundColor="#000"
            textColor="#fff"
            onPress={() => {
              dispatch(authActions.setIsLoading());
            }}
          />
          <Button
            text="SIGN IN WITH GITHUB ENTERPRISE"
            backgroundColor="#fff"
            textColor="#000"
            onPress={() => {
              // Do nothing
            }}
          />
        </>
      )}
    </View>
  );
};
