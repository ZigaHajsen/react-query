import axios, { AxiosResponse, AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { Hero } from '../types';
// import { request } from '../utils/axios-utils';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes');
  // return request({ url: '/superheroes' });
};

const addSuperHero = (hero: Omit<Hero, 'id'>) => {
  return axios.post<Hero>('http://localhost:4000/superheroes', hero);
  // return request({ ulr: '/superheroes', method: 'post', data: hero });
};

export const useSuperHeroesData = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: AxiosResponse<Hero[]>) => void;
  onError: (error: AxiosError) => void;
}) => {
  return useQuery<AxiosResponse<Hero[]>, AxiosError>(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
  );
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    /*     onSuccess: (data) => {
      // queryClient.invalidateQueries('super-heroes');
      queryClient.setQueryData<AxiosResponse<Hero[]>>(
        'super-heroes',
        // @ts-ignore
        (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [...oldQueryData!.data, data.data],
          };
        }
      );
    }, */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');

      const previousHeroData = queryClient.getQueryData('super-heroes');

      queryClient.setQueryData<AxiosResponse<Hero[]>>(
        'super-heroes',
        // @ts-ignore
        (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData!.data,
              // @ts-ignore
              { id: oldQueryData?.data?.length + 1, ...newHero },
            ],
          };
        }
      );

      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      // @ts-ignore
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};
