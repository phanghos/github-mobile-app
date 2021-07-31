import {
  RepositoriesApiResponse,
  RepositoryApiResponse,
} from '@models/Repository';

export const mapRepositoriesApiResponse = (apiRepos: RepositoriesApiResponse) =>
  apiRepos.map(mapRepositoryFromApi);

export const mapRepositoryFromApi = (apiRepo: RepositoryApiResponse) => {
  const {
    owner: { login, avatar_url },
  } = apiRepo;

  return {
    ...apiRepo,
    owner: { ownerName: login, avatarUrl: avatar_url },
  };
};
