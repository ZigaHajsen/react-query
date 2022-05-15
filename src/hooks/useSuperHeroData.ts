import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import { Hero } from '../types';

const fetchSuperHero = ({
  queryKey,
}: {
  queryKey: [string, number | undefined];
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
  heroId: number | undefined;
}) => {
  const queryClient = useQueryClient();

  return useQuery<
    AxiosResponse<Hero> | null,
    AxiosError,
    AxiosResponse<Hero> | null,
    [string, number | undefined]
  >(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const superHeroesResponse =
        queryClient.getQueryData<AxiosResponse<Hero[]>>('super-heroes');

      if (!superHeroesResponse) {
        return undefined;
      }

      const hero = superHeroesResponse?.data?.find(
        (hero) => hero.id === heroId
      );

      if (!hero) {
        return undefined;
      }

      return {
        ...superHeroesResponse,
        data: hero,
      };
    },
  });
};
