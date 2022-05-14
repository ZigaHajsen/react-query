import { useState, useEffect } from 'react';
import axios from 'axios';
import { Hero } from '../types';

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dataSet] = useState<Hero[]>([]);
  const [error, errorSet] = useState('');

  useEffect(() => {
    axios
      .get<Hero[]>('http://localhost:4000/superheroes')
      .then((res) => {
        dataSet(res.data);
      })
      .catch((error) => {
        errorSet(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
