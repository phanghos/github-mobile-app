import { useState } from 'react';
import useSWR from 'swr';
import { ApiService } from '@services/api';
import { RepositoriesApiResponse, Repository } from '@models/Repository';
import { PullRequest, PullRequestsApiResponse } from '@models/PullRequest';
import {
  mapSearchResultsResponse,
  sectionHandlersMap,
} from '../searchResultsUtils';

export type Section = 'Repositories' | 'Pull Requests';

type UseSearchProps = {
  section: Section;
  query: string;
};

type SearchResponseType = {
  items: RepositoriesApiResponse | PullRequestsApiResponse;
};

export const useSearch = ({ section, query }: UseSearchProps) => {
  const { isValidating, error } = useSWR<SearchResponseType>(
    sectionHandlersMap[section](query),
    ApiService.fetcher,
    { onSuccess: data => setItems(mapSearchResultsResponse(data)) },
  );
  const [items, setItems] = useState<PullRequest[] | Repository[] | undefined>(
    undefined,
  );

  return { isLoading: isValidating, data: items, error };
};
