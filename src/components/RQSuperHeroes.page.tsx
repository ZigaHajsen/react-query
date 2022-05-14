import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { Hero } from '../types';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage: React.FC = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<
    AxiosResponse<Hero[]>,
    AxiosError
  >('super-heroes', fetchSuperHeroes, {
    enabled: false,
  });

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
