import { mapPullRequestFromApi } from '@services/mappers/pullRequests';
import pullRequestsMock from '../mocks/jsonMocks/pullRequestsMock.json';

export type PullRequestFromApi = typeof pullRequestsMock[0];

export type PullRequestsApiResponse = PullRequestFromApi[];

export type PullRequest = ReturnType<typeof mapPullRequestFromApi>;
