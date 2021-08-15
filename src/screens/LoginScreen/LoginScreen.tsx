import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@components/Text/Text';
import { authActions } from '@features/auth/auth.reducer';
import { isUserLoggingInSelector } from '@features/auth/auth.selectors';

type ButtonProps = {
  text: string;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
};

const Button = ({ text, backgroundColor, textColor, onPress }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      height: 48,
      borderRadius: 6,
      justifyContent: 'center',
      marginVertical: 8,
      backgroundColor,
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
  const isLoading = useSelector(isUserLoggingInSelector);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {isLoading ? (
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
