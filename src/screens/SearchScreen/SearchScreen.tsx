import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { PlaceHolder } from '@components/PlaceHolder/PlaceHolder';
import { TopBar } from '@components/TopBar/TopBar';
import { SEARCH_RESULTS_SCREEN } from 'consts/navigationConsts';
import { SearchSuggestions } from './components/SearchSuggestions/SearchSuggestions';
import { Section } from '@screens/SearchResultsScreen/hooks/useSearch';

type ParamsList = {
  [SEARCH_RESULTS_SCREEN]: { section: Section; query: string };
};

type NavigationProp = BottomTabNavigationProp<ParamsList, keyof ParamsList>;

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const { navigate } = useNavigation<NavigationProp>();

  const onSelect = useCallback(
    (section: Section, query: string) => {
      navigate(SEARCH_RESULTS_SCREEN, { section, query });
    },
    [navigate],
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar>
        <TextInput
          placeholder="Search GitHub"
          onChangeText={setQuery}
          style={{ marginLeft: 8 }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -8,
            width: '100%',
            height: 1,
            backgroundColor: '#E8E8E8',
            marginLeft: 8,
          }}
        />
      </TopBar>
      {query ? (
        <SearchSuggestions query={query} onSelect={onSelect} />
      ) : (
        <PlaceHolder
          title="Find your stuff."
          subtitle="Search all of GitHub for People, Repositories, Organizations, Issues, and Pull Requests"
        />
      )}
    </View>
  );
};
