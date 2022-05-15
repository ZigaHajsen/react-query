import { useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

import { Hero } from '../types';
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';

export const RQSuperHeroesPage: React.FC = () => {
  const [name, nameSet] = useState('');
  const [alterEgo, alterEgoSet] = useState('');

  const onSuccess = (data: AxiosResponse<Hero[]>) => {};
  const onError = (error: AxiosError) => {};

  const { data, isLoading, isError, error, refetch } = useSuperHeroesData({
    onSuccess,
    onError,
  });

  const { mutate } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    mutate(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => nameSet(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => alterEgoSet(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
