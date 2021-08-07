import { ApiService } from './api';

export const searchRepos = (query: string) => ApiService.searchRepos(query);

export const searchPullRequests = (query: string) =>
  ApiService.searchPullRequests(query);
