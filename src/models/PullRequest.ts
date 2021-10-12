export type PullRequestFromApi = {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: Array<{ id: number; name: string; color: string }>;
  user: { login: string; avatar_url: string };
};

export type PullRequestsApiResponse = PullRequestFromApi[];

export type PullRequest = Omit<PullRequestFromApi, 'user'> & {
  user: { username: string; avatarUrl: string };
};
