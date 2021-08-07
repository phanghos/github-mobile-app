import {
  PullRequestFromApi,
  PullRequestsApiResponse,
} from '@models/PullRequest';

export const mapPullRequestsApiResponse = (prs: PullRequestsApiResponse) =>
  prs.map(mapPullRequestFromApi);

export const mapPullRequestFromApi = (pr: PullRequestFromApi) => ({
  ...pr,
  user: { username: pr.user.login, avatarUrl: pr.user.avatar_url },
});
