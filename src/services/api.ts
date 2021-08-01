import axios from 'axios';
import { createServer } from 'miragejs';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';
import pullRequetsMock from '../mocks/jsonMocks/pullRequestsMock.json';

// @ts-ignore
if (window.server) {
  // @ts-ignore
  server.shutdown();
}

// @ts-ignore
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

  return {
    getRepos,
    getPullRequests,
  };
})();
