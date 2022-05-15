import axios from 'axios';
import { useQueries } from 'react-query';

import { Hero } from '../types';

const fetchSuperHero = (heroId: number) => {
  return axios.get<Hero[]>(`http://localhost:4000/superheroes/${heroId}`);
};

type RQDynamicParallelQueriesPageProps = {
  heroIds: number[];
};

export const RQDynamicParallelQueriesPage: React.FC<
  RQDynamicParallelQueriesPageProps
> = ({ heroIds }) => {
  useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  return <div>RQ Dynamic Parallel Queries Page</div>;
};
