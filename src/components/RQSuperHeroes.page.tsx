import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { Hero } from '../types';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes1');
};

export const RQSuperHeroesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<
    AxiosResponse<Hero[]>,
    AxiosError
  >('super-heroes', fetchSuperHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
