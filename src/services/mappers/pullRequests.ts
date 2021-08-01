import { PullRequestApi, PullRequestsApiResponse } from '@models/PullRequest';

export const mapPullRequestsApiResponse = (
  apiPullRequests: PullRequestsApiResponse,
) => apiPullRequests.map(mapPullRequestFromApi);

export const mapPullRequestFromApi = (apiPullRequest: PullRequestApi) =>
  apiPullRequest;
