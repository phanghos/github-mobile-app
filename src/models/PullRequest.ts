import { mapPullRequestFromApi } from '@services/mappers/pullRequests';
import pullRequestsMock from '../mocks/jsonMocks/pullRequestsMock.json';

export type PullRequestApi = typeof pullRequestsMock[0];

export type PullRequestsApiResponse = PullRequestApi[];

export type PullRequest = ReturnType<typeof mapPullRequestFromApi>;
