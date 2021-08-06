import { RepositoriesApiResponse, RepositoryApi } from '@models/Repository';

export const mapRepositoriesApiResponse = (repos: RepositoriesApiResponse) =>
  repos.map(mapRepositoryFromApi);

export const mapRepositoryFromApi = (repo: RepositoryApi) => {
  const {
    owner: { login, avatar_url },
  } = repo;

  return {
    ...repo,
    owner: { ownerName: login, avatarUrl: avatar_url },
  };
};
