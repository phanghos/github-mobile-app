import { PullRequest } from '@models/PullRequest';
import { Repository } from '@models/Repository';
import React from 'react';
import { Section } from '../hooks/useSearch';
import {
  componentMap,
  isPullRequestComponent,
  isPullRequestModel,
  isRepositoryComponent,
  isRepositoryModel,
} from '../searchResultsUtils';

export const SearchResult = ({
  item,
  section,
}: {
  item: Repository | PullRequest;
  section: Section;
}) => {
  const Component = componentMap[section];

  if (isRepositoryComponent(Component) && isRepositoryModel(item)) {
    return <Component repo={item} style={{ paddingHorizontal: 16 }} />;
  } else if (isPullRequestComponent(Component) && isPullRequestModel(item)) {
    return (
      <Component
        username={item.user.username}
        repo={item.title}
        item={item}
        style={{ paddingHorizontal: 16 }}
      />
    );
  }

  return null;
};
