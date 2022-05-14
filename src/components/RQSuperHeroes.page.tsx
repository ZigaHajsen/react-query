import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { Hero } from '../types';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage: React.FC = () => {
  const onSuccess = (data: AxiosResponse<Hero[]> | string[]) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: AxiosError) => {
    console.log('Perform side effect after encountering error', error);
  };

  const select = (data: AxiosResponse<Hero[]>) => {
    const superHeroNames = data.data.map((hero) => hero.name);

    return superHeroNames;
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<
    AxiosResponse<Hero[]>,
    AxiosError,
    string[]
  >('super-heroes', fetchSuperHeroes, {
    enabled: false,
    onSuccess,
    onError,
    select,
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
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
