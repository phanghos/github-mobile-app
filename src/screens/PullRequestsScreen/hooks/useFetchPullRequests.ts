import { pipe } from 'lodash/fp';
import { useFetchResource } from '@hooks/useFetchResource';
import { PullRequest } from '@models/PullRequest';
import { ApiService } from '@services/api';
import { toPullRequests } from '@services/mappers/pullRequests';

export const useFetchPullRequests = (username: string, repo: string) => {
  const getData = () => {
    setIsLoading(true);

    ApiService.getPullRequests(username, repo)
      .then(({ data }) => pipe(toPullRequests, setData)(data))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<PullRequest[]>(getData, []);

  return { isLoading, data: data as PullRequest[], error };
};
