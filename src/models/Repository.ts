import { mapRepositoryFromApi } from '@services/mappers/repos';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';

export type RepositoryApi = typeof repositoriesMock[0];

export type RepositoriesApiResponse = RepositoryApi[];

export type Repository = ReturnType<typeof mapRepositoryFromApi>;
