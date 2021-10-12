import { useState } from 'react';
import useSWR from 'swr';
import { ApiService } from '@services/api';
import { toPullRequests } from '@services/mappers/pullRequests.mappers';
import { PullRequest, PullRequestsApiResponse } from '@models/PullRequest';

export const useFetchPullRequests = (username: string, repo: string) => {
  const { isValidating, data, error } = useSWR<PullRequestsApiResponse>(
    `repos/${username}/${repo}/pulls`,
    ApiService.fetcher,
    {
      onSuccess: dataa => {
        setPullRequests(toPullRequests(dataa));
      },
    },
  );

  const [pullRequests, setPullRequests] = useState<PullRequest[] | undefined>(
    data ? toPullRequests(data) : undefined,
  );

  return { isLoading: isValidating, data: pullRequests, error };
};
