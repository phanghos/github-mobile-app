import useSWR from 'swr';
import { ApiService } from '@services/api';
import { IssuesApiResponse } from '@models/Issue';

export const useFetchIssues = (username: string, repo: string) => {
  const { isValidating, data, error } = useSWR<IssuesApiResponse>(
    `repos/${username}/${repo}/issues`,
    ApiService.fetcher,
  );

  return { isLoading: isValidating, data, error };
};
