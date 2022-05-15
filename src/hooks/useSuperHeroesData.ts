import axios, { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { Hero } from '../types';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes');
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
