import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { Hero } from '../types';

const fetchSuperHero = ({
  queryKey,
}: {
  queryKey: [string, string | undefined];
}) => {
  const heroId = queryKey[1];
  if (!heroId) {
    return null;
  }

  return axios.get<Hero>(`http://localhost:4000/superheroes/${queryKey[1]}`);
};

export const useSuperHeroData = ({
  heroId,
}: {
  heroId: string | undefined;
}) => {
  return useQuery<
    AxiosResponse<Hero> | null,
    AxiosError,
    AxiosResponse<Hero> | null,
    [string, string | undefined]
  >(['super-hero', heroId], fetchSuperHero);
};
