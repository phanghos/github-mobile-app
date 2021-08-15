import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BottomSheet } from '@components/BottomSheet/BottomSheet';
import { Text } from '@components/Text/Text';
import { userSelector } from '@features/auth/auth.selectors';
import { CloseIcon } from 'assets/icons';

type AccountsBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const AccountsBottomSheet = ({
  isVisible,
  onClose,
}: AccountsBottomSheetProps) => {
  const user = useSelector(userSelector);

  if (!user) {
    return null;
  }

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 24,
          marginBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={onClose}>
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
    </BottomSheet>
  );
};
