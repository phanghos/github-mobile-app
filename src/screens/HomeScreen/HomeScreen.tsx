import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ISSUES_SCREEN,
  PULL_REQUESTS_SCREEN,
  REPOSITORIES_SCREEN,
} from 'consts/navigationConsts';

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
      <Item text="Issues" onPress={() => navigate(ISSUES_SCREEN)} />
      <Item text="Repositories" onPress={() => navigate(REPOSITORIES_SCREEN)} />
      <Item
        text="Pull Requests"
        onPress={() => navigate(PULL_REQUESTS_SCREEN)}
      />
    </View>
  );
};
