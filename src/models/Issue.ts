import issuesMock from '../mocks/jsonMocks/issuesMock.json';

export type IssueApi = typeof issuesMock[0];

export type IssuesApiResponse = IssueApi[];

export type Issue = IssueApi;
