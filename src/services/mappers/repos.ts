import { RepositoriesApiResponse, RepositoryFromApi } from '@models/Repository';

export const toRepositories = (repos: RepositoriesApiResponse) =>
  repos.map(toRepository);

export const toRepository = (repo: RepositoryFromApi) => {
  const {
    owner: { login, avatar_url },
  } = repo;

  return {
    ...repo,
    owner: { ownerName: login, avatarUrl: avatar_url },
  };
};
