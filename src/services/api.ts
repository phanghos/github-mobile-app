import axios from 'axios';
import { createServer } from 'miragejs';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';
import pullRequetsMock from '../mocks/jsonMocks/pullRequestsMock.json';
import issuesMock from '../mocks/jsonMocks/issuesMock.json';

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
  },
});

export const ApiService = (() => {
  const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  const getRepos = (username: string) =>
    instance.get(`users/${username}/repos`);

  const getPullRequests = (username: string, repo: string) =>
    instance.get(`repos/${username}/${repo}/pulls`);

  const getIssues = (username: string, repo: string) =>
    instance.get(`repos/${username}/${repo}/issues`);

  return {
    getRepos,
    getPullRequests,
    getIssues,
  };
})();
