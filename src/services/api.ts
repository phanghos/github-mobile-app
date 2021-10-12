import axios, { AxiosResponse } from 'axios';
import { createServer } from 'miragejs';
import { UserLoginResponse } from '@models/User';
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
  fetcher: <T = object>(url: string) => Promise<T>; // eslint-disable-line @typescript-eslint/ban-types
};

export const ApiService: ApiServiceApi = (() => {
  const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  const fetcher = (url: string) => instance.get(url).then(({ data }) => data);

  const login = () => instance.get('user');

  return {
    login,
    fetcher,
  };
})();
