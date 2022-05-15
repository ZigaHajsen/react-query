import axios from 'axios';
import { useQuery } from 'react-query';

import { Friend, Hero } from '../types';

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>('http://localhost:4000/superheroes');
};
const fetchFriends = () => {
  return axios.get<Friend[]>('http://localhost:4000/friends');
};

export const RQParallelQueriesPage: React.FC = () => {
  useQuery('super-heroes', fetchSuperHeroes);
  useQuery('friends', fetchFriends);

  return <div>RQ Parallel Queries Page</div>;
};
