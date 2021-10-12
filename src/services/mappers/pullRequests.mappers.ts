import {
  PullRequest,
  PullRequestFromApi,
  PullRequestsApiResponse,
} from '@models/PullRequest';

export const toPullRequests = (prs: PullRequestsApiResponse) =>
  prs.map(toPullRequest);

export const toPullRequest = (pr: PullRequestFromApi): PullRequest => ({
  ...pr,
  user: { username: pr.user.login, avatarUrl: pr.user.avatar_url },
});
