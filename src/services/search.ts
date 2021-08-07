import { ApiService } from './api';

export const searchRepos = (query: string) => ApiService.searchRepos(query);
