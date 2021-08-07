import { mapRepositoryFromApi } from '@services/mappers/repos';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';

export type RepositoryFromApi = typeof repositoriesMock[0];

export type RepositoriesApiResponse = RepositoryFromApi[];

export type Repository = ReturnType<typeof mapRepositoryFromApi>;
