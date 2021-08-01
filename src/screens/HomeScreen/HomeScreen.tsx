import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PULL_REQUESTS_SCREEN, REPOSITORIES_SCREEN } from 'consts/navigation';

const Item = ({ text, onPress }: { text: string; onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 6 }}>
      <Text style={{ fontWeight: '600' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export const HomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 48 }}>
      <Item text="Issues" />
      <Item text="Repositories" onPress={() => navigate(REPOSITORIES_SCREEN)} />
      <Item
        text="Pull Requests"
        onPress={() => navigate(PULL_REQUESTS_SCREEN)}
      />
    </View>
  );
};
