import { mapRepositoryFromApi } from '@services/mappers/repos';
import repositoriesMock from '../mocks/jsonMocks/repositoriesMock.json';

export type RepositoryApiResponse = typeof repositoriesMock[0];

export type RepositoriesApiResponse = RepositoryApiResponse[];

export type Repository = ReturnType<typeof mapRepositoryFromApi>;
