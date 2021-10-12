import { useState } from 'react';
import useSWR from 'swr';
import { ApiService } from '@services/api';
import { toRepositories } from '@services/mappers/repos';
import { RepositoriesApiResponse } from '@models/Repository';

export const useFetchRepos = (username: string) => {
  const { isValidating, data, error } = useSWR<RepositoriesApiResponse>(
    `users/${username}/repos`,
    ApiService.fetcher,
    {
      onSuccess: dataa => {
        setRepos(toRepositories(dataa));
      },
    },
  );
  const [repos, setRepos] = useState(data ? toRepositories(data) : undefined);

  return { isLoading: isValidating, data: repos, error };
};
