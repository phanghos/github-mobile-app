import React from 'react';
import { Image, Text, View, ViewProps } from 'react-native';
import { Repository } from '@models/Repository';
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
        <Text style={styles.ownerName}>{ownerName}</Text>
      </View>
      <Text style={styles.repoName}>{name}</Text>
      <Text style={styles.repoDescription}>{description}</Text>
    </View>
  );
};
