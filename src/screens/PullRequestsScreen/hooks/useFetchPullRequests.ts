import { useFetchResource } from '@hooks/useFetchResource';
import { PullRequest } from '@models/PullRequest';
import { ApiService } from '@services/api';
import { mapPullRequestsApiResponse } from '@services/mappers/pullRequests';

export const useFetchPullRequests = (username: string, repo: string) => {
  const getData = () => {
    setIsLoading(true);

    ApiService.getPullRequests(username, repo)
      .then(({ data }) => setData(mapPullRequestsApiResponse(data)))
      .catch(setError)
      .finally(() => setIsLoading(false));
  };

  const { isLoading, setIsLoading, data, setData, error, setError } =
    useFetchResource<PullRequest[]>(getData, []);

  return { isLoading, data: data as PullRequest[], error };
};
