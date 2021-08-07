import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ISSUES_SCREEN,
  PULL_REQUESTS_SCREEN,
  REPOSITORIES_SCREEN,
} from 'consts/navigationConsts';
import { SimpleHeader } from '@components/SimpleHeader/SimpleHeader';
import { Text } from '@components/Text/Text';

const Item = ({ text, onPress }: { text: string; onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 8 }}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export const HomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 48 }}>
      <SimpleHeader
        title="Home"
        showBack={false}
        showBottomLine={false}
        showSearch
      />
      <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
        <Text style={{ fontSize: 18, marginBottom: 24 }} fontStyle="semiBold">
          My Work
        </Text>
        <Item text="Issues" onPress={() => navigate(ISSUES_SCREEN)} />
        <Item
          text="Pull Requests"
          onPress={() => navigate(PULL_REQUESTS_SCREEN)}
        />
        <Item
          text="Repositories"
          onPress={() => navigate(REPOSITORIES_SCREEN)}
        />
      </View>
    </View>
  );
};
