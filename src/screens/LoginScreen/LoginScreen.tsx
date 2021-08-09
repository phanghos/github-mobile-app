import React, { useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@components/Text/Text';
import { authActions } from '@features/auth/auth.reducer';
import {
  isUserLoggingInSelector,
  userSelector,
} from '@features/auth/auth.selectors';
// import { HOME_SCREEN } from 'consts/navigationConsts';

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
  const loggedUser = useSelector(userSelector);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (loggedUser) {
      // navigate(HOME_SCREEN);
    }
  }, [loggedUser, navigate]);

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
            onPress={() => {}}
          />
        </>
      )}
    </View>
  );
};
