import React from 'react';
import { Image, View, ViewProps } from 'react-native';
import { Repository } from '@models/Repository';
import { Text } from '@components/Text/Text';
import styles from './styles';

type RepositorySearchResultProps = {
  repo: Pick<Repository, 'owner' | 'name' | 'description'>;
} & Pick<ViewProps, 'style'>;

export const RepositorySearchResult = ({
  repo: {
    owner: { ownerName, avatarUrl },
    name,
    description,
  },
  style,
}: RepositorySearchResultProps) => {
  return (
    <View style={style}>
      <View style={styles.ownerContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.ownerName} fontStyle="light">
          {ownerName}
        </Text>
      </View>
      <Text style={styles.repoName} fontStyle="semiBold">
        {name}
      </Text>
      <Text style={styles.repoDescription}>{description}</Text>
    </View>
  );
};
