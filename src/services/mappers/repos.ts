import { RepositoriesApiResponse, RepositoryFromApi } from '@models/Repository';

export const mapRepositoriesApiResponse = (repos: RepositoriesApiResponse) =>
  repos.map(mapRepositoryFromApi);

export const mapRepositoryFromApi = (repo: RepositoryFromApi) => {
  const {
    owner: { login, avatar_url },
  } = repo;

  return {
    ...repo,
    owner: { ownerName: login, avatarUrl: avatar_url },
  };
};
