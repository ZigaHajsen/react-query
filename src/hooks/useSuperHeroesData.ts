import axios, { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { Hero } from '../types';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = ({
  onSuccess,
  onError,
  select,
}: {
  onSuccess: (data: AxiosResponse<Hero[]> | string[]) => void;
  onError: (error: AxiosError) => void;
  select: (data: AxiosResponse<Hero[]>) => string[];
}) => {
  return useQuery<AxiosResponse<Hero[]>, AxiosError, string[]>(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select,
    }
  );
};
