import { Text } from '@components/Text/Text';
import { userSelector } from '@features/auth/auth.selectors';
import { CloseIcon } from 'assets/icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';

type AccountsBottomSheetProps = {
  height: number;
  style: Animated.AnimateStyle<unknown>;
  gestureHandler: (event: PanGestureHandlerGestureEvent) => void;
  hide: () => void;
};

export const AccountsBottomSheet = ({
  height,
  gestureHandler,
  hide,
  style,
}: AccountsBottomSheetProps) => {
  const user = useSelector(userSelector);

  return (
    <PanGestureHandler onHandlerStateChange={gestureHandler}>
      <Animated.View
        style={[
          {
            flex: 1,

            zIndex: 3,
            width: '100%',
            height,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            // padding: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          style,
        ]}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 1,
            width: 60,
            height: 5,
            borderRadius: 4,
            backgroundColor: '#e8e8e8',
            alignSelf: 'center',
            margin: 8,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

            shadowColor: '#f0f',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 24,
              marginBottom: 16,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity onPress={hide}>
              <CloseIcon style={{ marginRight: 16 }} />
            </TouchableOpacity>
            <Text style={{ flex: 1, fontSize: 18, top: -1 }} fontStyle="bold">
              Accounts
            </Text>
            <Text style={{ color: 'blue', fontSize: 12 }} fontStyle="semiBold">
              MANAGE
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Image
              source={{ uri: user?.avatar_url || '' }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 18,
                marginRight: 16,
              }}
            />
            <Text>{user?.login}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 32,
              marginBottom: 16,
            }}
          >
            <Text style={{ color: 'blue', marginRight: 32 }}>+</Text>
            <Text style={{ color: 'blue' }}>Add enterprise account</Text>
          </View>

          <View
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#e8e8e8',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2.84,
              elevation: 5,
            }}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
