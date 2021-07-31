import axios from 'axios';
import { createServer } from 'miragejs';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';

if (window.server) {
  server.shutdown();
}

window.server = createServer({
  routes() {
    this.get('https://api.github.com/users/phanghos/repos', () => {
      return repositoriesMock;
    });
  },
});

export const ApiService = (() => {
  const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  const getRepos = (username: string) =>
    instance.get(`users/${username}/repos`);

  return {
    getRepos,
  };
})();
