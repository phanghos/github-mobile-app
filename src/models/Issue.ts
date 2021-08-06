import issuesMock from '../mocks/jsonMocks/issuesMock.json';

export type IssueFromApi = typeof issuesMock[0];

export type IssuesApiResponse = IssueFromApi[];

export type Issue = IssueFromApi;
