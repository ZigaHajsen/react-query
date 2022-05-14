import { AxiosResponse, AxiosError } from 'axios';

import { Hero } from '../types';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

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

  const { data, isLoading, isError, error, isFetching, refetch } =
    useSuperHeroesData({ onSuccess, onError, select });

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
