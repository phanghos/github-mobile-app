import axios, { AxiosResponse } from 'axios';
import { createServer } from 'miragejs';
import { UserLoginResponse } from '@models/User';
import { RepositoriesApiResponse } from '@models/Repository';
import { PullRequestsApiResponse } from '@models/PullRequest';
import { IssuesApiResponse } from '@models/Issue';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';
import pullRequetsMock from '../mocks/jsonMocks/pullRequestsMock.json';
import issuesMock from '../mocks/jsonMocks/issuesMock.json';
import searchResultsReposMock from '../mocks/jsonMocks/searchResultsReposMock.json';
import searchResultsPullRequestsMock from '../mocks/jsonMocks/searchResultsPullRequestsMock.json';
import authMock from '../mocks/jsonMocks/authMock.json';

// @ts-ignore TODO Fix types
if (window.server) {
  // @ts-ignore TODO Fix types
  server.shutdown();
}

// @ts-ignore TODO Fix types
window.server = createServer({
  routes() {
    this.get('https://api.github.com/users/phanghos/repos', () => {
      return repositoriesMock;
    });
    this.get(
      'https://api.github.com/repos/wix/react-native-navigation/pulls',
      () => {
        return pullRequetsMock;
      },
    );
    this.get(
      'https://api.github.com/repos/wix/react-native-navigation/issues',
      () => {
        return issuesMock;
      },
    );
    this.get('https://api.github.com/search/repositories', () => {
      return searchResultsReposMock;
    });
    this.get('https://api.github.com/search/issues', () => {
      return searchResultsPullRequestsMock;
    });
    this.get('https://api.github.com/user', () => {
      return authMock;
    });
  },
});

type ApiServiceApi = {
  login: () => Promise<AxiosResponse<UserLoginResponse>>;
  getRepos: (
    username: string,
  ) => Promise<AxiosResponse<RepositoriesApiResponse>>;
  getPullRequests: (
    username: string,
    repo: string,
  ) => Promise<AxiosResponse<PullRequestsApiResponse>>;
  getIssues: (
    username: string,
    repo: string,
  ) => Promise<AxiosResponse<IssuesApiResponse>>;
  searchRepos: (
    query: string,
  ) => Promise<AxiosResponse<{ items: RepositoriesApiResponse }>>;
  searchPullRequests: (
    query: string,
  ) => Promise<AxiosResponse<{ items: PullRequestsApiResponse }>>;
};

export const ApiService: ApiServiceApi = (() => {
  const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  const login = () => instance.get('user');

  const getRepos = (username: string) =>
    instance.get(`users/${username}/repos`);

  const getPullRequests = (username: string, repo: string) =>
    instance.get(`repos/${username}/${repo}/pulls`);

  const getIssues = (username: string, repo: string) =>
    instance.get(`repos/${username}/${repo}/issues`);

  const searchRepos = (query: string) =>
    instance.get(`search/repositories?q=${query}`);

  const searchPullRequests = (query: string) =>
    instance.get(`search/issues?q=${query}+is:pull-request`);

  return {
    login,
    getRepos,
    getPullRequests,
    getIssues,
    searchRepos,
    searchPullRequests,
  };
})();
